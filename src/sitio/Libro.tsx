import Image from 'next/image';
import type { Libro } from '@/catalogo/tipos';

// A book standing on the shelf, turned a little so you see its page edges. The tilt is decoration only.
export function Libro3d({ libro, alt, clase = '', prioridad = false, sizes = '(max-width: 700px) 45vw, 300px' }: {
    libro: Libro; alt: string; clase?: string; prioridad?: boolean; sizes?: string;
}) {
    return (
        <span className={`aLibroW ${clase}`}>
            <span className="aLibro" style={{ aspectRatio: `${libro.img.w} / ${libro.img.h}` }}>
                <Image src={libro.img.src} alt={alt} width={libro.img.w} height={libro.img.h} sizes={sizes} priority={prioridad} />
            </span>
        </span>
    );
}

// A flat cover for grids and shelves. Empty alt: the link next to it already says the title.
export function Portada({ libro, sizes = '(max-width: 700px) 42vw, 190px', prioridad = false }: { libro: Libro; sizes?: string; prioridad?: boolean }) {
    return (
        <Image
            className="aPortada"
            src={libro.img.src}
            alt=""
            width={libro.img.w}
            height={libro.img.h}
            sizes={sizes}
            priority={prioridad}
        />
    );
}
