import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Try to save to Supabase (non-blocking)
    let dbSaved = false;
    try {
      const supabase = getSupabase();
      if (supabase) {
        const { error } = await supabase
          .from("fbp_subscribers")
          .upsert(
            {
              email,
              book_id: "newsletter",
              source: "footer_newsletter",
              subscribed_at: new Date().toISOString(),
            },
            { onConflict: "email,book_id" }
          );
        if (!error) dbSaved = true;
        else console.error("Newsletter Supabase error (non-fatal):", error.message);
      }
    } catch (e) {
      console.error("Newsletter DB failed (non-fatal):", e);
    }

    // Try to send welcome email via Resend (non-blocking)
    let emailSent = false;
    try {
      const { Resend } = await import("resend");
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const resend = new Resend(resendKey);
        const { error } = await resend.emails.send({
          from: "Fun Books Publisher <onboarding@resend.dev>",
          to: email,
          subject: "Welcome to Fun Books Publisher!",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #8B5CF6;">Welcome to Fun Books Publisher!</h1>
              <p>Thank you for subscribing to our newsletter.</p>
              <p>You'll be the first to know about:</p>
              <ul>
                <li>New book releases</li>
                <li>Exclusive free downloads</li>
                <li>Coloring tips & techniques</li>
                <li>Special offers</li>
              </ul>
              <p>Happy coloring!</p>
              <p><em>The Fun Books Publisher Team</em></p>
            </div>
          `,
        });
        if (!error) emailSent = true;
      }
    } catch {
      // Silent fail - email is a bonus
    }

    // ALWAYS return success - subscriber experience comes first
    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
      dbSaved,
      emailSent,
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
