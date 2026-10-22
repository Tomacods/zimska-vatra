import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceRoot = process.argv[2] ?? 'F:/downloads/zimska-vatra';
const destination = path.resolve('public/images');
const selectedNames = process.argv.slice(3);
const assets = {
  'hero': '01_Fotos/02_Vino_caliente/Luz_de_sol/zimska-vatra-botella-taza-vino-caliente-luz-de-sol-082.jpg',
  'tinto': 'DDE3758C-5FCA-4308-9A51-E34B6738FCF5.png',
  'blanco': '8C1D376C-A9AB-4B22-8BCA-7CB4B970D52E.png',
  'cafe': '813136E0-D5BB-454D-918F-451873B78276.png',
  'bocana': 'B3C2D5D7-6841-4BD2-B163-A70C08CCDAD4.png',
  'fratellos': '01_Fotos/04_Vermut/Exterior/zimska-vatra-botella-vermut-rojo-sobre-arbusto-160.jpg',
  'ritual-caliente': '01_Fotos/02_Vino_caliente/Luz_de_sol/zimska-vatra-taza-vino-caliente-canela-luz-de-sol-073.jpg',
  'ritual-frio': '01_Fotos/03_Tragos_frios/Botella_y_vaso/zimska-vatra-botella-trago-frio-naranja-menta-120.jpg',
  'preparacion': '01_Fotos/02_Vino_caliente/Preparacion/zimska-vatra-olla-vino-caliente-citricos-canela-042.jpg',
  'produccion': '01_Fotos/05_Produccion/zimska-vatra-caja-botellas-produccion-162.jpg',
  'logo-rojo': '02_Graficas/06_Logotipos/zimska-vatra-logotipo-zimska-vatra-rojo-206.png',
  'logo-crema': '02_Graficas/06_Logotipos/zimska-vatra-logotipo-zimska-vatra-crema-203.png',
};

await fs.mkdir(destination, { recursive: true });
const manifest = selectedNames.length
  ? JSON.parse(await fs.readFile('src/data/assets.json', 'utf8'))
  : {};
for (const [name, source] of Object.entries(assets)) {
  if (selectedNames.length && !selectedNames.includes(name)) continue;
  const file = path.join(sourceRoot, source);
  const xmp = `<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:source>Zimska Vatra supplied asset: ${path.basename(source)}</dc:source></rdf:Description></rdf:RDF></x:xmpmeta>`;
  const metadata = await sharp(file).metadata();
  const rotated = [5, 6, 7, 8].includes(metadata.orientation);
  const width = rotated ? metadata.height : metadata.width;
  const height = rotated ? metadata.width : metadata.height;
  const requestedWidths = name.startsWith('logo') ? [320, 1200] : [480, 800, 1200, 1800];
  const widths = [...new Set(requestedWidths.map(size => Math.min(size, width)))];
  for (const size of widths) {
    await sharp(file).rotate().resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 84 }).withXmp(xmp).toFile(path.join(destination, `${name}-${size}.webp`));
  }
  manifest[name] = { source, width, height, widths };
}
await fs.mkdir('src/data', { recursive: true });
await fs.writeFile('src/data/assets.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Prepared ${selectedNames.length || Object.keys(assets).length} original brand assets in responsive WebP sizes.`);
