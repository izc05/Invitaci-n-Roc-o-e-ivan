(()=>{
  'use strict';
  document.body.classList.add('v106');
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TARGET=new Date('2027-02-27T12:30:00+01:00');

  const heroDate=$('.hero-date');
  if(heroDate){
    heroDate.textContent='27 · 02 · 2027';
    heroDate.insertAdjacentHTML('afterend','<div class="v106-fine-note">12:30 h aprox. · Finca Los Olivos · El Vellón, Madrid</div>');
  }

  const moments=$$('[data-v105-moment]');
  const momentPhotos=[
    ['assets/venue/venue-garden-path.webp','El camino de Finca Los Olivos'],
    ['assets/venue/venue-table.webp','Detalles de Finca Los Olivos'],
    ['assets/venue/venue-night-path.webp','Finca Los Olivos al anochecer']
  ];
  moments.forEach((sec,i)=>{
    const img=sec.querySelector('.v105-moment__photo');
    if(img&&momentPhotos[i]){img.src=momentPhotos[i][0];img.alt=momentPhotos[i][1];}
  });
  const cats=$('[data-v105-cats] .v105-cats__photo');
  if(cats){cats.src='assets/venue/venue-love.webp';cats.alt='Zona de celebración de Finca Los Olivos';}
  const catsCopy=$('[data-v105-cats] .v105-cats__copy');
  if(catsCopy){
    catsCopy.innerHTML='<small>Cuando llegue el momento</small><h3>Todo estará preparado para celebrarlo.</h3><p>Después del “sí”, la historia seguirá aquí mismo: sin traslados, sin prisas, rodeados de nuestra gente y disfrutando cada momento juntos.</p>';
  }

  const eventSection=$('.events')?.closest('.section');
  if(eventSection&&!$('#v106Countdown')){
    eventSection.insertAdjacentHTML('beforebegin',`
      <section class="v106-countdown" id="v106Countdown">
        <div class="v106-countdown__inner">
          <small>Cuenta atrás</small>
          <h2>Ya queda un poco menos<em>para nuestro día.</em></h2>
          <div class="v106-countdown__grid" aria-label="Cuenta atrás para la boda">
            <div class="v106-time"><strong id="v106Days">0</strong><span>Días</span></div>
            <div class="v106-time"><strong id="v106Hours">00</strong><span>Horas</span></div>
            <div class="v106-time"><strong id="v106Minutes">00</strong><span>Minutos</span></div>
            <div class="v106-time"><strong id="v106Seconds">00</strong><span>Segundos</span></div>
          </div>
          <div class="v106-date-line">Sábado · 27 de febrero de 2027 · 12:30 h aprox.</div>
        </div>
      </section>`);
  }

  function updateCountdown(){
    const diff=Math.max(0,TARGET-Date.now());
    const d=Math.floor(diff/86400000),h=Math.floor(diff%86400000/3600000),m=Math.floor(diff%3600000/60000),s=Math.floor(diff%60000/1000);
    if($('#v106Days'))$('#v106Days').textContent=d;
    if($('#v106Hours'))$('#v106Hours').textContent=String(h).padStart(2,'0');
    if($('#v106Minutes'))$('#v106Minutes').textContent=String(m).padStart(2,'0');
    if($('#v106Seconds'))$('#v106Seconds').textContent=String(s).padStart(2,'0');
  }
  updateCountdown();setInterval(updateCountdown,1000);

  const cards=$$('.events .event');
  if(cards[0]){
    const s=cards[0].querySelector('small'),h=cards[0].querySelector('h3'),p=cards[0].querySelector('p');
    if(s)s.textContent='Ceremonia · 12:30 h aprox.';
    if(h)h.textContent='Finca Los Olivos';
    if(p)p.textContent='La ceremonia se celebrará en la propia finca, en El Vellón. Todo empieza aquí y queremos vivirlo contigo desde el primer momento.';
  }
  if(cards[1]){
    const s=cards[1].querySelector('small'),h=cards[1].querySelector('h3'),p=cards[1].querySelector('p');
    if(s)s.textContent='Banquete y celebración · mismo lugar';
    if(h)h.textContent='Finca Los Olivos';
    if(p)p.textContent='Después de la ceremonia no habrá que desplazarse: cóctel, banquete y celebración continuarán en la misma finca.';
  }

  if(eventSection&&!$('#v106Place')){
    eventSection.insertAdjacentHTML('afterend',`
      <section class="v106-place" id="v106Place">
        <div class="v106-place__sticky">
          <img class="v106-place__photo" src="assets/venue/venue-glasshouse-exterior.webp" alt="Finca Los Olivos, El Vellón">
          <div class="v106-place__shade"></div>
          <div class="v106-place__copy">
            <small>Todo sucede aquí</small>
            <h2>Finca Los Olivos<em>El Vellón · Madrid</em></h2>
            <p>La ceremonia, el banquete y la celebración tendrán lugar en el mismo espacio. Así podremos disfrutar del día entero sin romper el momento.</p>
            <div class="v106-actions">
              <a class="primary" href="https://www.google.com/maps/search/?api=1&query=Finca+Los+Olivos+El+Vellón+Madrid" target="_blank" rel="noopener">Cómo llegar ↗</a>
              <button class="ghost" type="button" id="v106Calendar">Guardar la fecha</button>
            </div>
          </div>
        </div>
      </section>
      <section class="v106-gallery" id="v106Gallery">
        <div class="v106-gallery__inner">
          <small>El lugar</small>
          <h2>Algunos rincones que muy pronto<em style="display:block;font:400 .68em 'Brush Script MT','Segoe Script',cursive;color:var(--wine);margin-top:7px">formarán parte de nuestros recuerdos.</em></h2>
          <div class="v106-gallery__grid">
            <div class="v106-gallery__main"><img src="assets/venue/venue-ceremony.webp" alt="Zona de ceremonia de Finca Los Olivos"></div>
            <div class="v106-gallery__side">
              <div><img src="assets/venue/venue-table.webp" alt="Mesa preparada en Finca Los Olivos"></div>
              <div><img src="assets/venue/venue-love.webp" alt="Zona de celebración iluminada"></div>
            </div>
          </div>
        </div>
      </section>`);
  }

  $('#v106Calendar')?.addEventListener('click',()=>{
    const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//RocioIvan//Boda//ES','BEGIN:VEVENT','UID:rocio-ivan-20270227@invitacion','DTSTAMP:20260910T063000Z','DTSTART:20270227T113000Z','DTEND:20270227T225900Z','SUMMARY:Boda de Rocío e Iván','LOCATION:Finca Los Olivos, El Vellón, Madrid','DESCRIPTION:Ceremonia y celebración en Finca Los Olivos. Hora de ceremonia aproximada: 12:30 h.','END:VEVENT','END:VCALENDAR'].join('\r\n');
    const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='boda-rocio-ivan-27-02-2027.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
  });

  const shell=$('.rsvp-shell');
  if(shell){
    shell.innerHTML=`
      <div class="v106-form" id="v106Form">
        <div class="v106-form__head"><h3>¿Nos acompañas?</h3><p>Cuéntanos solo lo necesario para poder cuidar cada detalle.</p></div>
        <div class="v106-question"><label>Nombre y apellidos <span class="v106-required">*</span></label><input class="v106-input" id="v106Name" autocomplete="name" placeholder="Tu nombre y apellidos"></div>
        <div class="v106-question" data-q="attendance"><div>¿Confirmas tu asistencia? <span class="v106-required">*</span></div><div class="v106-choice"><button type="button" data-value="Sí, allí estaré ♡">Sí, allí estaré ♡</button><button type="button" data-value="No podré asistir">No podré asistir</button></div></div>
        <div class="v106-question" data-q="companion"><div>¿Vienes acompañado/a? <span class="v106-required">*</span></div><div class="v106-choice two"><button type="button" data-value="Sí">Sí</button><button type="button" data-value="No">No</button></div></div>
        <div class="v106-question" data-q="bus"><div>¿Necesitas autobús? <span class="v106-required">*</span></div><div class="v106-choice"><button type="button" data-value="Sí, desde El Molar">Sí, desde El Molar 🚌</button><button type="button" data-value="Sí, desde San Agustín de Guadalix">Sí, desde San Agustín de Guadalix 🚌</button><button type="button" data-value="No">No</button></div></div>
        <div class="v106-question"><label>¿Tienes alguna alergia, intolerancia o preferencia alimentaria?</label><textarea class="v106-textarea" id="v106Food" placeholder="Cuéntanos cualquier detalle que debamos tener en cuenta"></textarea></div>
        <button class="v106-submit" type="button" id="v106Submit">Confirmar respuesta ♡</button>
      </div>
      <div class="v106-result" id="v106Result"><h3 id="v106Thanks">Gracias ♡</h3><p id="v106ThanksCopy"></p><button class="v106-back" type="button" id="v106Back">Modificar respuesta</button></div>`;
    const state={attendance:'',companion:'',bus:''};
    $$('[data-q]').forEach(group=>group.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
      group.querySelectorAll('button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');state[group.dataset.q]=btn.dataset.value;
    })));
    $('#v106Submit')?.addEventListener('click',()=>{
      const name=$('#v106Name')?.value.trim();if(!name){$('#v106Name')?.focus();return}if(!state.attendance||!state.companion||!state.bus)return;
      $('#v106Form').style.display='none';$('#v106Result').classList.add('show');$('#v106Thanks').textContent=`Gracias, ${name} ♡`;
      $('#v106ThanksCopy').textContent=state.attendance.startsWith('Sí')?'Nos hace muchísima ilusión saber que compartirás este día con nosotros.':'Gracias por avisarnos. Te tendremos muy presente en un día tan especial.';
    });
    $('#v106Back')?.addEventListener('click',()=>{$('#v106Result').classList.remove('show');$('#v106Form').style.display='block';});
  }

  let ticking=false;const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function sceneProgress(sec){const r=sec.getBoundingClientRect(),span=Math.max(1,sec.offsetHeight-innerHeight);return clamp(-r.top/span,0,1)}
  function parallaxV106(){
    const place=$('#v106Place');if(place&&!reduce){const p=sceneProgress(place),img=place.querySelector('.v106-place__photo');if(img)img.style.transform=`translate3d(0,${-125+250*p}px,0) scale(${1.20-.14*p})`;}
    $$('.v106-gallery img').forEach((img,i)=>{if(reduce)return;const r=img.parentElement.getBoundingClientRect(),y=clamp((innerHeight*.5-r.top)*.045,-36,36)*(i%2?-.85:1);img.style.transform=`translate3d(0,${y}px,0) scale(1.10)`;});
    ticking=false;
  }
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(parallaxV106)}},{passive:true});addEventListener('resize',parallaxV106,{passive:true});parallaxV106();
})();
