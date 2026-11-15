// A small markdown renderer for our own blog posts (headings, lists, paragraphs, bold, italics, links).
// Text is escaped first: the posts are ours, but nothing is ever trusted as HTML.

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function enLinea(s: string): string {
    return escapar(s)
        .replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export function aHtml(md: string): string {
    const out: string[] = [];
    let lista: 'ul' | 'ol' | null = null;
    const cerrar = () => { if (lista) { out.push(`</${lista}>`); lista = null; } };
    for (const linea of md.split(/\r?\n/)) {
        const l = linea.trim();
        let m: RegExpMatchArray | null;
        if (!l) { cerrar(); continue; }
        if ((m = l.match(/^###\s+(.+)$/))) { cerrar(); out.push(`<h3>${enLinea(m[1])}</h3>`); continue; }
        if ((m = l.match(/^##\s+(.+)$/))) { cerrar(); out.push(`<h2>${enLinea(m[1])}</h2>`); continue; }
        if ((m = l.match(/^[-*]\s+(.+)$/))) { if (lista !== 'ul') { cerrar(); out.push('<ul>'); lista = 'ul'; } out.push(`<li>${enLinea(m[1])}</li>`); continue; }
        if ((m = l.match(/^\d+\.\s+(.+)$/))) { if (lista !== 'ol') { cerrar(); out.push('<ol>'); lista = 'ol'; } out.push(`<li>${enLinea(m[1])}</li>`); continue; }
        cerrar();
        out.push(`<p>${enLinea(l)}</p>`);
    }
    cerrar();
    return out.join('\n');
}
