(()=>{
'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

// Escritura con una pequeña pluma que acompaña el texto mientras se dibuja.
window.typeInto=async function(el,text,speed=34,html=false){
  if(!el)return;
  if(reduce){el.innerHTML=html?text:text.replace(/</g,'&lt;');return;}
  el.innerHTML='';
  const plain=html?text.replace(/<[^>]*>/g,''):text;
  const node=document.createTextNode('');
  const pen=document.createElement('span');
  pen.className='writing-pen';
  pen.textContent='✒';
  el.append(node,pen);
  for(let i=0;i<plain.length;i++){
    node.nodeValue+=plain[i];
    pen.style.transform=`translate(${Math.random()*2}px,${Math.random()*2-1}px) rotate(${-18+Math.random()*7}deg)`;
    const pause='.,;:!?'.includes(plain[i])?speed*3.2:0;
    await sleep(speed+Math.random()*18+pause);
  }
  pen.remove();
  if(html)el.innerHTML=text;
};

const story=document.querySelector('.story');
if(story && !document.querySelector('.extended-story')){
  const section=`
  <section class="extended-story" id="recuerdos">
    <div class="extended-wrap">
      <div class="extended-heading reveal">
        <small>Un poco más de nosotros</small>
        <h2>Los momentos pequeños<em>también hicieron la historia.</em></h2>
      </div>

      <article class="memory-scene">
        <div class="memory-photo"><img src="assets/images/extended-one.webp" alt="Un momento especial de nuestra historia" loading="lazy"></div>
        <div class="memory-copy">
          <div class="memory-no">Capítulo IV · Nuestro rincón</div>
          <h3>Hay lugares que solo tienen sentido cuando estamos juntos.</h3>
          <div class="memory-text" data-text="No siempre hacen falta grandes planes. A veces basta una tarde tranquila, una conversación sin mirar el reloj y esa sensación de estar exactamente donde quieres estar."></div>
          <svg class="ink-swoosh" viewBox="0 0 280 28" preserveAspectRatio="none"><path d="M5 18 C55 3 92 25 139 14 S221 8 275 18"/></svg>
          <div class="memory-sign">Nuestro pequeño mundo</div>
          <div class="cat-memory-badge">
            <svg viewBox="0 0 70 46" aria-hidden="true"><path d="M8 35c1-10 5-20 14-22l5 9 7-11c9 3 14 13 15 24M35 35c2-9 5-17 12-19l5 8 6-10c7 3 11 12 12 21" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>
            Ellos también forman parte de la historia ♡
          </div>
        </div>
      </article>

      <article class="memory-scene">
        <div class="memory-photo"><img src="assets/images/extended-two.webp" alt="Caminando juntos al atardecer" loading="lazy"></div>
        <div class="memory-copy">
          <div class="memory-no">Capítulo V · Los días que se quedaron</div>
          <h3>Fuimos llenando el camino de recuerdos.</h3>
          <div class="memory-text" data-text="Viajes improvisados, domingos lentos, planes que cambiaron a última hora y momentos que parecían normales hasta que entendimos que eran precisamente los que queríamos recordar siempre."></div>
          <svg class="ink-swoosh" viewBox="0 0 280 28" preserveAspectRatio="none"><path d="M5 18 C55 3 92 25 139 14 S221 8 275 18"/></svg>
          <div class="memory-sign">Siempre un poco más lejos</div>
        </div>
      </article>

      <article class="memory-scene">
        <div class="memory-photo"><img src="assets/images/extended-three.webp" alt="Una pareja abrazándose al atardecer" loading="lazy"></div>
        <div class="memory-copy">
          <div class="memory-no">Capítulo VI · La promesa</div>
          <h3>Hasta que llegó el momento de decirlo en voz alta.</h3>
          <div class="memory-text" data-text="No fue solo pensar en una boda. Fue mirar todo lo vivido, imaginar lo que todavía queda por delante y decidir que queríamos seguir escribiéndolo juntos. Y ahora queremos celebrarlo con vosotros."></div>
          <svg class="ink-swoosh" viewBox="0 0 280 28" preserveAspectRatio="none"><path d="M5 18 C55 3 92 25 139 14 S221 8 275 18"/></svg>
          <div class="memory-sign">Y esto solo acaba de empezar</div>
        </div>
      </article>
    </div>
  </section>`;
  story.insertAdjacentHTML('afterend',section);
}

const ext=document.querySelector('.extended-story');
if(ext){
  // Luz ambiental muy suave para que la sección se sienta viva.
  for(let i=0;i<9;i++){
    const o=document.createElement('i');
    o.className='v102-orbit';
    o.style.left=(5+Math.random()*90)+'%';
    o.style.top=(6+Math.random()*88)+'%';
    o.style.setProperty('--x',(Math.random()*90-45)+'px');
    o.style.setProperty('--t',(4.5+Math.random()*5)+'s');
    ext.appendChild(o);
  }
}

const wipe=document.createElement('div');
wipe.className='cinematic-wipe';
document.body.appendChild(wipe);
let wiped=false;

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
      if(text)await window.typeInto(text,text.dataset.text,24,false);
      scene.classList.add('inked');
      setTimeout(()=>sign?.classList.add('show'),650);
    },420);
  });
},{threshold:.22});
document.querySelectorAll('.memory-scene').forEach(s=>revealObserver.observe(s));

if(ext){
  new IntersectionObserver(([e])=>{
    if(e.isIntersecting&&!wiped&&!reduce){
      wiped=true;wipe.classList.add('go');
      setTimeout(()=>wipe.classList.remove('go'),1300);
    }
  },{threshold:.08}).observe(ext);
}

let raf=false;
function motion(){
  if(!reduce){
    document.querySelectorAll('.memory-photo img').forEach((img,i)=>{
      const r=img.parentElement.getBoundingClientRect();
      const center=r.top+r.height/2-innerHeight/2;
      const y=Math.max(-18,Math.min(18,-center*.035));
      const x=(i%2?1:-1)*Math.max(-5,Math.min(5,-center*.008));
      img.style.transform=`translate3d(${x}px,${y}px,0) scale(1.08)`;
    });
  }
  raf=false;
}
addEventListener('scroll',()=>{if(!raf){raf=true;requestAnimationFrame(motion)}},{passive:true});
motion();

// Movimiento de respiración muy suave en las nuevas imágenes cuando están quietas.
document.querySelectorAll('.memory-photo img').forEach(img=>img.classList.add('v102-breathe'));

// Destellos discretos al entrar en cada recuerdo.
function softSparkles(anchor,n=8){
  if(reduce||!anchor)return;
  const r=anchor.getBoundingClientRect();
  for(let i=0;i<n;i++)setTimeout(()=>{
    const s=document.createElement('i');
    s.className='glint';
    s.style.left=(r.left+Math.random()*r.width)+'px';
    s.style.top=(Math.max(40,r.top)+Math.random()*Math.min(r.height,innerHeight*.65))+'px';
    s.style.setProperty('--gx',(Math.random()*70-35)+'px');
    s.style.setProperty('--dur',(1.7+Math.random()*1.5)+'s');
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),3600);
  },i*80);
}
const sparkleSeen=new WeakSet();
new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting&&!sparkleSeen.has(e.target)){
    sparkleSeen.add(e.target);softSparkles(e.target,7);
  }
}),{threshold:.35}).observe(document.querySelector('.memory-scene'));
})();
