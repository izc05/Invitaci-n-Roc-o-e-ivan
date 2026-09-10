(()=>{
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const eventSection=$('.events')?.closest('.section');
  const cards=$$('.events .event');

  const chapterSigns=$$('.story .hand-sign');
  if(chapterSigns.length>=3)chapterSigns[2].textContent='27 · febrero · 2027';

  // Sustituye la escena de la capilla por la foto real del banquete ya publicada.
  const chapterPhotos=$$('.story .chapter .chapter-photo .bg');
  if(chapterPhotos.length>=3){
    chapterPhotos[2].style.backgroundImage="url('assets/venue/venue-table.avif')";
    chapterPhotos[2].style.backgroundPosition='center';
    chapterPhotos[2].style.filter='saturate(.9) brightness(.98)';
  }

  const eventLead=eventSection?.querySelector('.lead');
  if(eventLead)eventLead.textContent='Ceremonia, banquete y celebración en el mismo lugar: Finca Los Olivos, El Vellón.';

  if(cards[0]){
    const tags=cards[0].querySelector('.tags');
    if(tags)tags.innerHTML='<span class="tag">12:30 h aprox.</span><span class="tag">Mismo lugar</span><span class="tag">Autobús</span>';
  }
  if(cards[1]){
    const tags=cards[1].querySelector('.tags');
    if(tags)tags.innerHTML='<span class="tag">Cóctel</span><span class="tag">Banquete</span><span class="tag">Celebración</span>';
  }

  // Reduce el desenfoque aparente del bloque "Todo sucede aquí".
  const sharp=document.createElement('style');
  sharp.textContent=`
    .v106-place__photo{inset:0!important;background-position:center!important;filter:none!important;}
    .v106-place__copy{backdrop-filter:blur(5px)!important;-webkit-backdrop-filter:blur(5px)!important;}
    @media(max-width:680px){.v106-place__photo{background-position:center center!important;}}
  `;
  document.head.appendChild(sharp);

  const place=$('#v106Place');
  let sharpTick=false;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function sharpenPlace(){
    if(place){
      const r=place.getBoundingClientRect();
      const span=Math.max(1,place.offsetHeight-innerHeight);
      const p=clamp(-r.top/span,0,1);
      const photo=place.querySelector('.v106-place__photo');
      if(photo)photo.style.setProperty('transform',`translate3d(0,${-12+24*p}px,0) scale(1.025)`,'important');
    }
    sharpTick=false;
  }
  addEventListener('scroll',()=>{if(!sharpTick){sharpTick=true;requestAnimationFrame(sharpenPlace)}},{passive:true});
  addEventListener('resize',sharpenPlace,{passive:true});
  sharpenPlace();

  const realTimeline=[
    ['12:30','Ceremonia','El momento del “sí”. Hora aproximada.'],
    ['Después','Cóctel','Primer brindis juntos, sin salir de la finca.'],
    ['A continuación','Banquete','Nos sentaremos a la mesa para seguir celebrando.'],
    ['Sobremesa','Brindis','Tiempo para abrazos, palabras y recuerdos.'],
    ['Luego','Fiesta','Y desde aquí, disfrutaremos sin mirar demasiado el reloj.']
  ];
  $$('.timeline-list .stop').forEach((stop,i)=>{
    const data=realTimeline[i];if(!data)return;
    const time=stop.querySelector('time'),h=stop.querySelector('h4'),p=stop.querySelector('p');
    if(time)time.textContent=data[0];if(h)h.textContent=data[1];if(p)p.textContent=data[2];
  });
  const timeline=$('.timeline');
  if(timeline&&!timeline.querySelector('.v106-schedule-note')){
    timeline.querySelector('.title')?.insertAdjacentHTML('afterend','<p class="lead v106-schedule-note" style="text-align:center;max-width:650px;margin:16px auto 0">Salvo la ceremonia, los horarios definitivos se confirmarán más adelante.</p>');
  }

  const footerDate=$('footer p');
  if(footerDate)footerDate.textContent='27 de febrero de 2027 · Finca Los Olivos';
})();
