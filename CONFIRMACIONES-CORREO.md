# Confirmaciones por correo · Iván y Rocío

## Integración Web3Forms

**Proveedor:** https://web3forms.com/ — plan gratuito con 250 envíos mensuales según sus tarifas.  
**Destinatario previsto:** ivanrocio2027@gmail.com, vinculado a la Access Key pública configurada en el formulario. La correspondencia entre clave y buzón solo puede confirmarse comprobando un correo de prueba real.  
**Web:** https://izc05.github.io/Invitaci-n-Roc-o-e-ivan/

El cuestionario mantiene las opciones de asistencia, acompañantes, autobús y observaciones alimentarias (opcionales y sujetas a autorización expresa). Tras validar los campos, crea un formulario HTML oculto con los datos y realiza un `POST` nativo a `https://api.web3forms.com/submit` con el parámetro `access_key`. La clave de acceso es **pública** por diseño; no es una contraseña de Gmail ni un token administrativo.

Se utiliza el campo `redirect` con el enlace absoluto a `/gracias.html` para que Web3Forms redirija tras aceptar el formulario. No hay falso éxito anticipado en JavaScript, ni dependencia del AJAX que se bloqueaba con FormSubmit. El servicio sigue siendo externo y puede fallar por disponibilidad o filtros antispam.

**Clave pública actualizada el 18/10/2026** desde la cuenta de `ivanrocio2027@gmail.com`. La clave anterior había enviado varias pruebas al correo personal; las respuestas de ese periodo **no se trasladan automáticamente** al nuevo buzón. La entrega a la cuenta de la boda sigue pendiente de comprobación mediante una nueva prueba real. La clave no se reproduce en este documento.

## Verificación obligatoria antes de compartir por WhatsApp

1. Abrir la invitación publicada y confirmar que el nuevo despliegue ha terminado correctamente.
2. Rellenar una prueba con el nombre `PRUEBA WEB3FORMS`, asistencia **No**, sin datos sanitarios, y pulsar **Enviar confirmación** una sola vez.
3. Comprobar que Web3Forms acepta la respuesta y redirige a nuestra página `gracias.html`. Si muestra una página de error, conservar captura sin datos personales y detenerse.
4. Entrar en **ivanrocio2027@gmail.com** y comprobar que llega el correo con el nombre y la asistencia. Revisar Spam y Promociones si tarda.
5. Hacer una segunda prueba asistiendo con acompañante y autobús, sin indicar alergias reales. Comprobar que el correo contiene ambos campos.
6. **No distribuir por WhatsApp** hasta confirmar recepción real en el buzón correcto.

Las pruebas automatizadas (compilación JS y comprobaciones de estructura) no verifican que el tercero haya enviado un mensaje ni garantizan la entrega. En caso de error, no enviar repetidamente la misma respuesta.

## Privacidad y comportamiento

Los datos pasan por Web3Forms y llegarán al correo designado. Evitar recoger datos de alergias que no sean necesarios para organizar el menú, facilitar rectificación y eliminarlos cuando ya no sean necesarios. Una corrección del formulario genera otro correo identificado como corrección: no elimina el anterior ni actualiza una base de datos. El acceso a la dirección y a las respuestas debe limitarse a los novios.

## Código afectado
- `enhancements/v12.js`: formulario, validación, clave pública y POST HTML.
- `enhancements/v12.css`: aviso de privacidad.
- `gracias.html`: agradecimiento tras redirección del proveedor.
- `tests/test_invitation_smoke.py`: comprobaciones que bloquean una clave sin configurar.
- `.github/workflows/pages.yml`: caché y compilación del sitio.

## Referencias
- https://docs.web3forms.com/getting-started/installation
- https://docs.web3forms.com/getting-started/customizations/redirection
- https://docs.web3forms.com/getting-started/api-reference
- https://web3forms.com/pricing
