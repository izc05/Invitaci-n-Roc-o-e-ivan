"""Comprobaciones de regresión de la invitación.
Evitan perder el texto inicial, el zoom del anillo y el audio en despliegues.
No sustituyen la prueba visual en un teléfono real.
"""
from pathlib import Path

index = Path("index.html").read_text(encoding="utf-8")
v105 = Path("enhancements/v10-5.js").read_text(encoding="utf-8")
cinema = Path("enhancements/v14-cinema.js").read_text(encoding="utf-8")
cinema_css = Path("enhancements/v14-cinema.css").read_text(encoding="utf-8")
hero_css = Path("enhancements/v13.css").read_text(encoding="utf-8")
deploy = Path("site/index.html").read_text(encoding="utf-8")
workflow = Path(".github/workflows/pages.yml").read_text(encoding="utf-8")

checks = {
    "frase introductoria original": "Tenemos algo que contaros" in v105,
    "texto completo recuperado": "Hay historias que se escriben entre dos" in cinema,
    "anuncio de la boda": "¡Nos casamos!" in cinema,
    "pausa de 5,6 s tras el anuncio": "await new Promise(resolve=>setTimeout(resolve,5600));" in cinema,
    "secuencia de entrada y anillo": cinema.index("v105Prelude") < cinema.index("body.classList.add('v14-cinema-active')"),
    "animación del anillo conservada": "v14RingToStory" in cinema_css and "positionRing()" in cinema,
    "foto principal fija sin zoom": "animation:none!important;" in hero_css and "v13RingSafeReveal" not in hero_css and "v13HeroZoomOut" not in hero_css,
    "CSS actualizado sin caché antigua": "assets/v13.css?v=136" in workflow,
    "fotografía real del anillo": "rocio-ivan-hero.webp" in cinema,
    "música no se pausa por cambio de visibilidad": "document.hidden&&!music.paused" not in index,
    "audio antes de pedir fullscreen": cinema.index("if(audio?.paused)") < cinema.index("if(root.requestFullscreen)"),
    "scripts en orden": deploy.index("assets/v10-5.js?") < deploy.index("assets/v14-cinema.js?"),
    "mensaje disponible al público": "v14-cinema.js?" in deploy,
    "sin reintroducir V15 problemática": "v15-polish" not in workflow,
}
for label, passed in checks.items():
    print(("OK   " if passed else "FAIL ")+label)
assert all(checks.values()), "Regresión detectada: se detiene la publicación."
print(f"{len(checks)} comprobaciones superadas.")
