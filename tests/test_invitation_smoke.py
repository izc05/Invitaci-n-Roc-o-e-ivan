"""Comprobaciones estáticas de apertura y regresión de la invitación.
La secuencia debe ser carta -> mensaje opaco -> foto fija.
No sustituyen una prueba visual en navegador real.
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
}
for label, passed in checks.items():
    print(("OK   " if passed else "FAIL ")+label)
assert all(checks.values()), "Regresión detectada: se detiene la publicación."
print(f"{len(checks)} comprobaciones superadas.")
