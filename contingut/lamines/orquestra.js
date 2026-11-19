/* Aprenem - làmina interactiva: l'orquestra simfònica (Música, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Plànol de l'orquestra vista des de dalt: cada sector és un grup d'instruments, pintat amb el color de la seva família. */
/* ================= Làmina: l'orquestra ================= */
const ORQ_FAM={corda:{nom:'corda',col:'#F2A93B',fosc:'#B56F06'},fusta:{nom:'vent fusta',col:'#5CC48A',fosc:'#1F7A4A'},metall:{nom:'vent metall',col:'#F6D04D',fosc:'#9A7A05'},perc:{nom:'percussió',col:'#B28DF0',fosc:'#6237B0'},dir:{nom:'director',col:'#CBD5E1',fosc:'#475569'}};
// s: [radi intern, radi extern, angle inicial, angle final] (graus; 180 = esquerra, 0 = dreta)
const ORQ={
 vl1:{n:1,nom:'Violins primers',curt:'Violins I',a:'violins primers|violins|violí|violi|violins i|primers violins',fam:'corda',s:[52,128,180,136],f:'Toquen sovint la melodia principal. El primer violí és el <b>concertino</b>, que ajuda el director.'},
 vl2:{n:2,nom:'Violins segons',curt:'Violins II',a:'violins segons|violins|violí|violi|violins ii|segons violins',fam:'corda',s:[52,128,136,92],f:'Acompanyen els primers violins i sovint toquen una melodia una mica més greu.'},
 vla:{n:3,nom:'Violes',curt:'Violes',a:'violes|viola',fam:'corda',s:[52,128,92,48],f:'Són una mica més grans i greus que els violins. Es toquen amb arc, recolzades a l\'espatlla.'},
 vc:{n:4,nom:'Violoncels',curt:'Violoncels',a:'violoncels|violoncel|cellos|cello',fam:'corda',s:[52,128,48,0],f:'Es toquen asseguts, amb l\'instrument recolzat a terra. Tenen un so greu i càlid.'},
 cb:{n:5,nom:'Contrabaixos',curt:'Contrabaixos',a:'contrabaixos|contrabaix',fam:'corda',s:[128,190,34,0],f:'Són els instruments de corda més grans i més greus. Es toquen drets o asseguts en un tamboret alt.'},
 arpa:{n:6,nom:'Arpa',curt:'Arpa',a:'arpa|arpes',fam:'corda',s:[128,190,180,148],lv:1,f:'Instrument de corda pinçada amb moltes cordes. Es toca amb els dits de les dues mans.'},
 fusta:{n:7,nom:'Vent fusta',curt:'Vent fusta',a:'vent fusta|vent de fusta|fusta|instruments de vent fusta',fam:'fusta',s:[128,190,148,34],f:'Flautes, oboès, clarinets i fagots. Se situen al centre, darrere la corda.'},
 metall:{n:8,nom:'Vent metall',curt:'Vent metall',a:'vent metall|vent de metall|metall|instruments de vent metall',fam:'metall',s:[190,242,165,15],f:'Trompes, trompetes, trombons i tuba. Tenen molta potència, per això van darrere.'},
 perc:{n:9,nom:'Percussió',curt:'Percussió',a:'percussió|percussio|instruments de percussió',fam:'perc',s:[242,290,140,40],f:'Timbals, bombo, caixa, plats, triangle, xilòfon... Van al fons de tot.'},
 dir:{n:10,nom:'Director',curt:'Director',a:'director|directora|director d\'orquestra|directora d\'orquestra',fam:'dir',s:null,f:'Dirigeix l\'orquestra amb la <b>batuta</b>: marca el tempo, les entrades i la dinàmica. Mira tots els músics i tots el miren a ell o a ella.'}};
const ORQ_C=[300,360];
function orqSec(r1,r2,a1,a2){const[cx,cy]=ORQ_C,P=(r,a)=>[(cx+r*Math.cos(a*Math.PI/180)).toFixed(1),(cy-r*Math.sin(a*Math.PI/180)).toFixed(1)];
 const[x1,y1]=P(r2,a1),[x2,y2]=P(r2,a2),[x3,y3]=P(r1,a2),[x4,y4]=P(r1,a1);return`M${x1} ${y1}A${r2} ${r2} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r1} ${r1} 0 0 0 ${x4} ${y4}Z`}
