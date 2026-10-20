import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceRoot = process.argv[2] ?? 'F:/downloads/zimska-vatra';
const destination = path.resolve('public/images');
const assets = {
  'hero': '01_Fotos/02_Vino_caliente/Luz_de_sol/zimska-vatra-botella-taza-vino-caliente-luz-de-sol-082.jpg',
  'tinto': '01_Fotos/01_Producto/Interior/zimska-vatra-botella-vino-tinto-pared-texturada-167.jpg',
  'blanco': '02_Graficas/04_Retoques/zimska-vatra-botella-vino-blanco-en-mano-retocada-172.png',
  'cafe': 'etiquetas/vino kuhano blanco con cafe frontal.png',
  'bocana': '01_Fotos/04_Vermut/En_mano/zimska-vatra-botella-vermut-etiqueta-negra-en-mano-196.jpeg',
  'fratellos': '01_Fotos/04_Vermut/Exterior/zimska-vatra-botella-vermut-rojo-sobre-arbusto-160.jpg',
  'ritual-caliente': '01_Fotos/02_Vino_caliente/Luz_de_sol/zimska-vatra-taza-vino-caliente-canela-luz-de-sol-073.jpg',
  'ritual-frio': '01_Fotos/03_Tragos_frios/Botella_y_vaso/zimska-vatra-botella-trago-frio-naranja-menta-120.jpg',
  'preparacion': '01_Fotos/02_Vino_caliente/Preparacion/zimska-vatra-olla-vino-caliente-citricos-canela-042.jpg',
  'produccion': '01_Fotos/05_Produccion/zimska-vatra-caja-botellas-produccion-162.jpg',
  'logo-rojo': '02_Graficas/06_Logotipos/zimska-vatra-logotipo-zimska-vatra-rojo-206.png',
  'logo-crema': '02_Graficas/06_Logotipos/zimska-vatra-logotipo-zimska-vatra-crema-203.png',
};

await fs.mkdir(destination, { recursive: true });
const manifest = {};
for (const [name, source] of Object.entries(assets)) {
  const file = path.join(sourceRoot, source);
  const xmp = `<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:source>Zimska Vatra supplied asset: ${path.basename(source)}</dc:source></rdf:Description></rdf:RDF></x:xmpmeta>`;
  const metadata = await sharp(file).metadata();
  const rotated = [5, 6, 7, 8].includes(metadata.orientation);
  const width = rotated ? metadata.height : metadata.width;
  const height = rotated ? metadata.width : metadata.height;
  const widths = name.startsWith('logo') ? [320, 1200] : [480, 800, 1200, 1800];
  for (const size of widths) {
    await sharp(file).rotate().resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 84 }).withXmp(xmp).toFile(path.join(destination, `${name}-${size}.webp`));
  }
  manifest[name] = { source, width, height, widths };
}
await fs.mkdir('src/data', { recursive: true });
await fs.writeFile('src/data/assets.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Prepared ${Object.keys(assets).length} original brand assets in responsive WebP sizes.`);
