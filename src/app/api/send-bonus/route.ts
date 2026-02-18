import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Base URL for PDFs (served from /public/downloads/ via Vercel)
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fun-books-publisher.vercel.app";

// Book data with relative PDF paths
const booksData: Record<string, {
  title: string;
  pdfPath: string;
}> = {
  "monochrome-vol-4": {
    title: "The Power of Black & White",
    pdfPath: "/downloads/power-of-black-and-white.pdf",
  },
  "monochrome-ink-bliss": {
    title: "Ink Bliss Monochrome",
    pdfPath: "/downloads/ink-bliss.pdf",
  },
  "monochrome-tattoo": {
    title: "Tattoo Monochrome",
    pdfPath: "/downloads/ink-bliss.pdf", // Uses ink-bliss PDF (tattoo PDF not yet created)
  },
  "monochrome-vol-3": {
    title: "Animal Collection",
    pdfPath: "/downloads/animal-collection.pdf",
  },
  "monochrome-mandala": {
    title: "Mandala Monochrome",
    pdfPath: "/downloads/monochrome-mandala.pdf",
  },
};

// Lazy Supabase init - only connect if env vars exist
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, bookId } = await request.json();

    if (!email || !bookId) {
      return NextResponse.json(
        { error: "Email and bookId are required" },
        { status: 400 }
      );
    }

    const book = booksData[bookId];
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    const pdfUrl = `${BASE_URL}${book.pdfPath}`;

    // Try to save to Supabase (non-blocking - NEVER fails the request)
    let dbSaved = false;
    try {
      const supabase = getSupabase();
      if (supabase) {
        const { error: dbError } = await supabase
          .from("fbp_subscribers")
          .upsert({
            email,
            book_id: bookId,
            source: "bonus_landing",
            subscribed_at: new Date().toISOString(),
          }, {
            onConflict: "email,book_id",
          });
        if (!dbError) dbSaved = true;
        else console.error("Supabase error (non-fatal):", dbError.message);
      }
    } catch (e) {
      console.error("Supabase connection failed (non-fatal):", e);
    }

    // Try to send email via Resend (non-blocking - NEVER fails the request)
    let emailSent = false;
    try {
      const { Resend } = await import("resend");
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const resend = new Resend(resendKey);
        const { error: emailError } = await resend.emails.send({
          from: "Fun Books Publisher <onboarding@resend.dev>",
          to: email,
          subject: `Your Free ${book.title} Download is Ready!`,
          html: `
            <!DOCTYPE html>
            <html>
            <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
            <body style="font-family: 'Segoe UI', Tahoma, sans-serif; background: #f5f5f5; margin: 0; padding: 20px;">
              <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <div style="background: linear-gradient(135deg, #8B5CF6, #F97316); padding: 30px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="60" style="vertical-align: middle;">
                        <img src="${BASE_URL}/logo.png" alt="FBP" width="55" height="55" style="display: block;">
                      </td>
                      <td style="vertical-align: middle; padding-left: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">YOUR FREE DOWNLOAD</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0; font-size: 14px;">From Fun Books Publisher LLC</p>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="padding: 40px 30px;">
                  <h2 style="color: #1F2937; margin: 0 0 20px;">Hello Colorist!</h2>
                  <p style="color: #4B5563; line-height: 1.6;">
                    Thank you for choosing <strong>Fun Books Publisher</strong>!<br>
                    Here is your secure digital copy of <strong>${book.title}</strong>.
                  </p>
                  <div style="text-align: center; margin: 35px 0;">
                    <a href="${pdfUrl}" style="display: inline-block; background: linear-gradient(135deg, #8B5CF6, #F97316); color: white; text-decoration: none; padding: 18px 45px; border-radius: 50px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);">
                      Download Your PDF
                    </a>
                  </div>
                  <div style="background: #F3F4F6; border-radius: 12px; padding: 20px; margin: 30px 0; border-left: 4px solid #8B5CF6;">
                    <h3 style="color: #1F2937; margin: 0 0 10px;">Pro Tips:</h3>
                    <ul style="color: #4B5563; margin: 0; padding-left: 20px; line-height: 1.8;">
                      <li>Print on <strong>cardstock (160gsm+)</strong> to prevent bleed-through.</li>
                      <li>Print at <strong>100% scale</strong> for original resolution.</li>
                      <li>Tag us <strong>#FunBooksPublisher</strong> to be featured!</li>
                    </ul>
                  </div>
                </div>
                <div style="background: #1F2937; padding: 20px; text-align: center;">
                  <p style="color: #9CA3AF; margin: 0; font-size: 12px;">
                    © ${new Date().getFullYear()} Fun Books Publisher LLC • Wyoming, USA
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
        if (!emailError) emailSent = true;
        else console.error("Resend error (non-fatal):", emailError);
      }
    } catch (e) {
      console.error("Resend failed (non-fatal):", e);
    }

    // ALWAYS return success with the download URL
    // Customer gets their PDF regardless of Supabase/Resend status
    return NextResponse.json({
      success: true,
      downloadUrl: pdfUrl,
      emailSent,
      dbSaved,
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
