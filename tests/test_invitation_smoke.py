"""Comprobaciones estáticas de apertura y regresión de la invitación.
La secuencia debe ser carta -> mensaje opaco -> foto fija.
No sustituyen una prueba visual en navegador real.
"""
from pathlib import Path

index = Path("index.html").read_text(encoding="utf-8")
v105 = Path("enhancements/v10-5.js").read_text(encoding="utf-8")
cinema = Path("enhancements/v14-cinema.js").read_text(encoding="utf-8")
rsvp = Path("enhancements/v12.js").read_text(encoding="utf-8")
rsvp_css = Path("enhancements/v12.css").read_text(encoding="utf-8")
cinema_css = Path("enhancements/v14-cinema.css").read_text(encoding="utf-8")
hero_css = Path("enhancements/v13.css").read_text(encoding="utf-8")
deploy = Path("site/index.html").read_text(encoding="utf-8")
workflow = Path(".github/workflows/pages.yml").read_text(encoding="utf-8")

checks = {
    "texto introductorio": "Tenemos algo que contaros" in v105 and "Hay historias que se escriben entre dos" in cinema,
    "anuncio de la boda": "¡Nos casamos!" in cinema,
    "pausa de 5,6 segundos conservada": "await sleep(5600);" in cinema,
    "mensaje mostrado antes de ocultar carta": cinema.index("pre.classList.add('show');") < cinema.index("opening.classList.add('hide');"),
    "fondo opaco que evita flash": "z-index:1250" in cinema_css and "background:#f5efe6" in cinema_css and "transition:none;" in cinema_css,
    "salida después de texto y pausa": cinema.index("p.appendChild(end);") < cinema.index("await sleep(5600);") < cinema.index("pre.classList.add('hide');"),
    "solo se desvanece el mensaje al salir": ".v105-prelude.show.hide{" in cinema_css and "transition:opacity 1.1s ease" in cinema_css,
    "sin segunda fotografía ni zoom V14": "document.createElement('img')" not in cinema and "v14-cinema-active" not in cinema and "v14RingToStory" not in cinema_css and "scale(3.8)" not in cinema_css,
    "portada fija sin zoom": "animation:none!important;" in hero_css and "v13RingSafeReveal" not in hero_css and "v13HeroZoomOut" not in hero_css,
    "imagen real de portada conservada": "rocio-ivan-hero.webp" in hero_css,
    "audio antes de solicitar fullscreen": cinema.index("if(audio?.paused)") < cinema.index("if(root.requestFullscreen)"),
    "sin pausa forzada al ocultar pestaña": "document.hidden&&!music.paused" not in index,
    "archivos activos en orden correcto": deploy.index("assets/v10-5.js?") < deploy.index("assets/v14-cinema.js?"),
    "nuevo JS y CSS sin caché": "assets/v14-cinema.css?v=145" in workflow and "assets/v14-cinema.js?v=147" in workflow,
    "sin reintroducir rediseño V15": "v15-polish" not in workflow,
    "endpoint POST nativo": "postForm.action='https://formsubmit.co/ivanrocio2027@gmail.com'" in rsvp and "postForm.method='POST'" in rsvp,
    "sin llamada AJAX que agotaba tiempo": "fetch('https://formsubmit.co/ajax/" not in rsvp and "AbortController" not in rsvp,
    "redirección a página propia": "payload._next='https://izc05.github.io/Invitaci-n-Roc-o-e-ivan/gracias.html'" in rsvp,
    "referencia al origen del formulario": "payload._url='https://izc05.github.io/Invitaci-n-Roc-o-e-ivan/'" in rsvp,
    "datos necesarios": "'Asistencia':" in rsvp and "'Acompañantes':" in rsvp and "'Autobús':" in rsvp,
    "consentimiento para información alimentaria": "if(foodInfo&&!consent?.checked)" in rsvp and "id=\"v12FoodConsent\"" in rsvp,
    "doble envío bloqueado": "if(submitting)return;" in rsvp and "submit.disabled=true" in rsvp,
    "nunca fingir éxito desde JS": "postForm.submit();" in rsvp and "v12Result').classList.add('show')" not in rsvp,
    "método de envío no expone datos en URL": "hidden.name=key" in rsvp and "hidden.value=String(value)" in rsvp,
    "no publicar datos personales": "v12-privacy-note" in rsvp_css,
    "protección básica antispam": "_captcha:'false'" in rsvp and "_honey:" in rsvp,
    "página de agradecimiento desplegada": "cp gracias.html site/gracias.html" in workflow and "test -s site/gracias.html" in workflow,
    "caché renovada": "assets/v12.js?v=123" in workflow,
}
for label, passed in checks.items():
    print(("OK   " if passed else "FAIL ")+label)
assert all(checks.values()), "Regresión detectada: se detiene la publicación."
print(f"{len(checks)} comprobaciones superadas.")