function orqSVG({mode='labels',hi=null}={}){const show=mode==='labels',[cx,cy]=ORQ_C;
 const parts=Object.entries(ORQ).map(([id,o])=>{const F=ORQ_FAM[o.fam],h=hi===id;let shape,lx,ly;
  if(o.s){const[r1,r2,a1,a2]=o.s,rm=(r1+r2)/2,am=(a1+a2)/2;shape=`<path d="${orqSec(r1,r2,a1,a2)}" fill="${F.col}" stroke="${h?'#1E3FD0':'#fff'}" stroke-width="${h?4:2.5}"/>`;lx=cx+rm*Math.cos(am*Math.PI/180);ly=cy-rm*Math.sin(am*Math.PI/180)}
  else{shape=`<rect x="${cx-30}" y="${cy-8}" width="60" height="34" fill="${F.col}" stroke="${h?'#1E3FD0':'#fff'}" stroke-width="${h?4:2.5}"/>`;lx=cx;ly=cy+9}
  const txt=show?`<text x="${lx.toFixed(1)}" y="${(ly+19).toFixed(1)}" text-anchor="middle" font-size="14.5" font-weight="700" fill="${F.fosc}">${o.curt}</text>`:'';
  return`<g data-part="${id}" style="cursor:pointer">${shape}<circle cx="${lx.toFixed(1)}" cy="${(ly-(show?5:0)).toFixed(1)}" r="12" fill="${h?'#1E3FD0':'#121C4D'}"/><text x="${lx.toFixed(1)}" y="${(ly-(show?5:0)+4).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${o.n}</text>${txt}</g>`}).join('');
 const leg=Object.entries(ORQ_FAM).filter(([k])=>k!=='dir').map(([k,F],i)=>`<rect x="${20+i*142}" y="426" width="16" height="16" fill="${F.col}"/><text x="${42+i*142}" y="439" font-size="13" font-weight="600" fill="#334155">${F.nom}</text>`).join('');
 return`<svg class="lamsvg" viewBox="0 58 600 392" role="img" aria-label="Plànol de l'orquestra simfònica">${parts}<text x="300" y="${cy+44}" text-anchor="middle" font-size="12" fill="#64748B">↓ el públic</text>${leg}</svg>`}
const ORQ_Q=[['dirigeix l\'orquestra amb una batuta','dir'],['són els instruments de corda més grans i més greus','cb'],['toquen sovint la melodia principal i inclouen el concertino','vl1'],['es toquen asseguts, amb l\'instrument recolzat a terra, i són més petits que els contrabaixos','vc'],['són una mica més grans que els violins i es toquen recolzades a l\'espatlla','vla'],['inclou flautes, oboès, clarinets i fagots','fusta'],['inclou trompes, trompetes, trombons i tuba','metall'],['inclou timbals, bombo, plats i triangle, i se situa al fons','perc']];
SK.mu_orquestra={mat:'musica',curs:[6],ab:'Oq',nom:'L\'orquestra simfònica',fig:()=>orqSVG(),
 teoria:['Una <b>orquestra simfònica</b> és un grup gran de músics (entre 60 i 100) que toquen junts instruments de les quatre famílies: corda, vent fusta, vent metall i percussió.','Els músics se situen en semicercle davant el <b>director</b>: la <b>corda</b> davant (és la família amb més músics), el <b>vent fusta</b> al centre, el <b>vent metall</b> darrere i la <b>percussió</b> al fons, perquè els instruments que sonen més fort van més enrere.','Mira el plànol i toca cada grup a la làmina per saber-ne més:'],
 gen(lv){const ids=Object.keys(ORQ).filter(id=>lv>0||!ORQ[id].lv);
  const errOf=id=>v=>Object.entries(ORQ).some(([o,r])=>o!==id&&r.a.split('|').map(fold).includes(fold(v[0]))&&!ORQ[id].a.split('|').map(fold).includes(fold(v[0])))?'mu_orquestra':null;
  if(lv>0&&Math.random()<.3){const id=pick(ids.filter(i=>i!=='dir')),o=ORQ[id],F=ORQ_FAM[o.fam],fam=o.fam==='corda'?['corda','instruments de corda','de corda']:o.fam==='perc'?['percussió','de percussió']:[F.nom,`de ${F.nom}`];
   return{text:`Observa el plànol. A quina família d'instruments pertany el grup número <b>${o.n}</b>?`,fig:orqSVG({mode:'numbers',hi:id}),fields:[muA(fam,'Família')],
    hints:['Fixa\'t en el color del grup i en el lloc on seu.','Corda davant, vent fusta al centre, vent metall darrere i percussió al fons.'],steps:[`El número ${o.n} són els/les <b>${o.nom.toLowerCase()}</b>.`,`Són de la família de <b>${F.nom}</b>.`],err:null}}
  if(Math.random()<.65){const id=pick(ids),o=ORQ[id];
   return{text:`Observa el plànol de l'orquestra. Qui seu al lloc número <b>${o.n}</b>?`,fig:orqSVG({mode:'numbers',hi:id}),fields:[muA(o.a.split('|'),'Grup d\'instruments')],
    hints:[`Pista: ${o.f.replace(/<\/?b>/g,'')}`.replace(new RegExp(o.nom,'gi'),'…'),`Comença per «${o.nom[0]}».`],steps:[`El número ${o.n} és: <b>${o.nom}</b>.`,o.f],err:errOf(id)}}
  const[q,id]=pick(ORQ_Q.filter(x=>ids.includes(x[1]))),o=ORQ[id];
  return{text:`Quin grup de l'orquestra ${q}?`,fields:[muA(o.a.split('|'),'Grup')],
   hints:['Recorda: corda davant, vent fusta al centre, vent metall darrere i percussió al fons.',`Comença per «${o.nom[0]}».`],steps:[`És: <b>${o.nom}</b>.`,o.f],err:errOf(id)}}};
