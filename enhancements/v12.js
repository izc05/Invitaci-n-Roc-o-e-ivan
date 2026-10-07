(()=>{
  'use strict';
  document.body.classList.add('v12');
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  $('#v105Moments')?.remove();
  $('#v11Story')?.remove();
  $('.emotion')?.remove();

  const heroNote=$('.v106-fine-note');
  if(heroNote) heroNote.textContent='13:30 h · Finca Los Olivos · El Vellón, Madrid';

  const nav=$('.nav');
  if(nav){
    const links=[...nav.querySelectorAll('a')];
    if(links[0]){links[0].textContent='Historia';links[0].href='#historia';}
    if(links[1]){links[1].textContent='Lugar';links[1].href='#v11Place';}
    if(links[2]){links[2].textContent='Momentos';links[2].href='#itinerario';}
    if(links[3]){links[3].textContent='Confirmar';links[3].href='#rsvp';}
  }

  const question=$('#v11Question');
  if(question){
    const kicker=question.querySelector('.v11-kicker');
    const h2=question.querySelector('h2');
    if(kicker) kicker.textContent='Y ahora queremos preguntarte algo';
    if(h2) h2.innerHTML='Si estás aquí es porque formas parte de nuestra vida. <em>¿Nos acompañas?</em>';
  }

  const oldCountdown=$('#v106Countdown');
  if(oldCountdown){
    oldCountdown.outerHTML=`<section class="v12-countdown" id="v12Countdown">
      <div class="v12-countdown__inner">
        <small>Cuenta atrás</small>
        <h2>Ya queda un poco menos<em>para nuestro día.</em></h2>
        <div class="v12-countdown__grid" aria-label="Cuenta atrás para la boda">
          <div class="v12-time"><strong id="v12Days">0</strong><span>Días</span></div>
          <div class="v12-time"><strong id="v12Hours">00</strong><span>Horas</span></div>
          <div class="v12-time"><strong id="v12Minutes">00</strong><span>Minutos</span></div>
          <div class="v12-time"><strong id="v12Seconds">00</strong><span>Segundos</span></div>
        </div>
        <div class="v12-date-line">Sábado · 27 de febrero de 2027 · 13:30 h</div>
      </div>
    </section>`;
  }
  const target=new Date('2027-02-27T13:30:00+01:00');
  const updateCountdown=()=>{
    const diff=Math.max(0,target-Date.now());
    const d=Math.floor(diff/86400000),h=Math.floor(diff%86400000/3600000),m=Math.floor(diff%3600000/60000),s=Math.floor(diff%60000/1000);
    $('#v12Days') && ($('#v12Days').textContent=d);
    $('#v12Hours') && ($('#v12Hours').textContent=String(h).padStart(2,'0'));
    $('#v12Minutes') && ($('#v12Minutes').textContent=String(m).padStart(2,'0'));
    $('#v12Seconds') && ($('#v12Seconds').textContent=String(s).padStart(2,'0'));
  };
  updateCountdown(); setInterval(updateCountdown,1000);

  $('.events')?.closest('.section')?.remove();

  const place=$('#v11Place');
  if(place){
    const panel=place.querySelector('.v11-place__panel');
    const kicker=panel?.querySelector('.v11-kicker');
    const title=panel?.querySelector('h2');
    const copy=panel?.querySelector('p');
    if(kicker) kicker.textContent='Todo sucederá aquí';
    if(title) title.textContent='Todo sucederá aquí';
    if(copy) copy.textContent='Para que solo tengamos que preocuparnos de disfrutar.';
    if(panel && !panel.querySelector('.v12-place-name')){
      const actions=panel.querySelector('.v11-place__buttons');
      actions?.insertAdjacentHTML('beforebegin','<div class="v12-place-name">Finca Los Olivos · El Vellón, Madrid</div>');
    }
    const oldCal=$('#v11Calendar');
    if(oldCal){
      const cal=oldCal.cloneNode(true); oldCal.replaceWith(cal);
      cal.addEventListener('click',()=>{
        const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//RocioIvan//Boda//ES','BEGIN:VEVENT','UID:rocio-ivan-20270227@invitacion','DTSTAMP:20261007T153000Z','DTSTART:20270227T123000Z','DTEND:20270227T225900Z','SUMMARY:Boda de Iván y Rocío','LOCATION:Finca Los Olivos - Paraje Campillo Alto 13, 28722 El Vellón, Madrid','DESCRIPTION:Ceremonia y celebración en Finca Los Olivos. Ceremonia: 13:30 h.','END:VEVENT','END:VCALENDAR'].join('\r\n');
        const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
        a.href=url;a.download='boda-ivan-rocio-27-02-2027.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      });
    }
  }

  const timeline=$('#itinerario');
  if(timeline){
    const title=timeline.querySelector('.title');
    if(title) title.textContent='Un día, muchos momentos';
    const list=timeline.querySelector('.timeline-list');
    if(list){
      list.innerHTML=`<div class="timeline-line" id="timelineLine"></div>
        <div class="stop reveal in"><time>13:30</time><h4>Ceremonia</h4><p>El comienzo de nuestra historia juntos.</p></div>
        <div class="stop reveal in"><time>Cóctel</time><h4>Cóctel</h4><p>Un brindis para celebrar este día con vosotros.</p></div>
        <div class="stop reveal in"><time>Banquete</time><h4>Banquete</h4><p>Compartiremos mesa, risas y buenos momentos.</p></div>
        <div class="stop reveal in"><time>Fiesta</time><h4>Fiesta</h4><p>Porque un día así, merece terminar bailando.</p></div>`;
    }
  }

  const shell=$('.rsvp-shell');
  if(shell){
    shell.innerHTML=`<div class="v12-rsvp" id="v12RsvpForm">
      <div class="v12-rsvp__head"><small>Confirmación</small><h3>¿Nos acompañas?</h3><p>Queremos preparar cada detalle pensando en vosotr@s</p></div>
      <div class="v12-field"><label>Nombre y apellidos <span class="v12-required">*</span></label><input class="v12-input" id="v12Name" autocomplete="name" placeholder="Tu nombre y apellidos"></div>
      <div class="v12-field" data-v12-q="attendance"><div>¿Confirmas tu asistencia? <span class="v12-required">*</span></div><div class="v12-choice two"><button type="button" data-value="Sí">Sí, allí estaré ♡</button><button type="button" data-value="No">No podré asistir</button></div></div>
      <div class="v12-field" data-v12-q="companion"><div>¿Vienes acompañado/a? <span class="v12-required">*</span></div><div class="v12-choice two"><button type="button" data-value="Sí">Sí</button><button type="button" data-value="No">No</button></div>
        <div class="v12-companions" id="v12Companions"><div id="v12CompanionRows"></div><button class="v12-add-companion" id="v12AddCompanion" type="button">+ Añadir otro acompañante</button></div>
      </div>
      <div class="v12-field" data-v12-q="bus"><div>¿Necesitas autobús? <span class="v12-required">*</span></div><div class="v12-choice"><button type="button" data-value="Sí, desde El Molar">Sí, desde El Molar 🚌</button><button type="button" data-value="Sí, desde San Agustín de Guadalix">Sí, desde San Agustín de Guadalix 🚌</button><button type="button" data-value="No">No</button></div></div>
      <div class="v12-field"><label>Alergias, intolerancias o preferencias alimentarias</label><textarea class="v12-textarea" id="v12Food" placeholder="Cuéntanos cualquier detalle que debamos tener en cuenta"></textarea></div>
      <button class="v12-submit" type="button" id="v12Submit">Enviar confirmación ♡</button>
    </div>
    <div class="v12-result" id="v12Result"><h3 id="v12Thanks">Gracias ♡</h3><p id="v12ThanksCopy"></p><button class="v12-back" type="button" id="v12Back">Modificar respuesta</button></div>`;

    const state={attendance:'',companion:'',bus:''};
    $$('[data-v12-q]').forEach(group=>group.querySelectorAll('.v12-choice button').forEach(btn=>btn.addEventListener('click',()=>{
      group.querySelectorAll('.v12-choice button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); state[group.dataset.v12Q]=btn.dataset.value;
      if(group.dataset.v12Q==='companion'){
        const box=$('#v12Companions');
        if(btn.dataset.value==='Sí'){
          box?.classList.add('show'); if(!$('#v12CompanionRows')?.children.length) addCompanion();
        }else{
          box?.classList.remove('show'); if($('#v12CompanionRows')) $('#v12CompanionRows').innerHTML='';
        }
      }
    })));

    function addCompanion(){
      const rows=$('#v12CompanionRows'); if(!rows)return;
      const n=rows.children.length+1, row=document.createElement('div'); row.className='v12-companion-row';
      row.innerHTML=`<label>Acompañante ${n}<input class="v12-input v12-companion-name" placeholder="Nombre y apellidos"></label><button class="v12-remove-companion" type="button" aria-label="Quitar acompañante">Quitar</button>`;
      row.querySelector('.v12-remove-companion').addEventListener('click',()=>{row.remove();renumberCompanions();}); rows.appendChild(row);
    }
    function renumberCompanions(){
      $$('.v12-companion-row').forEach((row,i)=>{const label=row.querySelector('label');if(label)label.childNodes[0].nodeValue=`Acompañante ${i+1}`;});
    }
    $('#v12AddCompanion')?.addEventListener('click',addCompanion);

    $('#v12Submit')?.addEventListener('click',()=>{
      const name=$('#v12Name')?.value.trim();
      if(!name){$('#v12Name')?.focus();return;}
      if(!state.attendance){return;}
      if(state.attendance==='Sí'&&!state.companion){return;}
      if(state.attendance==='Sí'&&!state.bus){return;}
      if(state.companion==='Sí'){
        const names=$$('.v12-companion-name').map(x=>x.value.trim());
        if(!names.length||names.some(x=>!x)){const empty=$$('.v12-companion-name').find(x=>!x.value.trim());empty?.focus();return;}
      }
      $('#v12RsvpForm').style.display='none'; $('#v12Result').classList.add('show');
      $('#v12Thanks').textContent=`Gracias, ${name} ♡`;
      $('#v12ThanksCopy').textContent=state.attendance==='Sí'?'Nos hace muchísima ilusión saber que compartirás este día con nosotros.':'Gracias por avisarnos. Te tendremos muy presente en un día tan especial.';
    });
    $('#v12Back')?.addEventListener('click',()=>{$('#v12Result').classList.remove('show');$('#v12RsvpForm').style.display='block';});
  }

  const foot=$('footer');
  if(foot){foot.querySelector('small')?.remove();const p=foot.querySelector('p');if(p)p.textContent='27 de febrero de 2027';}
})();