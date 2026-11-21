/* Aprenem - MATEMÀTIQUES: illa de l'aventura interactiva («L'Illa dels Nombres Perduts»)
   Part de l'app d'estudi. Vegeu CLAUDE.md (secció «Aventura: motor i illes») per a l'API del motor.
   Estacions (jocs que es fan movent coses; la resposta visual queda amagada fins que es comprova):
     1. El pont trencat     — sumar fraccions amb taulons (frac_suma_dif, frac_suma_igual, mt_comu_den, frac_equiv)
     2. El riu de les pedres — situar decimals (i fraccions) a la recta (mt_dec_ordre, decimals, mt_frac_dec)
     3. La balança del moll  — igualtats: treure el mateix dels dos plats i repartir (mt_equacions)
     4. El mapa del pirata  — coordenades i àrea del rectangle (mt_coordenades, mt_area_quad)
     Segell (el posa el motor): la porta del guardià, exercici escrit sense pistes amb un dels temes de la sessió. */

Object.assign(ERR,{
 mt_av_numerador:{kid:'Has posat tants taulons com diu el numerador, però els taulons han de ser de la mida que diu el denominador (o d\'una mida equivalent). Passa-ho tot a la mateixa mida de tauló.',par:'Llegeix el numerador d\'una fracció sense tenir en compte el denominador (la mida de les parts)'},
 mt_av_frac_coma:{kid:'Has llegit la fracció com si fos un decimal. Una fracció és una divisió: numerador entre denominador (3/4 = 3 : 4 = 0,75).',par:'Converteix una fracció en decimal posant el numerador darrere la coma (3/4 → 0,3)'},
 mt_av_area_punts:{kid:'Has comptat els punts de la quadrícula i no els quadres. Compta els espais que hi ha entre les línies.',par:'En calcular àrees a la quadrícula compta punts en lloc de quadres'}
});

