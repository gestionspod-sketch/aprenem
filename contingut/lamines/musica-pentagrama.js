/* Aprenem - làmina interactiva: el pentagrama i les notes en clau de sol, de fa i de do (Música)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Usa lmStaff i les dades de contingut/musica-lm.js (s'ha de carregar abans). */
function laminaPentagrama(){endSession();let clef='sol',mode='labels',hi=null;
 const PS=[-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
 const oct=l=>Math.floor(l/7)+4,nm=l=>LM_L[lmMod(l,7)];
 const where=p=>p>=2&&p<=10?(p%2===0?`a la ${MU_ORDF[(p-2)/2+1]} línia`:`al ${MU_ORDM[(p-1)/2]} espai`):({'-2':'a la 2a línia addicional de davall','-1':'davall la 1a línia addicional','0':'a la 1a línia addicional de davall','1':'just davall la 1a línia','11':'just damunt la 5a línia','12':'a la 1a línia addicional de damunt','13':'damunt la 1a línia addicional','14':'a la 2a línia addicional de damunt'})[p];
 const TOP={sol:['lm_clau_sol','mu_notes'],fa:['lm_clau_fa'],do3:['lm_clau_do'],do4:['lm_clau_do']};
 const REF={sol:'La clau de sol marca el <b>sol4</b> a la 2a línia.',fa:'La clau de fa en 4a marca el <b>fa3</b> a la 4a línia.',do3:'La clau de do en 3a marca el <b>do4</b> (do central) a la 3a línia.',do4:'La clau de do en 4a marca el <b>do4</b> (do central) a la 4a línia.'};
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-musica)">Làmina · Música</div><h2>El pentagrama i les claus</h2><p class="muted">Tria una clau i toca una nota: l'escoltaràs i veuràs com es diu.</p></div><button class="ghost" onclick="subject('musica')">← Tornar</button></div>
 <div class="card"><div class="tabs" style="margin:0 0 8px">${Object.keys(LM_OFF).map(c=>`<button data-cl="${c}" class="${c===clef?'on':''}">${muCap(LM_CLEFN[c])}</button>`).join('')}</div>
 <div class="tabs" style="margin:0 0 12px"><button id="pm1" class="on">Amb noms</button><button id="pm2">Sense noms (posa't a prova)</button></div><div id="psvg" style="overflow-x:auto"></div></div>
 <div class="card" id="pinfo"></div>
 <div class="row"><button id="pa">Aprendre el tema</button><button class="sec" id="pp">Practicar</button></div>`);
 const draw=()=>{const off=LM_OFF[clef];
  $('#psvg').innerHTML=lmStaff(PS.map(p=>({n:p-off,d:'r',id:p,hi:hi===p,lab:mode==='labels'||hi===p?nm(p-off):'',w:30})),{clef,aria:'Pentagrama interactiu'});
  $('#psvg').querySelectorAll('[data-n]').forEach(g=>g.onclick=()=>{hi=+g.dataset.n;const ac=muAC();if(ac)muTone(ac,ac.currentTime+.02,lmFreq({l:hi-off,a:0}),.8);draw()});
  $('#pinfo').innerHTML=hi==null?`<h3 style="margin-top:0">${muCap(LM_CLEFN[clef])}</h3><p style="margin:0">${REF[clef]} Toca qualsevol nota del pentagrama.</p>`
   :`<div class="eyebrow" style="color:var(--s-musica)">${muCap(LM_CLEFN[clef])}</div><h3 style="margin:4px 0 8px">${nm(hi-off)}${oct(hi-off)}</h3><p style="margin:0">És ${where(hi)}. ${REF[clef]}</p>`;
  document.querySelectorAll('[data-cl]').forEach(b=>b.className=b.dataset.cl===clef?'on':'')};
 document.querySelectorAll('[data-cl]').forEach(b=>b.onclick=()=>{clef=b.dataset.cl;hi=null;draw()});
 $('#pm1').onclick=()=>{mode='labels';$('#pm1').className='on';$('#pm2').className='';draw()};
 $('#pm2').onclick=()=>{mode='numbers';$('#pm2').className='on';$('#pm1').className='';hi=null;draw()};
 $('#pa').onclick=()=>start('professor',TOP[clef],15);$('#pp').onclick=()=>start('exercicis',TOP[clef],15);draw()}
lmAddLamina({obre:'laminaPentagrama()',nom:'El pentagrama i les claus',desc:'Clau de sol, de fa i de do: toca i escolta cada nota',ic:'music'});
