# Auditoría de estabilización — invitación Iván y Rocío
Fecha: 8 de octubre de 2026. Referencia: V14 con introducción restaurada.

## Alcance y criterio
Conservar el diseño y las fotografías existentes. No aplicar de nuevo `v15-polish.css` ni `v15-polish.js`: ese rediseño provocó recortes y mezcla de fotografías y fue revertido a petición del usuario.

## Comprobaciones y correcciones
- [x] La carta inicial «Abrir invitación» permanece.
- [x] Se conserva la pantalla «Tenemos algo que contaros…» con su texto completo y «¡Nos casamos!».
- [x] El texto aparece **antes** del zoom cinematográfico al anillo.
- [x] Se conserva el archivo `rocio-ivan-hero.webp`, el foco y la animación `v14RingToStory`.
- [x] Las escenas y efectos posteriores se han dejado sin modificaciones.
- [x] Se elimina la pausa forzada del audio cuando `document.hidden` cambia, que podía activarse por fullscreen.
- [x] El audio se solicita en el clic real del usuario, antes de entrar en fullscreen.
- [x] Se han añadido comprobaciones estáticas y de sintaxis al despliegue de GitHub Pages.

## Riesgos y asuntos PENDIENTES
**P0 — Confirmación de asistencia:** el formulario V12 (`enhancements/v12.js`) valida datos y muestra «Gracias», pero NO transmite ni guarda las respuestas. No distribuir la invitación como confirmación operativa hasta conectar Google Sheets/Apps Script u otro backend, probar almacenamiento real, privacidad y doble envío.

**P1 — Pruebas reales en Android:** comprobar con Chrome y con navegador integrado que el audio continúa al cambiar a fullscreen, al finalizar el texto y al recorrer fotos; las restricciones del sistema pueden suspender el audio en segundo plano. Validar el sonido al volver desde otra aplicación, y el icono de música.

**P1 — Inspección visual:** confirmar en 360, 390, 412 y 430 px de ancho que el anillo no se oculta, que la tarjeta no lo tapa y que el cambio al hero mantiene el encuadre; recorrer todas las fotos con scroll lento/rápido. Hacer también una pasada en escritorio. No alterar `chapter-photo` o parallax sin captura comparativa antes/después.

**P2 — Accesibilidad:** revisar reducción de movimiento en las reglas V13, navegación por teclado, contraste y focos.

**P2 — Datos reales:** validar una última vez fecha, hora (13:30), lugar, autobuses y exportación del calendario con los novios.

## Prueba de aceptación
1. Cargar sin caché la página principal.
2. Pulsar «Abrir invitación» una sola vez y comprobar la carta y la música.
3. Ver «Tenemos algo que contaros…», el texto narrativo y «¡Nos casamos!».
4. Comprobar zoom del anillo y entrada de la tarjeta «Iván y Rocío» sin mezclar fotos.
5. Recorrer capítulos, lugar, programa y confirmación.
6. Hasta integrar el backend: **no interpretar la pantalla de agradecimiento como una respuesta recibida**.

El paso de validación automática ejecuta `tests/test_invitation_smoke.py` y dos comprobaciones de sintaxis JavaScript durante el despliegue. Es una red de seguridad, no una certificación de calidad visual móvil.
