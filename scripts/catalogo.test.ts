// Tests of the catalog layer (src/catalogo/puro.ts). Run: npm run test:catalogo
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { alDia, buscar, CatalogoInvalido, componer, validar } from '../src/catalogo/puro';
import type { CatalogoFuente } from '../src/catalogo/tipos';

const copia = (): CatalogoFuente => JSON.parse(readFileSync(new URL('../src/catalogo/catalogo-fbp.json', import.meta.url), 'utf8'));

test('the repo copy is valid: 39 FBP books, none of another pen name', () => {
    const c = validar(copia());
    assert.equal(c.libros.length, 39);
    assert.ok(c.libros.every((l) => l.marca === 'Fun Books Publisher'));
});

test('one broken book is left out on its own, the rest stays', () => {
    const d = copia();
    d.libros[0] = { ...d.libros[0], portada: 'https://evil.example.com/x.jpg' };
    d.libros[1] = { ...d.libros[1], asin: 'B0FCS2XH6H' }; // Isabelle Whitmore
    (d.libros as unknown[])[2] = null;
    const avisos: string[] = [];
    const c = validar(d, (m) => avisos.push(m));
    assert.equal(c.libros.length, 36);
    assert.equal(avisos.length, 3);
    assert.ok(!c.libros.some((l) => l.asin === 'B0FCS2XH6H'));
});

test('a file that is not an FBP catalog, or keeps too few good books, is refused', () => {
    assert.throws(() => validar({ version: 2, marca: 'Fun Books Publisher', generado: 'x', libros: [] }), CatalogoInvalido);
    assert.throws(() => validar({ ...copia(), marca: 'Isabelle Whitmore' }), CatalogoInvalido);
    const d = copia();
    d.libros = d.libros.slice(0, 5);
    assert.throws(() => validar(d), CatalogoInvalido);
});

test('editorial layer: old addresses kept, sharp covers, gifts, no book Amazon stopped selling', () => {
    const d = copia();
    d.libros[0] = { ...d.libros[0], disponible: false };
    const c = componer(validar(d), 'copia');
    assert.equal(c.libros.length, 38);
    const cozy = c.libros.find((l) => l.asin === 'B0FSZ9V9MS')!;
    assert.equal(cozy.slug, 'cozy-escapes');
    assert.equal(cozy.regalo, 'cozy-escapes');
    assert.ok(cozy.img.nitida);
    assert.ok(c.libros.every((l) => l.img.nitida), 'every current book has a sharp cover');
    const slugs = c.libros.map((l) => l.slug);
    assert.equal(new Set(slugs).size, slugs.length);
});

test('a new book with no editorial entry still appears, with Amazon data', () => {
    const d = copia();
    d.libros.unshift({ ...d.libros[0], asin: 'B0TESTNEW1', slug: 'midnight-garden', corto: 'Midnight Garden', subtitulo: 'One Color Edition', portada: 'https://m.media-amazon.com/images/I/51mt7I5oWPL.jpg', publicado: '2026-11-20', formatos: { paperback: 'B0TESTNEW1' } });
    const c = componer(validar(d), 'en-linea', new Date('2026-11-21T00:00:00Z'));
    const n = c.libros.find((l) => l.asin === 'B0TESTNEW1')!;
    assert.equal(n.nombre, 'Midnight Garden');
    assert.equal(n.img.nitida, false);
    assert.equal(n.amazon, 'https://www.amazon.com/dp/B0TESTNEW1');
    assert.ok(n.nuevo);
});

test('old book addresses and ASINs find their book', () => {
    const c = componer(validar(copia()), 'copia');
    assert.equal(buscar(c, 'stress-relief-inspiration').libro?.asin, 'B0D8FG7NDJ');
    assert.equal(buscar(c, 'b0dsqtgtwv').libro?.asin, 'B0DTQ2K31D'); // Kindle ASIN of the compass book
    assert.equal(buscar(c, 'black-white-art-therapy').libro?.asin, 'B0GW33476D');
    assert.equal(buscar(c, 'cozy-escapes').canonico, true);
    assert.equal(buscar(c, 'nothing-here').libro, undefined);
});

test('"updates itself" only with a live catalog of less than 48 hours, and no long dashes in titles', () => {
    const d = copia();
    const c = componer(validar(d), 'en-linea');
    const t = Date.parse(c.generado);
    assert.equal(alDia(c, t + 47 * 3_600_000), true);
    assert.equal(alDia(c, t + 49 * 3_600_000), false);
    assert.equal(alDia({ ...c, origen: 'copia' }, t), false);
    assert.ok(c.libros.every((l) => !/[–—]/.test(l.titulo)));
});
