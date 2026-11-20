/* Aprenem - làmina interactiva: el teclat del piano amb tons, semitons, intervals i escales (Música)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Usa la teoria de contingut/musica-lm.js (s'ha de carregar abans). */
function laminaPiano(){endSession();let mode='int',sel=[],flat=false,ton=0;
 const WK=14,BW=[0,1,3,4,5]; // tecles blanques (2 octaves des de do4) i darrere quines hi ha tecla negra
 const wSem=w=>12*Math.floor(w/7)+LM_SEMI[w%7];
 const keys=[];for(let w=0;w<WK;w++){keys.push({s:wSem(w),w,black:false});if(BW.includes(w%7))keys.push({s:wSem(w)+1,w,black:true})}
 const noteOf=s=>{const k=keys.find(x=>x.s===s);if(!k.black)return{l:k.w,a:0};return flat?{l:k.w+1,a:-1}:{l:k.w,a:1}};
 const scaleSet=()=>{if(mode!=='esc')return null;const t=lmMajor(ton),sc=[...lmScale(t,'maj'),{l:t.l+7,a:t.a}];return sc.map(lmS)};
 const kb=()=>{const ss=scaleSet(),on=s=>sel.includes(s)||ss&&ss.includes(s);
  let w='',b='',ts='';keys.forEach(k=>{if(k.black)b+=`<g data-s="${k.s}" style="cursor:pointer"><rect x="${k.w*40+28}" y="1" width="25" height="100" fill="${on(k.s)?MU_HI:'#1F2A44'}" stroke="#1F2A44"/></g>`;
   else w+=`<g data-s="${k.s}" style="cursor:pointer"><rect x="${k.w*40+1}" y="1" width="39" height="166" fill="${on(k.s)?'#FDE2CF':'#fff'}" stroke="#1F2A44" stroke-width="1.5"/><text x="${k.w*40+20}" y="155" text-anchor="middle" font-size="13" font-weight="700" fill="#475569">${LM_L[k.w%7]}</text></g>`});
  if(mode==='int')for(let i=0;i<WK-1;i++){const st=wSem(i+1)-wSem(i)===1;ts+=`<text x="${i*40+40}" y="190" text-anchor="middle" font-size="13" font-weight="800" fill="${st?MU_HI:'#64748B'}">${st?'S':'T'}</text>`}
  else if(ss){for(let i=0;i<7;i++){const a=ss[i],bb=ss[i+1],x1=keys.find(k=>k.s===a),x2=keys.find(k=>k.s===bb),cx=k=>k.black?k.w*40+40:k.w*40+20;if(x1&&x2)ts+=`<text x="${(cx(x1)+cx(x2))/2}" y="190" text-anchor="middle" font-size="13" font-weight="800" fill="${bb-a===1?MU_HI:'#64748B'}">${bb-a===1?'S':'T'}</text>`}}
  return`<svg viewBox="0 0 ${WK*40+2} 200" style="width:100%;height:auto;display:block;touch-action:manipulation" role="img" aria-label="Teclat de piano">${w}${b}${ts}</svg>`};
 const info=()=>{if(mode==='esc'){const t=lmMajor(ton),sc=[...lmScale(t,'maj'),{l:t.l+7,a:t.a}];
   return`<h3 style="margin-top:0">Escala de ${lmKey(t,'major')}</h3><p style="font-size:20px;font-weight:800;margin:0 0 6px">${sc.map(lmNomC).join(' – ')}</p><p class="muted" style="margin:0 0 8px">Esquema: T T S T T T S · armadura: ${ton?lmAltTxt(ton)+' ('+lmKsAcc(ton).map(lmNomC).join(' ')+')':'cap alteració'}</p>${lmStaff(sc.map(z=>({n:z.l,d:'r',w:34})),{ks:ton,minW:200})}${muSndBtn(lmEv(sc,{gap:.4,dur:.38}),'Escolta l\'escala')}`}
  if(!sel.length)return`<h3 style="margin-top:0">Tons i semitons</h3><p style="margin:0">Toca <b>dues tecles</b> per veure quin interval formen. Entre dues tecles del costat (blanca o negra) hi ha un <b>semitò</b> (S); un <b>to</b> (T) són dos semitons. Entre <b>mi-fa</b> i <b>si-do</b> no hi ha tecla negra: hi ha només un semitò.</p>`;
  const [a,b]=[...sel].sort((x,y)=>x-y),n1=noteOf(a);if(sel.length===1)return`<h3 style="margin-top:0">${lmNom(n1)}</h3><p style="margin:0">Ara toca una altra tecla.</p>`;
  const n2=noteOf(b),I=lmIntOf(n1,n2),ok=I.k>=1&&I.k<=8&&I.q;
  return`<h3 style="margin-top:0">${lmNom(n1)} – ${lmNom(n2)}</h3><p style="font-size:20px;font-weight:800;margin:0 0 6px">${ok?(I.k===1?'Uníson '+(I.q==='A'?'augmentat':''):lmIntName(I.k,I.q)):'Més d\'una octava'}</p><p style="margin:0 0 8px"><b>${b-a}</b> semitons (${Math.floor((b-a)/2)} to${Math.floor((b-a)/2)===1?'':'ns'}${(b-a)%2?' i 1 semitò':''}).</p>${lmStaff([{n:n1.l,acc:n1.a,d:'r'},{n:n2.l,acc:n2.a,d:'r'}],{minW:170})}${muSndBtn(lmEv([n1,n2],{harm:true}),'Escolta l\'interval')}`};
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-musica)">Làmina · Música</div><h2>El teclat: tons, semitons i escales</h2><p class="muted">Toca les tecles per escoltar-les i descobrir els intervals.</p></div><button class="ghost" onclick="subject('musica')">← Tornar</button></div>
 <div class="card"><div class="tabs" style="margin:0 0 8px"><button id="km1" class="on">Intervals</button><button id="km2">Escales majors</button></div>
 <div class="row" id="kopt" style="margin:0 0 10px;align-items:center"></div><div id="kkb"></div></div><div class="card" id="kinfo"></div>
 <div class="row"><button id="ka">Aprendre els intervals</button><button class="sec" id="kp">Practicar</button></div>`);
 const draw=()=>{$('#kopt').innerHTML=mode==='int'?`<label style="margin:0"><input type="checkbox" id="kfl" ${flat?'checked':''}> Anomena les tecles negres amb bemolls (♭)</label>`
   :`<label style="margin:0">Tonalitat: <select id="kton">${[...Array(13).keys()].map(i=>i-6).map(n=>`<option value="${n}" ${n===ton?'selected':''}>${lmKey(lmMajor(n),'major')} (${n?lmAltTxt(n):'cap alteració'})</option>`).join('')}</select></label>`;
  $('#kkb').innerHTML=kb();$('#kinfo').innerHTML=info();
  const fl=$('#kfl');if(fl)fl.onchange=()=>{flat=fl.checked;draw()};const tn=$('#kton');if(tn)tn.onchange=()=>{ton=+tn.value;draw()};
  $('#kkb').querySelectorAll('[data-s]').forEach(g=>g.onclick=e=>{e.stopPropagation();const s=+g.dataset.s;const ac=muAC();if(ac)muTone(ac,ac.currentTime+.02,261.63*2**(s/12),.8);
   if(mode==='int'){sel=sel.length>=2?[s]:sel.includes(s)?sel:[...sel,s]}draw()})};
 $('#km1').onclick=()=>{mode='int';$('#km1').className='on';$('#km2').className='';draw()};
 $('#km2').onclick=()=>{mode='esc';sel=[];$('#km2').className='on';$('#km1').className='';draw()};
 $('#ka').onclick=()=>start('professor',mode==='int'?['lm_int_classe']:['lm_escala_major'],15);$('#kp').onclick=()=>start('exercicis',mode==='int'?['lm_int_classe','lm_enharmonia']:['lm_escala_major','lm_armadura'],15);draw()}
lmAddLamina({obre:'laminaPiano()',nom:'El teclat: tons, semitons i escales',desc:'Toca dues tecles i descobreix l\'interval; mira com es fa cada escala',ic:'music'});