(()=>{
 const NOMU={6:'sisens',8:'vuitens',12:'dotzens'},COL=['#F7B6A3','#9FC3F5','#A9E0BE','#F5D58A','#D2C1FA'],TRAY=['#FCD9CE','#D6E8FD','#D4F1E4','#FDEFC8','#ECE4FF'];

 /* ---------- 1. El pont trencat (fraccions) ---------- */
 const pont={id:'pont',nom:'El pont trencat',desc:'Construeix el tros de pont que falta amb taulons de fraccions.',
  skills:['frac_suma_dif','frac_suma_igual','mt_comu_den','frac_equiv'],
  render(el,api){
   const fams=api.lv===0?[{U:8,ds:[2,4,8]}]:[{U:8,ds:[2,4,8]},{U:12,ds:[3,6,12]},{U:6,ds:[2,3,6]}].concat(api.lv>1?[{U:12,ds:[2,3,4,12]}]:[]);
   const fam=pick(fams),U=fam.U;let ds=fam.ds.slice();
   const wet=api.lv>0&&ds.length>2&&Math.random()<.4?ds.shift():null;   // els taulons més grans s'han mullat
   let n,gn,gd;do{n=rnd(2,U-1);const g=gcd(n,U);gn=n/g;gd=U/g}while(ds.some(d=>gd===d&&gn===1)||(api.lv>0&&gd===U&&Math.random()<.5));
   const gap=F(gn,gd),gapT=`${gn}/${gd}`;let placed=[];
   el.innerHTML=`<p>Al pont li falta un tros de <b>${gap}</b> de metre. Construeix-lo amb taulons${wet?` (els de ${F(1,wet)} s'han mullat i no es poden fer servir)`:''}.
    La boira no deixa veure el forat i els taulons es dibuixen tots iguals: has de <b>calcular</b> quins sumen exactament ${gap}.</p>
    <svg class="av-stage" viewBox="0 0 700 220" role="img" aria-label="Pont amb un forat tapat per la boira"></svg>
    <div class="av-tray">${ds.map((d,i)=>`<button class="av-chip" data-d="${d}" style="background:${TRAY[i]}">+ ${F(1,d)} m</button>`).join('')}</div>
    <div class="av-count" aria-live="polite"></div>
    <div class="av-row"><button class="av-chk">Prova el pont</button><button class="sec av-clr">Treu-los tots</button></div>`;
   const svg=el.querySelector('svg'),cnt=el.querySelector('.av-count'),chk=el.querySelector('.av-chk');
   const colOf=d=>COL[fam.ds.indexOf(d)%COL.length];
   const draw=(real,owlX)=>{const tot=placed.reduce((s,d)=>s+U/d,0);let x=real?120:130;
    const segs=placed.map((d,i)=>{const w=real?460*(U/d)/tot:Math.min(50,440/Math.max(1,placed.length))-6;
     const s=`<g class="pl" data-i="${i}" style="cursor:pointer"><rect x="${x+1}" y="96" width="${Math.max(8,w-2)}" height="26" rx="6" fill="${colOf(d)}" stroke="#fff" stroke-width="2"/>${w>30?`<text x="${x+w/2}" y="114" text-anchor="middle" font-size="13" fill="#1E1B3A">1/${d}</text>`:''}</g>`;x+=real?w:w+6;return s}).join('');
    svg.innerHTML=`<rect width="700" height="220" fill="#DDF1FA"/><path d="M0 110h120v110H0ZM580 110h120v110H580Z" fill="#B98B5E"/><path d="M0 104h120v10H0ZM580 104h120v10H580Z" fill="#8FC77A"/>
     <path d="M120 200q230 -30 460 0v20H120Z" fill="#7CC6E8"/>${real?'':'<rect x="120" y="66" width="460" height="96" rx="14" fill="#fff" opacity=".6"/><text x="350" y="56" text-anchor="middle" font-size="20" fill="#5E5B74">Forat tapat per la boira</text>'}
     ${segs}${AV.owlG(owlX??40,40,56)}`;
    cnt.textContent=placed.length?`Has posat ${placed.length} ${placed.length===1?'tauló':'taulons'}. Toca'n un per treure'l.`:'Encara no has posat cap tauló.';
    chk.disabled=!placed.length||!!chk.dataset.fi};
   svg.onclick=e=>{const g=e.target.closest('.pl');if(!g||chk.dataset.fi)return;placed.splice(+g.dataset.i,1);draw()};
   el.querySelectorAll('.av-chip').forEach(b=>b.onclick=()=>{if(placed.length<14){placed.push(+b.dataset.d);draw()}});
   el.querySelector('.av-clr').onclick=()=>{placed=[];draw()};
   const solve=()=>{let r=[],m=n;for(const d of ds.slice().sort((a,b)=>a-b))while(m>=U/d){r.push(d);m-=U/d}return r};
   const steps=()=>{const s=solve();return[`Passa-ho tot a <b>${NOMU[U]}</b>: ${ds.map(d=>`un tauló de ${F(1,d)} són ${F(U/d,U)}`).join(', ')}.`,
    gd===U?`El forat, ${gap}, ja són <b>${n} ${NOMU[U]}</b>.`:`El forat, ${gap}, són <b>${n} ${NOMU[U]}</b>: ${F(gn,gd)} = ${F(gn+' × '+U/gd,gd+' × '+U/gd)} = ${F(n,U)}.`,
    `Busca taulons que sumin ${n} ${NOMU[U]}. Per exemple: ${s.map(d=>F(1,d)).join(' + ')} = ${s.map(d=>U/d).join(' + ')} ${NOMU[U]} = ${F(n,U)}.`]};
   chk.onclick=()=>{const sum=placed.reduce((s,d)=>s+U/d,0);
    if(sum===n){chk.dataset.fi=1;el.querySelectorAll('.av-chip,.av-clr').forEach(b=>b.disabled=true);draw(true);
     api.ok({msg:`<b>El pont aguanta!</b> ${placed.map(d=>F(1,d)).join(' + ')} = ${placed.map(d=>U/d).join(' + ')} ${NOMU[U]} = ${F(n,U)}${gd!==U?' = '+gap:''} m.`});
     AV.anim(1500,e=>draw(true,40+e*560));return}
    const g=gcd(sum,U),sf=sum<1e-9?'0':AV.frac(sum,U);
    const err=placed.length===gn&&!placed.every(d=>d===gd)?'mt_av_numerador':null;
    const r=api.fail({err,steps:steps(),msg:err?`<b>Els taulons cauen a l'aigua.</b> ${ERR[err].kid}`:`<b>Els taulons cauen a l'aigua.</b> Els teus taulons fan ${placed.length>1?placed.map(d=>U/d).join(' + ')+' = ':''}${sum} ${NOMU[U]} (${sf} m), i el forat fa ${gap} m. Quants ${NOMU[U]} són ${gap}?`});
    if(r==='retry'){placed=[];draw()}};
   draw()}};

 /* ---------- 2. El riu de les pedres (decimals a la recta) ---------- */
 const FRS=[[1,2,.5],[1,4,.25],[3,4,.75],[1,5,.2],[2,5,.4],[3,5,.6],[4,5,.8],[3,2,1.5],[5,4,1.25],[7,4,1.75],[6,5,1.2],[7,5,1.4]];
 const riu={id:'riu',nom:'El riu de les pedres',desc:'Posa cada pedra al seu lloc de la recta numèrica per creuar el riu.',
  skills:['mt_dec_ordre','decimals','mt_frac_dec'],
  render(el,api){
   // a pantalles estretes (mòbil) la recta només té una unitat (0-1 o 1-2): les ratlles queden prou separades per al dit
   const nar=(el.clientWidth||700)<520,lo=nar?pick([0,1]):0,hi=nar?lo+1:2,W=nar?420:700,m=nar?36:60,z=nar?1.3:1;
   const pool=[];for(let c=1;c<40;c++){const v=c*5/100;if(c%20===0||v<=lo||v>=hi)continue;if(c%2===1&&api.lv===0)continue;pool.push(v)}
   let vals;do{vals=[];let tries=0;while(vals.length<3&&tries++<200){const v=pick(pool);if(!vals.some(w=>Math.abs(w.v-v)<.199))vals.push({v,t:AV.dc(v)})}}while(vals.length<3);
   // una pedra amb fracció si es practica el pas de fracció a decimal (o al nivell alt)
   if(api.ks.includes('mt_frac_dec')||api.lv>1){const c=AV.shuf(FRS).find(f=>f[2]>lo&&f[2]<hi&&!vals.slice(1).some(w=>Math.abs(w.v-f[2])<.199));if(c)vals[0]={v:c[2],t:`${c[0]}/${c[1]}`,f:c}}
   vals.sort((a,b)=>a.v-b.v);const ord=AV.shuf([0,1,2]);   // a la safata, desordenades
   const X=v=>m+(v-lo)*(W-2*m)/(hi-lo),placed=[null,null,null];let sel=null,fin=false;
   el.innerHTML=`<p>Arrossega cada pedra fins al seu punt de la recta (o toca una pedra i després el lloc). Només hi ha marcats ${nar?(lo===0?"el 0 i l'1":"l'1 i el 2"):"el 0, l'1 i el 2"}: cada ratlla petita és una dècima.</p>
    <svg class="av-stage" viewBox="0 0 ${W} 250" role="img" aria-label="Riu amb una recta numèrica del ${lo} al ${hi}"></svg>
    <div class="av-row"><button class="av-chk" disabled>Salta per les pedres</button></div>`;
   const svg=el.querySelector('svg'),chk=el.querySelector('.av-chk');
   const bank=i=>W*(ord.indexOf(i)+1)/4;
   const draw=owlX=>{let t='';for(let i=lo*10;i<=hi*10;i++){const x=X(i/10),big=i%10===0,half=i%5===0;
     t+=`<line x1="${x}" y1="${big?130:half?136:141}" x2="${x}" y2="${big?170:half?164:159}" stroke="#1E1B3A" stroke-width="${big?3:2}" opacity="${big?1:.55}"/>`;if(big)t+=`<text x="${x}" y="194" text-anchor="middle" font-size="${18*z}" font-weight="500" fill="#1E1B3A">${i/10}</text>`}
    svg.innerHTML=`<rect width="${W}" height="250" fill="#DDF1FA"/><path d="M0 110q${W/4} -16 ${W/2} 0t${W/2} 0v80q-${W/4} 16 -${W/2} 0t-${W/2} 0Z" fill="#7CC6E8" opacity=".6"/>
     <line x1="${X(lo)}" y1="150" x2="${X(hi)}" y2="150" stroke="#1E1B3A" stroke-width="3"/>${t}
     ${placed.map((p,i)=>p===null?'':`<g class="stone" data-i="${i}" style="cursor:grab"><ellipse cx="${X(p)}" cy="150" rx="${24*z}" ry="${14*z}" fill="${sel===i?'#8B6CF0':'#A39E92'}" stroke="#fff" stroke-width="2"/><text x="${X(p)}" y="${150+5*z}" text-anchor="middle" font-size="${13*z}" fill="#fff">${vals[i].t}</text></g>`).join('')}
     ${vals.map((s,i)=>placed[i]!==null?'':`<g class="stone" data-i="${i}" style="cursor:grab"><ellipse cx="${bank(i)}" cy="222" rx="${(sel===i?33:29)*z}" ry="${(sel===i?20:18)*z}" fill="${sel===i?'#8B6CF0':'#A39E92'}" stroke="#fff" stroke-width="3"/><text x="${bank(i)}" y="${222+6*z}" text-anchor="middle" font-size="${16*z}" font-weight="500" fill="#fff">${s.t}</text></g>`).join('')}
     ${AV.owlG(owlX??8,62,48*z)}`;
    chk.disabled=fin||placed.some(p=>p===null)};
   const onLine=p=>p.y>95&&p.y<200&&p.x>m-30&&p.x<W-m+30,snap=p=>lo+Math.round(Math.max(0,Math.min(1,(p.x-m)/(W-2*m)))*(hi-lo)*20)/20;
   AV.drag(svg,{items:'.stone',disabled:()=>fin,
    onDrop(g,p){const i=+g.dataset.i;placed[i]=onLine(p)?snap(p):null;sel=null;draw()},
    onTap(g){const i=+g.dataset.i;if(placed[i]!==null){placed[i]=null;sel=i}else sel=sel===i?null:i;draw()},
    onTapEmpty(p){if(sel!==null&&onLine(p)){placed[sel]=snap(p);sel=null;draw()}}});
   const steps=w=>{if(w.f)return[`Una fracció és una divisió: ${F(w.f[0],w.f[1])} = ${w.f[0]} : ${w.f[1]} = <b>${AV.dc(w.v)}</b>.`,...steps({v:w.v,t:AV.dc(w.v)}).slice(1)];
    const ent=Math.floor(w.v+1e-9),cc=Math.round((w.v-ent)*100),dc=Math.floor(cc/10),half=cc%10!==0;
    return[`Entre dos nombres sencers hi ha 10 ratlles petites: cada una és una dècima (<b>0,1</b>). La ratlla més llarga del mig és el 0,5 (o l'1,5).`,
     `<b>${w.t}</b> és ${ent} i ${cc} centèsimes${half?'':` (${dc} ${dc===1?'dècima':'dècimes'})`}. Comença ${ent===1?"a l'":'al '}<b>${ent}</b> i compta <b>${dc}</b> ${dc===1?'ratlla':'ratlles'}${half?' i <b>mitja</b> més':''}.`,'Fes igual amb les altres pedres: compta sempre les dècimes des del sencer.']};
   chk.onclick=()=>{const bad=vals.map((s,i)=>Math.abs(placed[i]-s.v)>.001);
    if(!bad.some(Boolean)){fin=true;chk.disabled=true;const pts=[8,...vals.map(s=>X(s.v)-24*z),W-60*z];
     api.ok({msg:`<b>Has creuat el riu!</b> ${vals.map(s=>s.f?`${F(s.f[0],s.f[1])} = ${AV.dc(s.v)}`:s.t).join(' &lt; ')}: totes les pedres eren al seu lloc.`});
     AV.anim(1800,e=>{const k=e*4,sg=Math.min(3,Math.floor(k)),f=k-sg;draw(pts[sg]+(pts[sg+1]-pts[sg])*f)});return}
    let err=null;vals.forEach((s,i)=>{if(!bad[i])return;const p=placed[i];
     if(s.f&&(Math.abs(p-s.f[0]/10)<.001||Math.abs(p-(s.f[0]+s.f[1]/10)/10)<.001))err='mt_av_frac_coma';
     else if(!s.f){const cc=Math.round(s.v*100)%100,ent=Math.floor(s.v+1e-9);if(cc<10&&Math.abs(p-(ent+cc/10))<.001||cc%10===0&&Math.abs(p-(ent+cc/1000))<.001)err=err||'mt_dec_posicio'}});
    const msg=vals.map((s,i)=>bad[i]?`la pedra <b>${s.t}</b> l'has posada a ${AV.dc(placed[i])}`:null).filter(Boolean).join('; ');
    const w=vals.find((s,i)=>bad[i]);
    const r=api.fail({err,steps:steps(w),msg:`<b>Una pedra s'enfonsa!</b> ${msg[0].toUpperCase()+msg.slice(1)}. ${err?ERR[err].kid:'Compta les dècimes des del nombre sencer.'}`});
    if(r==='retry'){vals.forEach((s,i)=>{if(bad[i])placed[i]=null});draw()}};
   draw()}};

 /* ---------- 3. La balança del moll (igualtats) ---------- */
 const balanca={id:'balanca',nom:'La balança del moll',desc:'Descobreix quant pesa cada sac sense trencar l\'equilibri.',
  skills:['mt_equacions'],
  render(el,api){const L=api.lv;
   const k=rnd(2,L===0?4:L===1?5:6),x=rnd(L===0?2:3,L===0?9:L===1?15:25),b=rnd(L===0?1:2,L===0?9:L===1?20:30),c=k*x+b;
   let phase=0;   // 0: treure la pesa · 1: quant queda a l'altre plat · 2: quant pesa un sac · 3: fet
   el.innerHTML=`<p>La barca només es pot carregar si saps quant pesa <b>cada sac</b>. La balança està en <b>equilibri</b>: a l'esquerra hi ha <b>${k} sacs iguals</b> i una pesa de <b>${b} kg</b>; a la dreta, una pesa de <b>${c} kg</b>.</p>
    <p class="muted" style="font-size:15px">En matemàtiques: ${k} × □ + ${b} = ${c}</p>
    <svg class="av-stage" viewBox="0 0 700 300" role="img" aria-label="Balança en equilibri"></svg><div class="av-q2"><div class="av-tip">${AV.owl(36)}<div>Per començar, <b>treu la pesa de ${b} kg</b> del plat esquerre: toca-la o arrossega-la a terra.</div></div></div>`;
   const svg=el.querySelector('svg'),q=el.querySelector('.av-q2');
   const draw=()=>{const tilt=phase===1?6:0,rad=tilt*Math.PI/180,cx=350,cy=64,arm=210;
    const L0={x:cx-arm*Math.cos(rad),y:cy-arm*Math.sin(rad)},R0={x:cx+arm*Math.cos(rad),y:cy+arm*Math.sin(rad)};
    const plate=(p,inner)=>`<line x1="${p.x-100}" y1="${p.y+110}" x2="${p.x}" y2="${p.y}" stroke="#8A879E" stroke-width="2"/><line x1="${p.x+100}" y1="${p.y+110}" x2="${p.x}" y2="${p.y}" stroke="#8A879E" stroke-width="2"/><path d="M${p.x-122} ${p.y+110}h244q-14 18 -122 18t-122 -18Z" fill="#C9B8FA"/>${inner}`;
    const sacs=Array.from({length:k},(_,j)=>{const cols=3,row=Math.floor(j/cols),col=j%cols,n=Math.min(cols,k-row*cols);
     const bx=L0.x-(phase===0?44:0)+(col-(n-1)/2)*48,by=L0.y+110-row*40;
     return`<path d="M${bx-20} ${by}q-6 -32 8 -38h24q14 6 8 38Z" fill="#E2B77A" stroke="#fff" stroke-width="2"/><text x="${bx}" y="${by-11}" text-anchor="middle" font-size="16" font-weight="500" fill="#5B3B12">${phase===3?x:'?'}</text>`}).join('');
    const pesa=(px,py,txt,cls="")=>`<g ${cls}>${cls?`<rect x="${px-52}" y="${py-60}" width="104" height="70" fill="transparent"/>`:""}<path d="M${px-38} ${py}l8 -40h60l8 40Z" fill="#6E6B85"/><text x="${px}" y="${py-13}" text-anchor="middle" font-size="17" font-weight="500" fill="#fff">${txt}</text></g>`;
    svg.innerHTML=`<rect width="700" height="300" fill="#EAF6FB"/><path d="M0 268h700v32H0Z" fill="#C79B6B"/>
     <path d="M${cx-38} 268h76l-28 -204h-20Z" fill="#8A879E"/><circle cx="${cx}" cy="${cy}" r="10" fill="#4E4B66"/>
     <line x1="${L0.x}" y1="${L0.y}" x2="${R0.x}" y2="${R0.y}" stroke="#4E4B66" stroke-width="9" stroke-linecap="round"/>
     ${plate(L0,sacs+(phase===0?pesa(L0.x+72,L0.y+110,b+' kg','class="pes" style="cursor:pointer"'):''))}
     ${plate(R0,pesa(R0.x,R0.y+110,(phase>=2?c-b:c)+' kg'))}
     ${phase>=1?pesa(250,292,b+' kg'):''}${phase>=2?pesa(450,292,b+' kg'):''}`};
   AV.drag(svg,{items:'.pes',disabled:()=>phase!==0,onDrop(){remove()},onTap(){remove()}});
   function remove(){if(phase!==0)return;phase=1;draw();api.restart();
    q.innerHTML=`<div class="av-tip">${AV.owl(36)}<div>La balança s'ha desequilibrat! Per tornar-la a equilibrar has de treure <b>el mateix</b> del plat dret: ${b} kg. Quants kg hi quedaran?</div></div>${AV.answer('Kg que queden al plat dret')}`;
    AV.onAnswer(q,v=>check(v))}
   const steps=[`A la balança: ${k} × □ + ${b} = ${c}.`,`Treim ${b} kg de cada plat (la suma es desfà restant): ${k} × □ = ${c} − ${b} = ${c-b}.`,`Repartim els ${c-b} kg entre els ${k} sacs (la multiplicació es desfà dividint): □ = ${c-b} : ${k} = <b>${x} kg</b>.`,`Comprovació: ${k} × ${x} + ${b} = ${k*x} + ${b} = ${c}.`];
   function check(v){const y=AV.num(v);if(!isFinite(y)){api.tip('Escriu un nombre (per exemple <b>12</b>).','warn');return}
    if(phase===1){if(y===c-b){phase=2;draw();api.clear();api.restart();
      q.innerHTML=`<div class="av-tip ok">${AV.owl(36)}<div>Equilibri de nou: ${c} − ${b} = ${c-b} kg. Ara els <b>${k} sacs</b> pesen <b>${c-b} kg</b> entre tots.</div></div>${AV.answer('Quants kg pesa cada sac?')}`;AV.onAnswer(q,v2=>check(v2));return}
     api.fail({err:y===c+b?'mt_eq_inversa':null,steps,msg:y===c+b?`Has sumat ${b} kg al plat dret, però del plat esquerre els hem tret! ${ERR.mt_eq_inversa.kid}`:`Si treus ${b} kg d'un plat que en té ${c}, fes la resta amb calma: ${c} − ${b}.`});return}
    if(phase===2){if(y===x){phase=3;draw();api.ok({msg:`<b>La barca ja es pot carregar!</b> Cada sac pesa ${x} kg: ${k} × ${x} + ${b} = ${c}.`});return}
     const e=y===(c-b)*k||y===c-b-k?'mt_eq_inversa':null;
     api.fail({err:e,steps,msg:e?`${k} sacs iguals pesen ${c-b} kg: per saber-ne un, has de <b>repartir</b>. ${ERR.mt_eq_inversa.kid}`:`Comprova-ho: si cada sac pesàs ${AV.dc(y)} kg, ${k} sacs farien ${k} × ${AV.dc(y)} = ${AV.dc(k*y)} kg, i han de fer ${c-b} kg.`})}}
   draw()}};

 /* ---------- 4. El mapa del pirata (coordenades i àrea) ---------- */
 const pirata={id:'pirata',nom:'El mapa del pirata',desc:'Situa les banderes als punts del mapa i calcula l\'àrea del camp del tresor.',
  skills:['mt_coordenades','mt_area_quad'],
  render(el,api){const neg=api.lv>0&&api.k==='mt_coordenades'||api.lv>1;
   const x0=neg?-4:0,x1=neg?4:8,y0=neg?-3:0,y1=neg?3:6,s=neg?56:52,ox=50,oy=24,W=(x1-x0)*s+ox*2,H=(y1-y0)*s+oy+44;
   const PX=v=>ox+(v-x0)*s,PY=v=>oy+(y1-v)*s,cx=v=>v<0?'−'+(-v):String(v);
   let A,C;do{A=[rnd(x0,x1-2),rnd(y0,y1-2)];C=[rnd(A[0]+2,x1),rnd(A[1]+2,y1)]}while((C[0]-A[0])*(C[1]-A[1])>20||(C[0]-A[0])*(C[1]-A[1])<6||(neg&&A[0]>=0&&A[1]>=0&&Math.random()<.8));
   if(Math.random()<.5){const t=A[1];A=[A[0],C[1]];C=[C[0],t]}   // de vegades A és el de dalt a l'esquerra
   const w=C[0]-A[0],h=Math.abs(C[1]-A[1]),area=w*h,F_=[{l:'A',c:'#E8564A',p:A},{l:'C',c:'#5B8DEF',p:C}],pos=[null,null];let act=0,phase=0;
   el.innerHTML=`<p>El pirata va enterrar el tresor dins un <b>camp rectangular</b>. Al mapa diu: «Dos cantons oposats del camp són <b>A(${cx(A[0])}, ${cx(A[1])})</b> i <b>C(${cx(C[0])}, ${cx(C[1])})</b>».
    Posa cada bandera al seu punt: toca la bandera i després el punt (o arrossega-la).</p>
    <div class="av-tray">${F_.map((f,i)=>`<button class="av-chip" data-f="${i}"><span style="color:${f.c}">⚑</span> Bandera ${f.l}</button>`).join('')}</div>
    <svg class="av-stage" viewBox="0 0 ${W} ${H}" style="max-width:${neg?560:520}px;margin:0 auto" role="img" aria-label="Quadrícula amb eixos de coordenades"></svg>
    <div class="av-row"><button class="av-chk" disabled>Comprova les banderes</button></div><div class="av-q2"></div>`;
   const svg=el.querySelector('svg'),chk=el.querySelector('.av-chk'),q=el.querySelector('.av-q2'),chips=el.querySelectorAll('.av-chip');
   const draw=()=>{let g='';for(let v=x0;v<=x1;v++)g+=`<line x1="${PX(v)}" y1="${PY(y1)}" x2="${PX(v)}" y2="${PY(y0)}" stroke="${v===0?'#1E1B3A':'#C9D6E8'}" stroke-width="${v===0?2.5:1.2}"/><text x="${PX(v)}" y="${PY(y0)+(neg?20:22)}" text-anchor="middle" font-size="16" fill="#4E4B66">${cx(v)}</text>`;
    for(let v=y0;v<=y1;v++)g+=`<line x1="${PX(x0)}" y1="${PY(v)}" x2="${PX(x1)}" y2="${PY(v)}" stroke="${v===0?'#1E1B3A':'#C9D6E8'}" stroke-width="${v===0?2.5:1.2}"/>${v===0&&neg?'':`<text x="${PX(x0)-14}" y="${PY(v)+5}" text-anchor="end" font-size="16" fill="#4E4B66">${cx(v)}</text>`}`;
    const rect=phase>=1?`<rect x="${PX(A[0])}" y="${PY(Math.max(A[1],C[1]))}" width="${w*s}" height="${h*s}" fill="#F7C948" fill-opacity=".35" stroke="#C78B12" stroke-width="3" stroke-dasharray="8 6"/>`:'';
    const flags=F_.map((f,i)=>pos[i]?`<g class="flag" data-i="${i}" style="cursor:grab"><circle cx="${PX(pos[i][0])}" cy="${PY(pos[i][1])}" r="16" fill="transparent"/><line x1="${PX(pos[i][0])}" y1="${PY(pos[i][1])}" x2="${PX(pos[i][0])}" y2="${PY(pos[i][1])-34}" stroke="#4E4B66" stroke-width="3"/><path d="M${PX(pos[i][0])} ${PY(pos[i][1])-34}h24l-6 8 6 8h-24Z" fill="${f.c}"/><circle cx="${PX(pos[i][0])}" cy="${PY(pos[i][1])}" r="5" fill="${f.c}" stroke="#fff" stroke-width="2"/><text x="${PX(pos[i][0])+12}" y="${PY(pos[i][1])-21}" text-anchor="middle" font-size="11" font-weight="500" fill="#fff">${f.l}</text></g>`:'').join('');
    svg.innerHTML=`<rect width="${W}" height="${H}" fill="#FBF3DF" rx="18"/>${g}<text x="${PX(x1)+16}" y="${PY(0)+5}" font-size="14" font-weight="500" fill="#1E1B3A">x</text>${neg?`<text x="${PX(0)+8}" y="${PY(y1)-6}" font-size="14" font-weight="500" fill="#1E1B3A">y</text>`:''}${rect}${flags}`;
    chips.forEach((b,i)=>b.classList.toggle('on',i===act&&phase===0));chk.disabled=phase>0||pos.some(p=>!p)};
   const near=p=>[Math.max(x0,Math.min(x1,Math.round((p.x-ox)/s+x0))),Math.max(y0,Math.min(y1,Math.round(y1-(p.y-oy)/s)))];
   const put=(i,p)=>{pos[i]=near(p);const n=pos.findIndex(v=>!v);act=n>=0?n:i;draw()};
   chips.forEach((b,i)=>b.onclick=()=>{act=i;draw()});
   AV.drag(svg,{items:'.flag',disabled:()=>phase>0,onDrop(g,p){put(+g.dataset.i,p)},onTap(g){act=+g.dataset.i;draw()},onTapEmpty(p){put(act,p)}});
   const steps=[`Per situar A(${cx(A[0])}, ${cx(A[1])}): primer la <b>x</b>, ${A[0]===0?'et quedes a l\'eix vertical':`${Math.abs(A[0])} ${A[0]>0?'cap a la dreta':'cap a l\'esquerra'}`}; després la <b>y</b>, ${A[1]===0?'et quedes a l\'eix horitzontal':`${Math.abs(A[1])} ${A[1]>0?'amunt':'avall'}`}.`,
    `Igual amb C(${cx(C[0])}, ${cx(C[1])}): ${C[0]===0?'x = 0':`${Math.abs(C[0])} ${C[0]>0?'a la dreta':'a l\'esquerra'}`} i ${C[1]===0?'y = 0':`${Math.abs(C[1])} ${C[1]>0?'amunt':'avall'}`}.`,
    `La base del camp va de x = ${cx(A[0])} a x = ${cx(C[0])}: ${w} quadres. L'altura va de y = ${cx(Math.min(A[1],C[1]))} a y = ${cx(Math.max(A[1],C[1]))}: ${h} quadres.`,
    `Àrea del rectangle = base × altura = ${w} × ${h} = <b>${area} quadres</b>.`];
   chk.onclick=()=>{const bad=F_.map((f,i)=>pos[i][0]!==f.p[0]||pos[i][1]!==f.p[1]);
    if(!bad.some(Boolean)){phase=1;draw();api.clear();api.restart();chips.forEach(b=>b.disabled=true);
     q.innerHTML=`<div class="av-tip ok">${AV.owl(36)}<div>Banderes al lloc! Aquest és el camp del tresor. Per saber quanta terra cal remenar, calcula'n l'<b>àrea</b>.</div></div>${AV.answer('Àrea del camp (en quadres)')}`;
     AV.onAnswer(q,v=>{const y=AV.num(v);if(!isFinite(y)){api.tip('Escriu un nombre (per exemple <b>12</b>).','warn');return}
      if(y===area){phase=2;api.ok({msg:`<b>Tresor desenterrat!</b> Base ${w} × altura ${h} = ${area} quadres.`});return}
      const e=y===2*(w+h)?'mt_area_perimetre':y===(w+1)*(h+1)?'mt_av_area_punts':null;
      api.fail({err:e,k:'mt_area_quad',steps,msg:e?ERR[e].kid:`Compta quants quadres fa la base i quants l'altura del camp. L'àrea és base × altura.`})});return}
    let err=null;F_.forEach((f,i)=>{if(!bad[i])return;const p=pos[i];if(p[0]===f.p[1]&&p[1]===f.p[0])err='mt_coord_ordre';else if(Math.abs(p[0])===Math.abs(f.p[0])&&Math.abs(p[1])===Math.abs(f.p[1]))err=err||'mt_coord_signe'});
    const msg=F_.map((f,i)=>bad[i]?`la bandera ${f.l} l'has posada a (${cx(pos[i][0])}, ${cx(pos[i][1])}), i el pirata diu ${f.l}(${cx(f.p[0])}, ${cx(f.p[1])})`:null).filter(Boolean).join('; ');
    const r=api.fail({err,steps,msg:`<b>Aquí no hi ha res!</b> ${msg[0].toUpperCase()+msg.slice(1)}. ${err?ERR[err].kid:'Recorda: primer la x (esquerra-dreta) i després la y (amunt-avall).'}`});
    if(r==='retry'){F_.forEach((f,i)=>{if(bad[i])pos[i]=null});act=pos.findIndex(v=>!v);if(act<0)act=0;draw()}};
   draw()}};

 (ILLES.mates=ILLES.mates||[]).push({id:'nombres-perduts',nom:'L\'Illa dels Nombres Perduts',
  mapa:{mar:'#BFE6F5',sorra:'#F6E3B4',herba:'#CDE9B5',deco:'<circle cx="200" cy="262" r="18" fill="#9DD18A"/><circle cx="420" cy="150" r="22" fill="#9DD18A"/><circle cx="560" cy="292" r="16" fill="#9DD18A"/><path d="M612 40l10 18h-20Z" fill="#fff" opacity=".8"/><path d="M60 60q20 -10 40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>'},
  segell:{nom:'La porta del guardià',desc:'Un repte escrit, sense pistes i amb un sol intent.',txt:'«Respon-me sense ajuda i la porta s\'obrirà.»'},
  estacions:[pont,riu,balanca,pirata]});
})();
