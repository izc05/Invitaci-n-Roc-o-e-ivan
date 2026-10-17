# Confirmaciones por correo — Iván y Rocío

## Envío con un solo botón y sin AJAX

La invitación sigue publicada en GitHub Pages. El cuestionario envía las respuestas a **ivanrocio2027@gmail.com** mediante **POST HTML nativo** a **https://formsubmit.co/ivanrocio2027@gmail.com** (sin abrir Gmail ni depender de CORS/AJAX/JavaScript para contactar con el servicio). Tras aceptar el formulario, FormSubmit puede redirigir al invitado a nuestra página **/gracias.html** mediante el campo documentado `_next`.

La antigua versión utilizaba `fetch('https://formsubmit.co/ajax/...')` con un temporizador de 20 segundos. En pruebas manuales del usuario esa petición quedaba esperando y acababa en error. El POST HTML nativo permite que **FormSubmit muestre directamente un error o el aviso de activación** en el navegador, sin ocultarlo detrás de un error genérico. **Es distinto del envío AJAX: al pulsar Enviar, el navegador sale momentáneamente de la invitación y, si FormSubmit acepta la respuesta, vuelve a una página de agradecimiento propia.**

No inventamos confirmación de entrega desde JavaScript: la redirección a /gracias.html está configurada como respuesta del servidor, y la llegada al buzón se comprueba aparte. Si falla el servicio, la pantalla mostrará el error del servicio, no una confirmación falsa. **FormSubmit sigue siendo un proveedor externo: cambiar a POST nativo no garantiza que no tenga caídas ni problemas antispam.**

## Activación imprescindible antes de compartir por WhatsApp

1. Abrir **https://izc05.github.io/Invitaci-n-Roc-o-e-ivan/** en navegador normal.
2. Rellenar una confirmación de prueba sin datos sanitarios (por ejemplo, nombre «PRUEBA ACTIVACIÓN», asistencia «No»), y pulsar **Enviar confirmación** **solo una vez**.
3. El navegador irá al servicio FormSubmit: si aparece «This form needs Activation», abrir el buzón **ivanrocio2027@gmail.com** y localizar el correo de activación (comprobar también Spam y Promociones). Hacer clic en «Activate Form». No compartir el enlace ni subirlo a GitHub.
4. Una vez activado, hacer **una segunda prueba con otro nombre** y comprobar que se muestra /gracias.html y que el correo con las respuestas llega a Gmail.
5. Repetir una prueba «Sí» incluyendo un acompañante y autobús, **sin añadir información sanitaria real**.
6. Solo después de comprobar el correo real, distribuir el enlace por WhatsApp.

**Si la navegación se queda bloqueada o falla**, consultar si FormSubmit está operativo, probar el enlace en Chrome/Edge sin bloqueadores y revisar Spam. Si persiste, usar un proveedor alternativo (por ejemplo, Google Forms o Google Apps Script). No bombardear con reintentos: pueden generar respuestas duplicadas.

## Contenido, privacidad y correcciones

Se envían los datos del formulario: nombre, asistencia, acompañantes, autobús, observaciones alimentarias opcionales y aviso de corrección. El apartado alimentario exige autorización expresa antes del envío. Los datos se transmiten al servicio de terceros FormSubmit y al correo de los novios, no a GitHub. FormSubmit indica que conserva un archivo de los envíos por 30 días. Los novios deben limitar el uso y borrar las respuestas cuando ya no sean necesarias.

Una corrección produce **otro correo** que debe revisar la pareja; no reemplaza automáticamente al anterior. FormSubmit recomienda protección antispam; el formulario usa honeypot y se ha desactivado CAPTCHA para un solo botón, con las restricciones antispam que pueda aplicar el proveedor.

## Referencias
- https://formsubmit.co/documentation — formulario POST, `_next`, `_url`, `_subject`, `_honey` y `_captcha`.
- https://formsubmit.co/help — activación y recepción.

## Archivos
- `enhancements/v12.js`: cuestionario, validación y POST HTML.
- `enhancements/v12.css`: aviso de privacidad y mensajes.
- `gracias.html`: agradecimiento después de la redirección del servidor.
- `.github/workflows/pages.yml`: despliegue de página e invalidación de caché.
- `tests/test_invitation_smoke.py`: comprobaciones de regresión.
