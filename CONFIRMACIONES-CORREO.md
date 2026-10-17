# Confirmaciones por correo — Iván y Rocío

## Qué hace la invitación
El cuestionario de confirmación publicado en GitHub Pages envía una petición HTTPS con JavaScript al servicio gratuito [FormSubmit](https://formsubmit.co/) para entregar un correo a **ivanrocio2027@gmail.com**. No se necesita una cuenta de invitado, no se abre una aplicación de correo y no hay panel ni base de datos propia.

Solo después de una respuesta satisfactoria del servicio, la web muestra «Gracias». En caso de error o falta de conexión, mantiene los datos introducidos, muestra el problema y permite reintentar. El botón se deshabilita durante cada petición. El enlace «Enviar una corrección» produce **otro correo** marcado como corrección; no actualiza ni borra el anterior.

Se transmiten: nombre, asistencia sí/no, nombres de acompañantes si corresponde, necesidad de autobús, observaciones alimentarias opcionales y si es una corrección. El apartado de información alimentaria muestra una casilla de autorización explícita si se cumplimenta. No pedir otros datos sanitarios, teléfonos ni direcciones postales.

## Paso imprescindible antes de enviarla por WhatsApp
**La integración no estará operativa hasta activar el destinatario en FormSubmit:**

1. Abrir la página publicada: https://izc05.github.io/Invitaci-n-Roc-o-e-ivan/
2. Completar una confirmación de prueba con «Prueba» en el nombre, seleccionar «No» para no añadir datos ajenos y pulsar «Enviar confirmación».
3. Abrir el buzón **ivanrocio2027@gmail.com** y buscar el mensaje de activación de **FormSubmit** (también en Spam / Promociones). Seguir el enlace para confirmar la dirección. Nunca copiar ese enlace a GitHub ni compartirlo.
4. Después de activar, volver a la invitación y enviar **una nueva prueba** marcada como «Prueba envío». Verificar que llega un correo con el nombre, asistencia y tipo de respuesta.
5. Comprobar una prueba de asistencia «Sí», con acompañantes y autobús, **sin incluir alergias reales**.
6. Si falla o los mensajes no llegan, **no enviar todavía la invitación por WhatsApp**. Revisar la conexión, el correo, Spam y la activación. No debemos dar por confirmado un correo sin comprobarlo en Gmail.

Importante: la recepción HTTP satisfactoria confirma la aceptación de la solicitud por FormSubmit, pero no verifica por sí sola la entrega final en Gmail. No se han enviado correos de prueba automáticamente ni se ha realizado una prueba visual real en móviles.

## Servicio, cuotas y privacidad
FormSubmit declara uso gratuito y formularios/envíos ilimitados sujetos a medidas técnicas antispam. Para mantener un único clic se desactiva el CAPTCHA visible con `_captcha:false` y se añade un honeypot; esto puede incrementar spam o causar limitaciones de envío por parte del servicio. Si el tráfico lo requiere, reconsiderar CAPTCHA.

Los datos se procesan en un tercero y se envían al buzón de los novios; no se guardan en el repositorio ni hay base de datos propia. Según FormSubmit, el archivo de envíos se conserva 30 días (además de la copia que llegue al buzón). Evitar publicar respuestas y borrar correos personales cuando dejen de necesitarse para organizar la boda. La dirección receptora aparece en el JS público; después de la activación puede sustituirse en la URL por el alias aleatorio que facilita FormSubmit para reducir el spam.

Documentación:
- https://formsubmit.co/documentation
- https://formsubmit.co/ajax-documentation
- https://formsubmit.co/help

## Archivos
- `enhancements/v12.js`: cuestionario, validación y envío real.
- `enhancements/v12.css`: mensajes de estado y aviso de privacidad.
- `.github/workflows/pages.yml`: versiones de caché en despliegue.
- `tests/test_invitation_smoke.py`: comprobaciones estáticas de regresión.