Object.assign(ERR,{mu_orquestra:{kid:'Compte! Aquest és un altre grup de l\'orquestra. Fixa\'t en el lloc on seu i en el color de la família.',par:'Confon els grups d\'instruments de l\'orquestra'}});
function laminaOrquestra(){endSession();let mode='labels',hi=null;
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-musica)">Làmina · Música</div><h2>L'orquestra simfònica</h2><p class="muted">Toca cada grup del plànol per saber qui hi seu.</p></div><button class="ghost" onclick="subject('musica')">← Tornar</button></div>
 <div class="lam"><div class="card lam-fig"><div class="tabs" style="margin:0 0 12px"><button id="lm1" class="on">Amb noms</button><button id="lm2">Sense noms (posa't a prova)</button></div><div id="lsvg"></div></div>
 <div><div class="card" id="linfo"></div>
 <div class="card"><h3>Les quatre famílies</h3><p style="margin:0">${Object.entries(ORQ_FAM).filter(([k])=>k!=='dir').map(([k,F])=>`<span style="display:inline-block;width:12px;height:12px;background:${F.col};margin-right:6px"></span><b>${F.nom[0].toUpperCase()+F.nom.slice(1)}</b>`).join('<br>')}</p>
 <p style="margin-bottom:0">La família de <b>corda</b> és la que té més músics, per això ocupa tota la part de davant.</p></div>
 <div class="row"><button id="la">Aprendre el tema</button><button class="sec" id="lp">Practicar amb la làmina</button></div></div></div>`);
 const info=()=>{const ids=Object.keys(ORQ);$('#linfo').innerHTML=hi?`<div class="eyebrow" style="color:var(--s-musica)">Grup ${ORQ[hi].n} de ${ids.length} · ${ORQ_FAM[ORQ[hi].fam].nom}</div><h3 style="margin:4px 0 8px">${mode==='labels'?ORQ[hi].nom:'Qui seu aquí?'}</h3><p style="margin:0">${mode==='labels'?ORQ[hi].f:'Mode prova: digues el nom en veu alta i després canvia a «Amb noms» per comprovar-ho.'}</p>`
  :`<h3 style="margin-top:0">Qui seu a l'orquestra?</h3><ol class="steps" style="margin:0">${ids.map(id=>`<li><a href="#" data-go="${id}">${ORQ[id].nom}</a></li>`).join('')}</ol>`;
  $('#linfo').querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();hi=a.dataset.go;draw()})};
 const draw=()=>{$('#lsvg').innerHTML=orqSVG({mode,hi});$('#lsvg').querySelectorAll('[data-part]').forEach(g=>g.onclick=()=>{hi=g.dataset.part;draw()});info()};
 $('#lm1').onclick=()=>{mode='labels';$('#lm1').className='on';$('#lm2').className='';draw()};
 $('#lm2').onclick=()=>{mode='numbers';$('#lm2').className='on';$('#lm1').className='';draw()};
 $('#la').onclick=()=>start('professor',['mu_orquestra'],15);$('#lp').onclick=()=>start('exercicis',['mu_orquestra'],15);draw()}
// Es registra a la pàgina de Música
(LAMINES.musica=LAMINES.musica||[]).push({obre:'laminaOrquestra()',nom:'L\'orquestra simfònica',desc:'Qui seu on i a quina família pertany',ic:'music'});
