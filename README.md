# Zimska Vatra

Landing estática en Astro para la línea de vinos kuhano y Bocana Vermut. Fotografías, logos, etiquetas y colores originales de la marca. Sin framework de JavaScript en el navegador.

## Desarrollo

Requiere Node.js compatible con Astro 7 (el proyecto se creó con Node 24).

```sh
npm install
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

`npm run build` ejecuta la revisión de tipos de Astro y genera el sitio estático en `dist/`. Se puede alojar en cualquier servicio de hosting estático. No hay backend ni credenciales.

## Editar contenido y contacto

- `src/data/site.ts`: variedades, descripciones, Instagram y número de WhatsApp.
- `src/pages/index.astro`: historia, preguntas frecuentes y metadatos.
- `src/styles/global.css`: colores, tipografías, diseño y adaptación a móviles.

El contacto está habilitado por Instagram y por WhatsApp al +54 9 2974 61-2996. Para cambiar el número, editá `site.whatsappNumber` en `src/data/site.ts` con el código de país y el número, solo dígitos. El botón de WhatsApp incluye la consulta de la bebida y cantidad elegidas.

No se publican precios ni zonas de entrega sin confirmar. El visitante puede armar una consulta y enviarla por Instagram o WhatsApp. La página no envía mensajes por su cuenta.

## Imágenes

Las imágenes optimizadas ya están incluidas en `public/images/`: no hace falta tener conectada la carpeta original para trabajar o publicar el proyecto.

Para volver a prepararlas desde los originales:

```sh
node scripts/prepare-assets.mjs "F:/downloads/zimska-vatra"
```

El proceso conserva la orientación correcta, genera distintos tamaños WebP e incluye la procedencia de cada imagen en sus metadatos. `src/data/assets.json` registra sus dimensiones y archivos de origen.

Las fotos y etiquetas pertenecen a Zimska Vatra. Las fuentes Barlow y Barlow Condensed se distribuyen con sus licencias en los paquetes de Fontsource. Se usan fuentes locales: no hay llamadas a Google Fonts.

## Antes de publicar con dominio propio

Una vez confirmado el dominio, agregá `site` en `astro.config.mjs` y usá esa URL absoluta en los metadatos de Open Graph. Revisá disponibilidad de las variedades, presentaciones y datos de contacto.
