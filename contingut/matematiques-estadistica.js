/* Aprenem - MATEMÀTIQUES 6è: estadística (mitjana, moda, mediana, rang, gràfics) i probabilitat
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. Fonts: vegeu contingut/matematiques.js. */
(()=>{
const {num,dc,fInt,fDec,val,eq,near,svg,tx,ln,C}=MT;
const PL='Probabilitat (fracció, ex. 1/4)';

Object.assign(ERR,{
 mt_mitjana_divideix:{kid:'Has sumat totes les dades, molt bé! Però per a la mitjana encara has de dividir entre el nombre de dades.',par:'Oblida dividir en calcular la mitjana'},
 mt_moda_vegades:{kid:'Aquestes són les vegades que es repeteix. La moda és el <b>valor</b> que es repeteix més.',par:'Confon la moda amb la seva freqüència'},
 mt_mediana_ordre:{kid:'Per trobar la mediana, primer has d\'ordenar les dades de més petita a més gran!',par:'Calcula la mediana sense ordenar les dades'},
 mt_rang:{kid:'El rang és la diferència entre la dada més gran i la més petita: resta-les.',par:'Confon el rang amb el valor màxim'},
 mt_grafic_operacio:{kid:'Llegeix bé la pregunta: «quants més» vol dir restar, no sumar.',par:'Tria malament l\'operació en llegir un gràfic'},
 mt_prob_contraris:{kid:'Al denominador hi van <b>tots</b> els casos possibles, no només els que no són favorables.',par:'Divideix casos favorables entre desfavorables'},
 mt_prob_no:{kid:'Compte amb el «no»! Et demanen la probabilitat que NO passi: compta els altres casos.',par:'No calcula bé la probabilitat de l\'esdeveniment contrari'},
 mt_combina_suma:{kid:'Cada samarreta es pot combinar amb cada pantaló: no se sumen, es multipliquen.',par:'Suma en lloc de multiplicar en problemes de combinacions'},
 mt_daus_suma:{kid:'No totes les sumes són igual de probables! Fes una taula amb les 36 combinacions de dos daus.',par:'Pensa que totes les sumes de dos daus són igual de probables'}
});

function barChart(cats,vals,step,unit){const W=340,H=230,x0=44,y0=190,top=20,mx=Math.max(...vals),ymax=Math.ceil(mx/step)*step+step,sy=(y0-top)/ymax,bw=(W-x0-10)/cats.length;
 let g='';for(let v=0;v<=ymax;v+=step){const y=y0-v*sy;g+=ln(x0,y,W-8,y,{c:C.gl,w:1})+tx(x0-8,y,v,{fs:12,fw:600,c:'#4A5468',a:'end'})}
 cats.forEach((c,i)=>{const h=vals[i]*sy,x=x0+i*bw+bw*.18;g+=`<rect x="${x.toFixed(1)}" y="${(y0-h).toFixed(1)}" width="${(bw*.64).toFixed(1)}" height="${h.toFixed(1)}" fill="${i%2?C.o:C.b}"/>`+tx(x0+i*bw+bw/2,y0+16,c,{fs:12,fw:700})});
 g+=ln(x0,top-6,x0,y0,{w:2})+ln(x0,y0,W-8,y0,{w:2})+tx(x0-36,10,unit,{fs:11,fw:600,c:'#4A5468',a:'start'});return svg(W,H,g,340)}
function balls(r,b,g){const cs=[...Array(r).fill(C.r),...Array(b).fill(C.b),...Array(g).fill(C.gr)],n=cs.length,per=Math.min(10,n),rows=Math.ceil(n/per);
 return svg(340,rows*32+20,MT.shuf(cs).map((c,i)=>`<circle cx="${(170-(per-1)*15+(i%per)*30).toFixed(1)}" cy="${26+Math.floor(i/per)*32}" r="12" fill="${c}" stroke="#fff" stroke-width="2"/>`).join(''),320)}

Object.assign(SK,{
mt_estadistica:{mat:'mates',nom:'Mitjana, moda, mediana i rang',ab:'Et',curs:[6],
 teoria:['Per resumir un conjunt de dades fem servir aquests paràmetres:',
  '<b>Mitjana:</b> sumam totes les dades i dividim entre el nombre de dades. Notes 6, 8, 7 → (6 + 8 + 7) : 3 = <b>7</b>.',
  '<b>Moda:</b> la dada que es repeteix més vegades. A 3, 5, 5, 8, 5, 2 la moda és <b>5</b>.',
  '<b>Mediana:</b> ordenam les dades de més petita a més gran i agafam la del <b>mig</b>. A 2, 3, <b>5</b>, 8, 9 la mediana és 5. Si el nombre de dades és parell, és la mitjana de les dues del mig.',
  '<b>Rang:</b> la diferència entre la dada més gran i la més petita. A 2, 3, 5, 8, 9 → 9 − 2 = <b>7</b>.'],
 gen(lv){const n=lv===0?5:lv===1?pick([5,7]):pick([5,6,7,8]),CT=[[`Les notes d'en Pau en ${n} exàmens han estat`,3,10],[`Els punts que ha fet una jugadora de bàsquet en ${n} partits`,4,30],[`La temperatura màxima (°C) de ${n} dies d'abril`,12,28],[`Els gols que ha marcat un equip en ${n} partits`,0,6]];
  const[ct,lo,hi]=pick(CT),q=pick(lv===0?['mitjana','moda','rang']:['mitjana','moda','mediana','rang']),mk=()=>Array.from({length:n},()=>rnd(lo,hi));let d;
  const cnt=a=>{const m={};a.forEach(v=>m[v]=(m[v]||0)+1);return m},uniqMode=a=>{const m=cnt(a),mx=Math.max(...Object.values(m));return mx>=2&&Object.values(m).filter(c=>c===mx).length===1};
  if(q==='mitjana')do{d=mk()}while(d.reduce((a,b)=>a+b,0)%n);else if(q==='moda')do{d=mk()}while(!uniqMode(d));else if(q==='mediana')do{d=mk()}while(n%2===0&&lv<2);else do{d=mk()}while(Math.max(...d)===Math.min(...d));
  const S=d.reduce((a,b)=>a+b,0),so=[...d].sort((a,b)=>a-b),mx=so[n-1],mn=so[0],list=d.join(', '),m=cnt(d);
  const text=`${ct}:<br><b>${list}</b><br>Calcula la <b>${q}</b>.`;
  if(q==='mitjana')return{text,fields:[fInt('Mitjana',S/n)],
   hints:['Suma totes les dades.',`Divideix la suma entre el nombre de dades (${n}).`],
   steps:[`Suma: ${d.join(' + ')} = ${S}.`,`Hi ha ${n} dades: ${S} : ${n} = ${S/n}.`,`La mitjana és <b>${S/n}</b>.`],
   err:x=>val(x[0])===S&&S!==S/n?'mt_mitjana_divideix':null};
  if(q==='moda'){const mo=+Object.keys(m).find(k=>m[k]===Math.max(...Object.values(m))),f=m[mo];
   return{text,fields:[fInt('Moda',mo)],
    hints:['Compta quantes vegades surt cada dada.','La moda és la dada que surt més vegades.'],
    steps:[`Comptam: ${Object.keys(m).sort((a,b)=>a-b).map(k=>`${k} → ${m[k]} ${m[k]===1?'vegada':'vegades'}`).join(', ')}.`,`El ${mo} és el que surt més (${f} vegades).`,`La moda és <b>${mo}</b>.`],
    err:x=>f!==mo&&val(x[0])===f?'mt_moda_vegades':null}}
  if(q==='mediana'){const md=n%2?so[(n-1)/2]:(so[n/2-1]+so[n/2])/2,um=n%2?d[(n-1)/2]:(d[n/2-1]+d[n/2])/2;
   return{text,fields:[fDec('Mediana',md)],
    hints:['Primer ordena les dades de més petita a més gran.',n%2?'Agafa la dada que queda just al mig.':'Hi ha un nombre parell de dades: fes la mitjana de les dues del mig.'],
    steps:[`Ordenam: ${so.join(', ')}.`,n%2?`La dada del mig (la ${(n+1)/2}a) és ${md}.`:`Les dues del mig són ${so[n/2-1]} i ${so[n/2]}: (${so[n/2-1]} + ${so[n/2]}) : 2 = ${dc(md)}.`,`La mediana és <b>${dc(md)}</b>.`],
    err:x=>!eq(um,md)&&near(val(x[0]),um)?'mt_mediana_ordre':null}}
  return{text,fields:[fInt('Rang',mx-mn)],
   hints:['Busca la dada més gran i la més petita.','Resta-les.'],
   steps:[`Dada més gran: ${mx}. Dada més petita: ${mn}.`,`${mx} − ${mn} = ${mx-mn}.`,`El rang és <b>${mx-mn}</b>.`],
   err:x=>mx!==mx-mn&&val(x[0])===mx?'mt_rang':null}}},
mt_grafics:{mat:'mates',nom:'Llegir gràfics de barres',ab:'Gr',curs:[6],
 teoria:['Un <b>gràfic de barres</b> mostra dades amb barres: com més alta és la barra, més gran és el valor.',
  'Per llegir-lo: mira el <b>títol</b>, què hi ha a cada eix i de quant en quant va l\'escala de l\'eix vertical.',
  'Després pots comparar (quants més?), sumar (quants en total?) o calcular la mitjana de les dades.'],
 gen(lv){const GR=[['Fruita preferida dels alumnes de 6è',['Poma','Plàtan','Maduixa','Taronja','Meló'],'alumnes'],['Llibres llegits a la biblioteca',['Gen','Feb','Març','Abr','Maig'],'llibres'],
   ['Esport preferit',['Futbol','Bàsquet','Natació','Handbol','Tennis'],'alumnes'],['Animals de companyia de la classe',['Gats','Cans','Peixos','Ocells','Conills'],'animals']];
  const[ti,cs,u]=pick(GR),k=lv===0?4:5,st=lv===0?1:lv===1?2:5,cats=cs.slice(0,k);let vals;do{vals=cats.map(()=>st*rnd(1,lv===0?8:9))}while(new Set(vals).size<k-1);
  const q=lv===0?pick([0,1,2]):pick([1,2,3]),fig=barChart(cats,vals,st,u);let i,j;do{i=rnd(0,k-1);j=rnd(0,k-1)}while(i===j||vals[i]===vals[j]);if(vals[i]<vals[j])[i,j]=[j,i];
  const S=vals.reduce((a,b)=>a+b,0);
  if(q===0)return{text:`<b>${ti}</b>. Quants ${u} hi ha a la barra «${cats[i]}»?`,fig,fields:[fInt(u[0].toUpperCase()+u.slice(1),vals[i])],
   hints:['Mira fins on arriba la barra.','Segueix la línia horitzontal fins a l\'eix de l\'esquerra.'],
   steps:[`La barra «${cats[i]}» arriba fins a la línia del ${vals[i]}.`,`Hi ha <b>${vals[i]} ${u}</b>.`]};
  if(q===1)return{text:`<b>${ti}</b>. Quants ${u} més té «${cats[i]}» que «${cats[j]}»?`,fig,fields:[fInt('Diferència',vals[i]-vals[j])],
   hints:['Llegeix el valor de les dues barres.','«Quants més» vol dir restar el gran menys el petit.'],
   steps:[`«${cats[i]}»: ${vals[i]}. «${cats[j]}»: ${vals[j]}.`,`${vals[i]} − ${vals[j]} = ${vals[i]-vals[j]}.`,`En té <b>${vals[i]-vals[j]}</b> més.`],
   err:x=>val(x[0])===vals[i]+vals[j]?'mt_grafic_operacio':null};
  if(q===2||S%k)return{text:`<b>${ti}</b>. Quants ${u} hi ha en total?`,fig,fields:[fInt('Total',S)],
   hints:['Llegeix el valor de totes les barres.','Suma\'ls tots.'],
   steps:[`Valors: ${vals.join(', ')}.`,`${vals.join(' + ')} = ${S}.`,`En total, <b>${S} ${u}</b>.`]};
  return{text:`<b>${ti}</b>. Quina és la <b>mitjana</b> de ${u} per barra?`,fig,fields:[fInt('Mitjana',S/k)],
   hints:['Llegeix tots els valors i suma\'ls.',`Divideix la suma entre el nombre de barres (${k}).`],
   steps:[`Suma: ${vals.join(' + ')} = ${S}.`,`${S} : ${k} = ${S/k}.`,`La mitjana és <b>${S/k}</b>.`],
   err:x=>val(x[0])===S?'mt_mitjana_divideix':null}}},
mt_probabilitat:{mat:'mates',nom:'Probabilitat i combinacions',ab:'Pb',curs:[6],
 teoria:['Un experiment és <b>aleatori</b> si no podem saber el resultat abans de fer-lo (tirar un dau, treure una bola d\'una bossa).',
  'La <b>probabilitat</b> d\'un esdeveniment es calcula amb la regla de Laplace: <b>casos favorables : casos possibles</b>. Treure un 5 amb un dau: 1 cas favorable de 6 possibles → ' +F(1,6)+'.',
  'La probabilitat és sempre un nombre entre 0 (impossible) i 1 (segur).',
  '<b>Combinacions:</b> si tens 3 samarretes i 4 pantalons, pots fer 3 × 4 = <b>12</b> conjunts diferents. Es multiplica!'],
 gen(lv){const t=lv===0?pick([0,1]):lv===1?pick([0,1,2,3]):pick([1,2,3,4]);
  if(t===0||t===2){const r=rnd(1,lv?9:6),b=rnd(1,lv?9:6),g=rnd(1,lv?9:6),T=r+b+g,CL=[['vermella',r],['blava',b],['verda',g]],[nm,f]=pick(CL),not=t===2;
   const fav=not?T-f:f;
   const bl=(n,s,p)=>`<b>${n} ${n===1?s:p}</b>`;
   return{text:`En una bossa hi ha ${bl(r,'bola vermella','boles vermelles')}, ${bl(b,'blava','blaves')} i ${bl(g,'verda','verdes')}. En treus una sense mirar. Quina és la probabilitat que ${not?'<b>no</b> sigui':'sigui'} ${nm}?`,fig:balls(r,b,g),fields:[{label:PL,ans:R(fav,T)}],
    hints:['Quantes boles hi ha en total? Aquests són els casos possibles.',(not?`Quantes boles no són ${nm}es? Aquests són els casos favorables.`:`Quantes boles ${nm}es hi ha? Aquests són els casos favorables.`).replace('vermellaes','vermelles').replace('blavaes','blaves').replace('verdaes','verdes')],
    steps:[`Casos possibles: ${r} + ${b} + ${g} = ${T}.`,not?`Casos favorables (no ${nm}): ${T} − ${f} = ${fav}.`:`Casos favorables: ${f}.`,`Probabilitat: ${F(fav,T)}${R(fav,T).d!==T?` = ${MT.fr(fav,T)}`:''}.`],
    err:x=>{const y=val(x[0]);if(T-fav>0&&near(y,fav/(T-fav))&&!near(fav/(T-fav),fav/T))return'mt_prob_contraris';if(not&&2*f!==T&&near(y,f/T))return'mt_prob_no';return null}}}
  if(t===1){const k=rnd(2,5),k2=rnd(2,5),EV=[['un nombre parell',[2,4,6]],['un nombre senar',[1,3,5]],[`un nombre més gran que ${k}`,[1,2,3,4,5,6].filter(v=>v>k)],['un múltiple de 3',[3,6]],['un nombre primer',[2,3,5]],[`un nombre més petit que ${k2}`,[1,2,3,4,5,6].filter(v=>v<k2)],[`un ${k}`,[k]]];
   const[e,fv]=pick(EV),f=fv.length;
   return{text:`Tires un dau normal (de l'1 al 6). Quina és la probabilitat de treure <b>${e}</b>?`,fields:[{label:PL,ans:R(f,6)}],
    hints:['Quants resultats diferents pot donar un dau?',`Quins nombres de l'1 al 6 són ${e}?`],
    steps:['Casos possibles: 1, 2, 3, 4, 5, 6 → 6.',`Casos favorables: ${fv.join(', ')} → ${f}.`,`Probabilitat: ${F(f,6)}${R(f,6).d!==6?` = ${MT.fr(f,6)}`:''}.`],
    err:x=>6-f>0&&near(val(x[0]),f/(6-f))?'mt_prob_contraris':null}}
  if(t===3){const a=rnd(2,6),b=rnd(2,6),three=lv===2&&Math.random()<.5,c=rnd(2,4),v=three?a*b*c:a*b;
   return{text:`Tens <b>${a} samarretes</b>${three?',':' i'} <b>${b} pantalons</b>${three?` i <b>${c} parells de sabatilles</b>`:''}. Quants conjunts diferents pots fer, agafant una peça de cada?`,fields:[fInt('Conjunts',v)],
    hints:['Pensa: amb la primera samarreta, quants pantalons pots posar-te?','Cada samarreta es combina amb cada pantaló.'],
    steps:[`Cada samarreta es pot combinar amb els ${b} pantalons: ${a} × ${b} = ${a*b}.`,three?`Cada un d'aquests ${a*b} es combina amb ${c} parells de sabatilles: ${a*b} × ${c} = ${v}.`:'No cal res més.',`Pots fer <b>${v} conjunts</b>.`],
    err:x=>a+b+(three?c:0)!==v&&val(x[0])===a+b+(three?c:0)?'mt_combina_suma':null}}
  const s=rnd(3,11),w=s<=7?s-1:13-s;
  return{text:`Tires dos daus i sumes els punts. Quina és la probabilitat que la suma sigui <b>${s}</b>?`,fields:[{label:PL,ans:R(w,36)}],
   hints:['Quantes combinacions diferents hi ha amb dos daus? (6 × 6)',`Escriu les parelles que sumen ${s}: (1, ${s-1}), (2, ${s-2})...`],
   steps:['Casos possibles: 6 × 6 = 36.',`Parelles que sumen ${s}: ${Array.from({length:6},(_,i)=>i+1).filter(a=>s-a>=1&&s-a<=6).map(a=>`(${a}, ${s-a})`).join(', ')} → ${w}.`,`Probabilitat: ${F(w,36)}${R(w,36).d!==36?` = ${MT.fr(w,36)}`:''}.`],
   err:x=>near(val(x[0]),1/11)?'mt_daus_suma':null}}}
});

/* ---------- Material d'estudi: formulari i taules de mesura ---------- */
const head=(t,s)=>`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><h2>${t}</h2><p class="muted">${s}</p></div><button class="ghost" onclick="subject('mates')">← Tornar</button></div>`;
window.mtFormulari=function(){endSession();const B=C.b,c=(fig,nm,f)=>`<div class="card" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:12px"><div style="width:130px;flex:none">${fig}</div><div style="flex:1;min-width:180px"><h3 style="margin:0 0 6px">${nm}</h3><p style="margin:0;font-size:18px">${f}</p></div></div>`;
 const s=(inner,vb='0 0 130 90')=>`<svg viewBox="${vb}" style="width:100%;height:auto" aria-hidden="true">${inner}</svg>`,P=(p,f=C.bl)=>`<polygon points="${p}" fill="${f}" stroke="${B}" stroke-width="3"/>`,dsh=(a,b,c2,d)=>`<line x1="${a}" y1="${b}" x2="${c2}" y2="${d}" stroke="${C.o}" stroke-width="2" stroke-dasharray="5 4"/>`;
 app(head('Formulari de geometria','Perímetres, àrees i volums')+
  c(s(P('35,10 95,10 95,70 35,70')),'Quadrat','P = 4 × c<br>A = c × c')+
  c(s(P('10,15 120,15 120,75 10,75')),'Rectangle','P = 2 × (b + h)<br>A = b × h')+
  c(s(P('35,15 120,15 95,75 10,75')+dsh(35,15,35,75)),'Romboide','A = b × h')+
  c(s(P('10,78 120,78 45,10')+dsh(45,10,45,78)),'Triangle','A = b × h : 2')+
  c(s(P('65,5 120,45 65,85 10,45')+dsh(10,45,120,45)+dsh(65,5,65,85)),'Rombe','A = D × d : 2')+
  c(s(P('10,78 120,78 90,15 40,15')+dsh(40,15,40,78)),'Trapezi','A = (B + b) × h : 2')+
  c(s(P(MT.regPts(6,65,45,40).map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' '))+dsh(65,45,65,79.6)),'Polígon regular','P = n × c<br>A = P × a : 2 (a = apotema)')+
  c(s(`<circle cx="65" cy="45" r="38" fill="${C.bl}" stroke="${B}" stroke-width="3"/><line x1="65" y1="45" x2="103" y2="45" stroke="${C.o}" stroke-width="2.5"/>`),'Circumferència i cercle','d = 2 × r · π ≈ 3,14<br>L = 2 × π × r<br>A = π × r × r')+
  c(s(P('15,30 85,30 85,85 15,85')+P('15,30 40,10 110,10 85,30','#EEF3FF')+P('85,30 110,10 110,65 85,85','#D3E0FF')),'Ortoedre i cub','V = llarg × ample × alt<br>Cub: V = a × a × a')+
  c(s(`<text x="65" y="52" text-anchor="middle" font-size="22" font-weight="800" fill="${B}">C+V=A+2</text>`),'Fórmula d\'Euler','Cares + vèrtexs = arestes + 2')+
  c(s(`<text x="65" y="40" text-anchor="middle" font-size="20" font-weight="800" fill="${B}">180°</text><text x="65" y="70" text-anchor="middle" font-size="20" font-weight="800" fill="${C.o}">360°</text>`),'Angles','Triangle: 180° · Quadrilàter: 360°<br>Polígon de n costats: (n − 2) × 180°'))};
window.mtMesures=function(){endSession();const tb=(cap,f,u)=>`<div class="card"><h3 style="margin-top:0">${cap}</h3><div class="tablewrap"><table class="mini"><tr>${u.map(x=>`<th>${x}</th>`).join('')}</tr></table></div><p class="muted" style="margin:8px 0 0">Cada unitat és <b>${f}</b> vegades més gran que la de la dreta.</p></div>`;
 app(head('Taules de mesura','Per passar d\'una unitat a una altra')+
  tb('Longitud','10',['km','hm','dam','m','dm','cm','mm'])+tb('Massa','10',['kg','hg','dag','g','dg','cg','mg'])+tb('Capacitat','10',['kl','hl','dal','l','dl','cl','ml'])+
  tb('Superfície','100',['km²','hm²','dam²','m²','dm²','cm²','mm²'])+
  `<div class="card"><h3 style="margin-top:0">Unitats agràries</h3><p style="margin:0">1 ha (hectàrea) = 1 hm² = 10.000 m² · 1 a (àrea) = 1 dam² = 100 m² · 1 ca (centiàrea) = 1 m²</p></div>`+
  tb('Volum','1.000',['m³','dm³','cm³','mm³'])+
  `<div class="card"><h3 style="margin-top:0">Volum i capacitat</h3><p style="margin:0">1 m³ = 1.000 l · <b>1 dm³ = 1 l</b> · 1 cm³ = 1 ml</p></div>`+
  `<div class="card"><h3 style="margin-top:0">Temps i angles</h3><p style="margin:0">1 dia = 24 h · 1 h = 60 min · 1 min = 60 s · 1 h = 3.600 s<br>1° = 60' (minuts) · 1' = 60'' (segons)</p></div>`)};
MATERIAL.mates=[{obre:'mtFormulari()',nom:'Formulari de geometria',desc:'Perímetres, àrees, volums i angles, amb dibuixos',ic:'book'},
 {obre:'mtMesures()',nom:'Taules de mesura',desc:'Longitud, massa, capacitat, superfície, volum i temps',ic:'list'}];
})();
