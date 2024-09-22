import { defineMiddleware } from "astro:middleware";

const supportedLocales = ['en', 'es'];

export const onRequest = defineMiddleware
(( context, next ) => {
  // URL actual
  const url = new URL(context.request.url);
  const pathSegments = url.pathname.split('/').filter(Boolean);

  // Verificar si el primer segmento de la ruta es un idioma soportado
  const currentLocale = pathSegments[0];

  // Si no hay idioma en la URL, redirigir al idioma preferido del navegador
  if (!supportedLocales.includes(currentLocale)) {
    // Obtener el idioma preferido del navegador
    const acceptLanguageHeader = context.request.headers.get('accept-language');
    const preferredLocale = acceptLanguageHeader?.split(',')[0].split('-')[0] || 'en';

        // Redirigir al idioma preferido
        url.pathname = `/${preferredLocale}${url.pathname}`;
        return new Response(null, {
          status: 302,
          headers: {
            Location: url.toString(),
          },
        });
    }
  
  return next();
});