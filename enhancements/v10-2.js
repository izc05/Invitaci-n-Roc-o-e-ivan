(()=>{
'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

// Escritura limpia: solo aparecen las letras, con pequeñas pausas naturales.
window.typeInto=async function(el,text,speed=30,html=false){
  if(!el)return;
  if(reduce){el.innerHTML=html?text:text.replace(/</g,'&lt;');return;}
  el.innerHTML='';
  const plain=html?text.replace(/<[^>]*>/g,''):text;
  const node=document.createTextNode('');
  el.appendChild(node);
  for(let i=0;i<plain.length;i++){
    const ch=plain[i];
    node.nodeValue+=ch;
    const pause='.,;:!?'.includes(ch)?speed*2.1:0;
    await sleep(speed+Math.random()*12+pause);
  }
  if(html)el.innerHTML=text;
};

// Apertura robusta para iPhone: abrir nunca depende del audio.
const openBtn=document.getElementById('enterBtn');
const opening=document.getElementById('opening');
const music=document.getElementById('music');
const musicBtn=document.getElementById('musicBtn');

function fadeVolume(target=.72,duration=1800){
  if(!music)return;
  const start=music.volume||0;
  const t0=performance.now();
  const tick=now=>{
    const p=Math.min(1,(now-t0)/duration);
    music.volume=start+(target-start)*p;
    if(p<1)requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function startMusicFrom20(){
  if(!music)return;
  try{
    music.volume=0;
    const seek=()=>{try{if(!Number.isFinite(music.duration)||music.duration>20)music.currentTime=20}catch(e){}};
    if(music.readyState>=1)seek();
    else music.addEventListener('loadedmetadata',seek,{once:true});
    const p=music.play();
    if(p&&typeof p.then==='function')p.then(()=>{
      musicBtn?.classList.add('on');
      if(musicBtn)musicBtn.textContent='♪';
      fadeVolume(.72,1900);
    }).catch(()=>{});
  }catch(e){}
}

if(openBtn){
  openBtn.onclick=()=>{
    openBtn.disabled=true;
    // La portada se quita inmediatamente; Safari no puede bloquear esta acción.
    opening?.classList.add('hide');
    startMusicFrom20();
    setTimeout(()=>window.typeInto(document.getElementById('heroType'),
      'Después de tantos momentos compartidos, ha llegado uno que no queremos vivir sin ti. Gracias por formar parte de nuestra historia.',25,false),300);
  };
}

if(musicBtn&&music){
  musicBtn.onclick=()=>{
    if(music.paused){
      try{
        if(music.currentTime<1&&music.readyState>=1)music.currentTime=20;
        const p=music.play();
        if(p&&typeof p.then==='function')p.then(()=>{
          musicBtn.classList.add('on');
          musicBtn.textContent='♪';
          if(music.volume<.15)fadeVolume(.72,1200);
        }).catch(()=>{});
      }catch(e){}
    }else{
      music.pause();
      musicBtn.classList.remove('on');
      musicBtn.textContent='♫';
    }
  };
}

const story=document.querySelector('.story');
if(story && !document.querySelector('.extended-story')){
  const section=`
  <section class="extended-story" id="recuerdos">
    <div class="extended-wrap">
      <div class="extended-heading reveal">
        <small>Un poco más de nosotros</small>
        <h2>Lo bonito fue descubrir<em>que lo cotidiano también podía ser hogar.</em></h2>
      </div>

      <article class="memory-scene memory-portrait">
        <div class="memory-photo"><img src="assets/images/extended-one.webp" alt="Un momento especial de nuestra historia" loading="lazy"></div>
        <div class="memory-copy">
          <div class="memory-no">Capítulo IV · Nuestro rincón</div>
          <h3>No hicieron falta grandes cosas para empezar a sentirnos en casa.</h3>
          <div class="memory-text" data-text="Fueron las conversaciones sin mirar el reloj, las tardes tranquilas y esos pequeños gestos que nunca se planean. Sin darnos cuenta, empezamos a construir un lugar al que siempre apetecía volver."></div>
          <div class="memory-sign">Nuestro pequeño mundo</div>
          <div class="cat-memory-badge">
            <svg viewBox="0 0 70 46" aria-hidden="true"><path d="M8 35c1-10 5-20 14-22l5 9 7-11c9 3 14 13 15 24M35 35c2-9 5-17 12-19l5 8 6-10c7 3 11 12 12 21" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>
            Y ellos también estaban allí ♡
          </div>
        </div>
      </article>

      <article class="memory-scene memory-cinema">
        <div class="memory-photo"><img src="assets/images/extended-two.webp" alt="Caminando juntos al atardecer" loading="lazy"></div>
        <div class="memory-copy">
          <div class="memory-no">Capítulo V · Los días que se quedaron</div>
          <h3>Fuimos llenando el camino de recuerdos sin proponérnoslo.</h3>
          <div class="memory-text" data-text="Viajes improvisados, domingos lentos, planes que cambiaron a última hora y muchas cosas que nunca salieron en una foto. Al final entendimos que esos días normales eran precisamente los que queríamos recordar siempre."></div>
          <div class="memory-sign">Tú, yo y todo lo que venga</div>
        </div>
      </article>

      <article class="memory-scene memory-wide">
        <div class="memory-photo"><img src="assets/images/extended-three.webp" alt="Una pareja abrazándose al atardecer" loading="lazy"></div>
        <div class="memory-copy">
          <div class="memory-no">Capítulo VI · La promesa</div>
          <h3>Hasta que un día dejamos de hablar del futuro como si estuviera lejos.</h3>
          <div class="memory-text" data-text="Miramos todo lo vivido y supimos que queríamos seguir eligiéndonos. La boda no es el final de la historia; es una excusa preciosa para reunir a nuestra gente y celebrar que todavía queda muchísimo por escribir."></div>
          <div class="memory-sign">Y esto solo acaba de empezar</div>
        </div>
      </article>
    </div>
  </section>`;
  story.insertAdjacentHTML('afterend',section);
}

const emotion=document.getElementById('emotionType');
if(emotion){
  const obs=new IntersectionObserver(([e])=>{
    if(e.isIntersecting&&!emotion.dataset.v103){
      emotion.dataset.v103='1';
      setTimeout(()=>window.typeInto(emotion,
        'Si estás leyendo esto es porque formas parte de nuestra vida. Nos haría muchísima ilusión que estuvieras allí cuando digamos “sí”. <em>¿Nos acompañas?</em>',24,true),120);
    }
  },{threshold:.35});
  obs.observe(emotion);
}

const scenes=[...document.querySelectorAll('.memory-scene')];
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const scene=entry.target;
    scene.querySelector('.memory-photo')?.classList.add('show');
    scene.querySelector('.memory-copy')?.classList.add('show');
    if(scene.dataset.written)return;
    scene.dataset.written='1';
    const text=scene.querySelector('.memory-text');
    const sign=scene.querySelector('.memory-sign');
    setTimeout(async()=>{
      if(text)await window.typeInto(text,text.dataset.text,23,false);
      setTimeout(()=>sign?.classList.add('show'),420);
    },260);
  });
},{threshold:.18});
scenes.forEach(s=>revealObserver.observe(s));

let raf=false;
function motion(){
  if(!reduce){
    document.querySelectorAll('.memory-photo img').forEach((img,i)=>{
      const r=img.parentElement.getBoundingClientRect();
      const center=r.top+r.height/2-innerHeight/2;
      const strength=img.closest('.memory-cinema')?.classList.contains('memory-cinema')?.055:.032;
      const y=Math.max(-26,Math.min(26,-center*strength));
      const x=(i%2?1:-1)*Math.max(-6,Math.min(6,-center*.007));
      img.style.transform=`translate3d(${x}px,${y}px,0) scale(1.085)`;
    });
  }
  raf=false;
}
addEventListener('scroll',()=>{if(!raf){raf=true;requestAnimationFrame(motion)}},{passive:true});
motion();
})();
