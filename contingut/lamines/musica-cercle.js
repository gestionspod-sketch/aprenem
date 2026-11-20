/* Aprenem - làmina interactiva: el cercle de quintes (Música, Llenguatge musical d'elementals)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Usa la teoria de contingut/musica-lm.js (s'ha de carregar abans). */
function laminaCercle(){endSession();let hi=null,mode='labels';
 const nOf=i=>i<=6?i:i-12; // posició al cercle (0 = do, a dalt; sentit del rellotge = sostinguts)
 const svg=()=>{const C=180,ang=i=>(-90+i*30)*Math.PI/180,P=(r,i)=>[C+r*Math.cos(ang(i)),C+r*Math.sin(ang(i))];let s='';
  for(let i=0;i<12;i++){const n=nOf(i),h=hi===i,M=lmMajor(n),m=lmMinor(n),[x1,y1]=P(150,i),[x2,y2]=P(104,i),[x3,y3]=P(64,i);
   const lbM=mode==='labels'||h?(i===6?'fa♯/sol♭':lmNomC(M)):'?',lbm=mode==='labels'||h?(i===6?'re♯/mi♭':lmNomC(m)):'';
   s+=`<g data-i="${i}" style="cursor:pointer"><circle cx="${x1}" cy="${y1}" r="27" fill="${h?MU_HI:'#8B5CF6'}"/><text x="${x1}" y="${y1+5}" text-anchor="middle" font-size="${i===6?11:15}" font-weight="800" fill="#fff">${lbM}</text>
    <circle cx="${x2}" cy="${y2}" r="20" fill="${h?'#FDE2CF':'#EDE9FE'}"/><text x="${x2}" y="${y2+4}" text-anchor="middle" font-size="${i===6?9:12}" font-weight="700" fill="#4C1D95">${lbm}</text>
    <text x="${x3}" y="${y3+4}" text-anchor="middle" font-size="11" font-weight="700" fill="#64748B">${n?Math.abs(n)+(n>0?'♯':'♭'):'0'}${i===6?'/6♭':''}</text></g>`}
  return`<svg viewBox="0 0 360 360" style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto" role="img" aria-label="Cercle de quintes"><circle cx="180" cy="180" r="44" fill="#F5F3FF"/><text x="180" y="176" text-anchor="middle" font-size="11" fill="#64748B">majors fora</text><text x="180" y="190" text-anchor="middle" font-size="11" fill="#64748B">menors dins</text>${s}</svg>`};
 const info=()=>{if(hi==null)return`<h3 style="margin-top:0">El cercle de quintes</h3><p style="margin:0">Cada pas en el sentit del rellotge puja una <b>5a justa</b> i afegeix un <b>sostingut</b>. En sentit contrari, afegeix un <b>bemoll</b>. A fora hi ha les tonalitats <b>majors</b> i a dins les seves <b>relatives menors</b> (mateixa armadura). Toca una tonalitat.</p>`;
  const ns=hi===6?[6,-6]:[nOf(hi)];return ns.map(n=>{const M=lmMajor(n),m=lmMinor(n),sc=[...lmScale(M,'maj'),{l:M.l+7,a:M.a}];
   return`<h3 style="margin:0 0 6px">${muCap(lmKey(M,'major'))} · ${lmKey(m,'menor')}</h3><p style="margin:0 0 6px">Armadura: <b>${n?lmAltTxt(n):'cap alteració'}</b>${n?' ('+lmKsAcc(n).map(lmNomC).join(', ')+')':''}.</p>${lmStaff([],{ks:n,minW:200})}<p style="margin:6px 0">Escala: ${sc.map(lmNomC).join(' – ')}</p>${muSndBtn(lmEv(sc,{gap:.4,dur:.38}),'Escolta l\'escala major')}`}).join('<hr style="border:0;border-top:1px solid #E2E8F0;margin:14px 0">')};
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-musica)">Làmina · Llenguatge musical</div><h2>El cercle de quintes</h2><p class="muted">Toca una tonalitat per veure'n l'armadura, la relativa i l'escala.</p></div><button class="ghost" onclick="subject('musica')">← Tornar</button></div>
 <div class="lam"><div class="card lam-fig"><div class="tabs" style="margin:0 0 12px"><button id="cm1" class="on">Amb noms</button><button id="cm2">Sense noms (posa't a prova)</button></div><div id="csvg"></div></div>
 <div><div class="card" id="cinfo"></div><div class="row"><button id="ca">Aprendre el tema</button><button class="sec" id="cp">Practicar</button></div></div></div>`);
 const draw=()=>{$('#csvg').innerHTML=svg();$('#cinfo').innerHTML=info();$('#csvg').querySelectorAll('[data-i]').forEach(g=>g.onclick=()=>{hi=+g.dataset.i;draw()})};
 $('#cm1').onclick=()=>{mode='labels';$('#cm1').className='on';$('#cm2').className='';draw()};
 $('#cm2').onclick=()=>{mode='numbers';hi=null;$('#cm2').className='on';$('#cm1').className='';draw()};
 $('#ca').onclick=()=>start('professor',['lm_cercle','lm_relatiu'],15);$('#cp').onclick=()=>start('exercicis',['lm_cercle','lm_relatiu','lm_armadura'],15);draw()}
lmAddLamina({obre:'laminaCercle()',nom:'El cercle de quintes',desc:'Tonalitats majors i menors, armadures i escales',ic:'music',lm:true});
