# Confirmaciones por correo · Iván y Rocío

## Cambio en preparación: Web3Forms (250 envíos/mes gratis)

**Pendiente de activar**: FormSubmit no respondió ni al AJAX ni al POST normal (pantalla de Edge con `ERR_CONNECTION_TIMED_OUT`). Para no seguir intentando un servicio inaccesible desde el navegador, hemos preparado **Web3Forms**, que ofrece gratuitamente hasta **250 envíos mensuales** y está pensado para páginas estáticas.

**El cambio permanece en una PR en borrador y NO está publicado en GitHub Pages.** La web actual se mantiene intacta hasta que los novios obtengan la clave pública de Web3Forms y se pruebe un envío real.

### Cómo activar

1. Acceder a https://web3forms.com/ y crear una clave de acceso gratuita para **ivanrocio2027@gmail.com**.
2. Consultar ese Gmail (también Spam o Promociones), copiar la **Access Key** recibida. No es una contraseña de Gmail: Web3Forms documenta que esta clave sirve como identificador público para el formulario.
3. Sustituir `PENDIENTE_CLAVE_WEB3FORMS` en `enhancements/v12.js` por la clave de acceso recibida; **no es válida ninguna clave inventada**.
4. Revisar y fusionar PR tras pasar tests. CI se bloqueará mientras la clave esté pendiente.
5. Desde la web publicada rellenar una respuesta ficticia sin alergias, pulsar «Enviar confirmación» una sola vez y comprobar tanto la redirección a `gracias.html` como **la llegada efectiva del correo** a Gmail.
6. Si la recepción funciona, comprobar un caso «Sí», acompañado y con autobús, sin datos sanitarios reales, antes de distribuir la invitación por WhatsApp.

### Datos y uso
Formulario sin panel ni base de datos propia. Recoge nombre, asistencia, acompañantes, autobús y observaciones alimentarias opcionales con autorización expresa. Los datos los procesa Web3Forms y se remiten al correo indicado. La web incluye un aviso de privacidad; revisar el plazo de conservación del servicio y borrar las respuestas cuando ya no sean necesarias. No publicar datos personales en GitHub.

### Funcionamiento técnico
- POST HTML nativo a https://api.web3forms.com/submit
- Campo `access_key` obligatorio con clave pública recibida.
- Campo `redirect` hacia `/gracias.html` después de aceptación.
- El envío utiliza `POST`, por lo que los datos no se incorporan a la URL.
- El servicio controla aceptación y posibles errores; **no se muestra «Gracias» prematuramente en JavaScript**.
- Web3Forms tiene cuota gratuita de 250 respuestas por mes; al superarla, deja de aceptar nuevas respuestas hasta el siguiente mes.
- La recepción real **no está demostrada** hasta que se pruebe desde navegador y Gmail.

### Documentación oficial
- https://web3forms.com/pricing
- https://docs.web3forms.com/getting-started/installation
- https://docs.web3forms.com/getting-started/api-reference
