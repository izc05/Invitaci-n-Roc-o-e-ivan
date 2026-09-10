(()=>{
  'use strict';
  document.body.classList.add('v11');
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

  const storyHead=$('.story-head');
  if(storyHead && !$('#v11Story')){
    storyHead.insertAdjacentHTML('beforebegin',`
      <section class="v11-story" id="v11Story">
        <div class="v11-intro">
          <div class="v11-intro__inner">
            <div class="v11-kicker">Nuestra historia</div>
            <h2>Hay días que se recuerdan.<em>Y otros que lo cambian todo.</em></h2>
            <p>No queríamos enviarte solamente una fecha. Queríamos invitarte a formar parte de un día que significa muchísimo para nosotros.</p>
            <div class="v11-silhouette" aria-hidden="true">
              <svg viewBox="0 0 520 390" role="img">
                <ellipse class="wash" cx="260" cy="337" rx="190" ry="28"/>
                <path class="line" d="M185 310c22-62 28-117 13-164-8-26-4-48 13-65 22-22 54-20 73 4 12 15 16 32 12 50-8 37-3 75 14 115 8 20 15 40 21 60"/>
                <path class="line" d="M302 308c-5-45-4-88 2-128 5-30 2-52-10-66-14-17-32-22-51-15-20 7-30 22-31 44-1 19 5 39 18 60 20 33 31 68 33 105"/>
                <path class="line gold" d="M224 112c20 18 40 25 61 20"/>
                <path class="line gold" d="M248 250c23-11 47-11 72 0"/>
                <circle class="line gold" cx="228" cy="74" r="22"/><circle class="line" cx="303" cy="78" r="24"/>
                <path class="line" d="M210 82c-18 12-29 31-30 57M324 90c18 18 26 40 23 66"/>
                <path class="line gold" d="M175 326c42 12 83 16 124 13 35-3 66-10 93-22"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="v11-chapters">
          <div class="v11-chapter-grid">
            <article class="v11-card"><span class="v11-card__no">01 · NOSOTROS</span><h3>Lo extraordinario terminó siendo lo cotidiano.</h3><p>Planes improvisados, conversaciones eternas y pequeños momentos que poco a poco fueron construyendo un nosotros.</p></article>
            <article class="v11-card"><span class="v11-card__no">02 · EL SÍ</span><div class="v11-rings"></div><h3>Y un día decidimos seguir eligiéndonos.</h3><p>Sin prisa. A nuestra manera. Con la ilusión de compartir el siguiente capítulo con la gente que queremos.</p></article>
            <article class="v11-card"><span class="v11-card__no">03 · 27·02·2027</span><h3>Ahora queremos celebrarlo contigo.</h3><p>Un día entero en Finca Los Olivos, desde la ceremonia hasta el último baile.</p></article>
          </div>
        </div>
      </section>`);
  }

  const countdown=$('#v106Countdown');
  if(countdown && !$('#v11Question')){
    countdown.insertAdjacentHTML('beforebegin',`
      <section class="v11-question" id="v11Question">
        <div class="v11-kicker">Y ahora queremos preguntarte algo</div>
        <h2>Si estás aquí es porque formas parte de nuestra vida. <em>¿Nos acompañas?</em></h2>
      </section>`);
  }

  const eventCards=$$('.events .event');
  if(eventCards[0]){
    const img=eventCards[0].querySelector('.event-img');
    if(img) img.innerHTML=`<div class="v11-ceremony-art" aria-hidden="true"><svg viewBox="0 0 320 260"><path d="M56 220V96c0-30 23-54 52-54h104c29 0 52 24 52 54v124"/><path class="gold" d="M83 220V112c0-19 15-34 34-34h86c19 0 34 15 34 34v108"/><path d="M112 178c30-20 66-20 96 0M105 201h110"/><circle class="gold" cx="145" cy="132" r="28"/><circle class="gold" cx="177" cy="132" r="28"/><path d="M65 220h190"/></svg></div>`;
  }
  if(eventCards[1]) eventCards[1].querySelector('.event-img')?.setAttribute('aria-label','Banquete y celebración');

  const eventSection=$('.events')?.closest('.section');
  if(eventSection && !$('#v11Place')){
    eventSection.insertAdjacentHTML('afterend',`
      <section class="v11-place" id="v11Place">
        <div class="v11-place__wrap">
          <div class="v11-place__frame">
            <img class="v11-place__img" src="assets/images/venue-hq.jpg?v=111" alt="Finca Los Olivos, El Vellón" loading="eager" decoding="async">
          </div>
          <div class="v11-place__panel">
            <div class="v11-kicker">Todo sucede aquí</div>
            <h2>Finca Los Olivos<em>El Vellón · Madrid</em></h2>
            <p>La ceremonia, el banquete y la celebración tendrán lugar en el mismo espacio. Así podremos disfrutar del día entero sin romper el momento.</p>
            <div class="v11-place__buttons">
              <a class="primary" href="https://www.google.com/maps/search/?api=1&query=Finca+Los+Olivos+Paraje+Campillo+Alto+13+El+Vellon+Madrid" target="_blank" rel="noopener">Cómo llegar ↗</a>
              <button class="ghost" type="button" id="v11Calendar">Guardar la fecha</button>
            </div>
          </div>
        </div>
      </section>`);
  }

  $('#v11Calendar')?.addEventListener('click',()=>{
    const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//RocioIvan//Boda//ES','BEGIN:VEVENT','UID:rocio-ivan-20270227@invitacion','DTSTAMP:20260910T165800Z','DTSTART:20270227T113000Z','DTEND:20270227T225900Z','SUMMARY:Boda de Rocío e Iván','LOCATION:Finca Los Olivos - Paraje Campillo Alto 13, 28722 El Vellón, Madrid','DESCRIPTION:Ceremonia y celebración en Finca Los Olivos. Hora aproximada: 12:30 h.','END:VEVENT','END:VCALENDAR'].join('\r\n');
    const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='boda-rocio-ivan-27-02-2027.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });

  const submit=$('#v106Submit');
  if(submit) submit.textContent='Enviar confirmación ♡';
})();
