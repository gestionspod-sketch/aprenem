/* Aprenem - MATEMÀTIQUES 6è: sabers bàsics del currículum estatal que no surten al llibre de referència
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. Fonts: vegeu contingut/matematiques.js.
   Contrast amb el Reial decret 157/2022, d'1 de març (BOE núm. 52, de 2 de març de 2022), annex II, Matemàtiques,
   sabers bàsics del 3r cicle:
   - A.2 Quantitat: relació entre fraccions, decimals i percentatges ............ mt_fdp
   - A.6 Educació financera: preu unitari, millor compra, pressupost, interès .... mt_finances
   - C. Sentit espacial: moviments al pla (translacions, simetries, girs) ......... mt_moviments
   - D. Sentit algebraic: patrons i regularitats; igualtats i nombre desconegut .. mt_patrons, mt_equacions
   - E. Sentit estocàstic: gràfics de sectors i de línies ......................... mt_grafics_sl
   Els exercicis són originals i es generen per codi amb la solució calculada. */
(()=>{
const {num,dc,eur,fInt,fDec,fTxt,val,eq,near,fr,svg,tx,ln,pts,C,taula,regPts}=MT;
const cx=v=>v<0?'−'+(-v):String(v);

Object.assign(ERR,{
 mt_percent_decimal:{kid:'Això és el nombre decimal. El percentatge és el decimal multiplicat per 100 (0,25 → 25 %).',par:'Confon el nombre decimal amb el percentatge'},
 mt_percent_frac:{kid:'Un percentatge és una fracció amb denominador 100: 35 % = 35/100. Després la pots simplificar.',par:'No relaciona el percentatge amb la fracció de denominador 100'},
 mt_interes_anys:{kid:'Això és l\'interès d\'un any. Et demanen l\'interès de tots els anys: multiplica pel nombre d\'anys.',par:'Calcula l\'interès d\'un sol any'},
 mt_preu_unitari:{kid:'Per saber el preu d\'una unitat, divideix el preu del paquet entre el nombre d\'unitats.',par:'No calcula bé el preu unitari'},
 mt_eq_inversa:{kid:'Per trobar el nombre amagat has de fer l\'operació contrària: la suma es desfà restant, i la multiplicació, dividint.',par:'No fa servir l\'operació inversa per trobar el nombre desconegut'},
 mt_patro_proporcional:{kid:'Compte! Les figures no creixen multiplicant: mira quant augmenta d\'una figura a la següent i quantes peces té la primera.',par:'Pensa que un patró lineal és proporcional (multiplica sense tenir en compte el primer terme)'},
 mt_sim_eix:{kid:'Mira bé on és l\'eix de simetria (la línia vermella). El punt simètric és a la mateixa distància de l\'eix, però a l\'altra banda.',par:'No té en compte la posició de l\'eix de simetria'},
 mt_sector_graus:{kid:'Això és el percentatge. Un cercle sencer fa 360°: el sector és aquest percentatge de 360°.',par:'Confon el percentatge amb els graus del sector'}
});

/* ---------- dibuixos ---------- */
function grid(mn,mx,figs,axes=[]){const W=300,pad=22,s=(W-2*pad)/(mx-mn),X=x=>pad+(x-mn)*s,Y=y=>W-pad-(y-mn)*s;let g='';
 for(let k=mn;k<=mx;k++)g+=ln(X(k),Y(mn),X(k),Y(mx),{c:C.gl,w:1})+ln(X(mn),Y(k),X(mx),Y(k),{c:C.gl,w:1});
 g+=ln(X(mn),Y(0),X(mx),Y(0),{w:2})+ln(X(0),Y(mn),X(0),Y(mx),{w:2});
 for(let k=mn;k<=mx;k++)if(k)g+=tx(X(k),Y(0)+11,cx(k),{fs:10,fw:600,c:'#4A5468'})+tx(X(0)-9,Y(k),cx(k),{fs:10,fw:600,c:'#4A5468',a:'end'});
 axes.forEach(a=>{g+=a.v!=null?ln(X(a.v),Y(mn),X(a.v),Y(mx),{c:C.r,w:2.5,dash:1}):ln(X(mn),Y(a.h),X(mx),Y(a.h),{c:C.r,w:2.5,dash:1})});
 figs.forEach(f=>{const P=f.p.map(([x,y])=>[X(x),Y(y)]);g+=P.length>1?`<polygon points="${pts(P)}" fill="${f.fill||C.bl}" fill-opacity=".75" stroke="${f.c||C.b}" stroke-width="2.5"/>`:'';
  (f.l||[]).forEach((l,i)=>{if(l)g+=`<circle cx="${P[i][0].toFixed(1)}" cy="${P[i][1].toFixed(1)}" r="4.5" fill="${f.c||C.b}"/>`+tx(P[i][0]+10,P[i][1]-10,l,{fs:14,c:f.c||C.b})})});
 return svg(W,W,g,300)}
function pie(items){const R0=90,c0=110;let a=-Math.PI/2,g='';const col=[C.b,C.o,C.gr,C.r,'#8B5CF6'];
 items.forEach((it,i)=>{const da=it.p/100*2*Math.PI,a2=a+da,x1=c0+R0*Math.cos(a),y1=c0+R0*Math.sin(a),x2=c0+R0*Math.cos(a2),y2=c0+R0*Math.sin(a2),m=(a+a2)/2;
  g+=`<path d="M${c0} ${c0} L${x1.toFixed(1)} ${y1.toFixed(1)} A${R0} ${R0} 0 ${da>Math.PI?1:0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}Z" fill="${col[i%5]}" stroke="#fff" stroke-width="2"/>`;
  if(it.p>=8)g+=tx(c0+R0*.62*Math.cos(m),c0+R0*.62*Math.sin(m),it.show||`${it.p} %`,{fs:13,c:'#fff'});a=a2});
 const leg=items.map((it,i)=>`<rect x="232" y="${30+i*26}" width="14" height="14" fill="${col[i%5]}"/>`+tx(252,37+i*26,it.n,{fs:13,fw:600,a:'start'})).join('');
 return svg(340,220,g+leg,340)}
function lineChart(cats,vals,unit){const W=340,H=220,x0=40,y0=180,top=18,mn=Math.min(0,...vals),mxv=Math.max(...vals),step=mxv-mn>20?5:2,lo=Math.floor(mn/step)*step,hi=Math.ceil(mxv/step)*step+step,sy=(y0-top)/(hi-lo),bw=(W-x0-14)/(cats.length-1);
 let g='';for(let v=lo;v<=hi;v+=step){const y=y0-(v-lo)*sy;g+=ln(x0,y,W-8,y,{c:C.gl,w:1})+tx(x0-6,y,cx(v),{fs:11,fw:600,c:'#4A5468',a:'end'})}
 const P=vals.map((v,i)=>[x0+i*bw,y0-(v-lo)*sy]);g+=`<polyline points="${pts(P)}" fill="none" stroke="${C.b}" stroke-width="3"/>`+P.map(([x,y])=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="${C.o}"/>`).join('');
 g+=cats.map((c,i)=>tx(x0+i*bw,y0+16,c,{fs:11,fw:700})).join('')+ln(x0,top-6,x0,y0,{w:2})+tx(x0-30,8,unit,{fs:11,fw:600,c:'#4A5468',a:'start'});
 return svg(W,H+4,g,340)}
function balanca(k,b,c){const box=(x,y)=>`<rect x="${x}" y="${y}" width="22" height="22" fill="${C.o}" stroke="#B26B00" stroke-width="1.5"/>`+tx(x+11,y+11,'?',{fs:12,c:'#fff'});
 const pes=(x,y,t)=>`<path d="M${x} ${y+26} h34 l-5 -24 h-24Z" fill="#4A5468"/>`+tx(x+17,y+15,t,{fs:11,c:'#fff'});
 let g=ln(170,40,170,170,{w:4})+`<path d="M140 175 h60 l-10 -10 h-40Z" fill="#4A5468"/>`+ln(40,40,300,40,{w:4})+ln(60,40,60,90,{w:1.5,c:C.g})+ln(280,40,280,90,{w:1.5,c:C.g})+ln(110,40,110,90,{w:1.5,c:C.g})+ln(230,40,230,90,{w:1.5,c:C.g});
 g+=`<rect x="35" y="90" width="110" height="6" fill="#4A5468"/><rect x="195" y="90" width="110" height="6" fill="#4A5468"/>`;
 let x=40,y=66;for(let i=0;i<k;i++){g+=box(x,y);x+=24;if(x>120){x=40;y-=24}}if(b)g+=pes(x+2,y-2,b+' kg');
 g+=pes(232,62,c+' kg');return svg(340,185,g,300)}
function fitxes(cnts){let g='',x=8;cnts.forEach((n,i)=>{const cols=Math.min(n,6),rows=Math.ceil(n/6),cw=Math.max(cols*13,64),x0=x+(cw-cols*13)/2;
 for(let k=0;k<n;k++)g+=`<rect x="${x0+(k%6)*13}" y="${100-rows*13+Math.floor(k/6)*13}" width="12" height="12" fill="${C.b}" stroke="#fff"/>`;
 g+=tx(x+cw/2,120,`Figura ${i+1}`,{fs:12});x+=cw+20});return svg(Math.max(x,200),130,g,340)}

const SHAPES=[['quadrat',4,()=>regPts(4,0,0,1)],['rectangle',2,()=>[[-1.4,-.8],[1.4,-.8],[1.4,.8],[-1.4,.8]]],['triangle equilàter',3,()=>regPts(3,0,.15,1.1)],
 ['triangle isòsceles',1,()=>[[-.8,.8],[.8,.8],[0,-1.1]]],['triangle escalè',0,()=>[[-1.2,.8],[1.1,.8],[-.3,-.9]]],['rombe',2,()=>[[0,-1.1],[.75,0],[0,1.1],[-.75,0]]],
 ['pentàgon regular',5,()=>regPts(5,0,.05,1)],['hexàgon regular',6,()=>regPts(6,0,0,1)],['octàgon regular',8,()=>regPts(8,0,0,1)],
 ['trapezi isòsceles',1,()=>[[-1.3,.75],[1.3,.75],[.7,-.75],[-.7,-.75]]],['romboide',0,()=>[[-1.3,.7],[.6,.7],[1.3,-.7],[-.6,-.7]]]];
const shapeFig=p=>svg(200,150,`<polygon points="${pts(p.map(([x,y])=>[100+x*55,75+y*55]))}" fill="${C.bl}" stroke="${C.b}" stroke-width="3"/>`,200);

Object.assign(SK,{
/* ---------- Fraccions, decimals i percentatges ---------- */
mt_fdp:{mat:'mates',nom:'Fraccions, decimals i percentatges',ab:'F%',curs:[6],
 teoria:['Una mateixa quantitat es pot escriure de tres maneres: com a <b>fracció</b>, com a <b>nombre decimal</b> i com a <b>percentatge</b>.',
  `${F(1,4)} = 1 : 4 = <b>0,25</b> = <b>25 %</b>. ${F(1,2)} = 0,5 = 50 %. ${F(3,4)} = 0,75 = 75 %.`,
  '<b>Fracció → decimal:</b> dividim el numerador entre el denominador. <b>Decimal → percentatge:</b> multiplicam per 100 (0,35 → 35 %).',
  `<b>Percentatge → fracció:</b> el posam sobre 100 i simplificam: 40 % = ${F(40,100)} = ${F(2,5)}.`],
 fig:()=>taula(['Fracció','Decimal','Percentatge'],[[F(1,2),'0,5','50 %'],[F(1,4),'0,25','25 %'],[F(3,4),'0,75','75 %'],[F(1,5),'0,2','20 %'],[F(1,10),'0,1','10 %']]),
 gen(lv){const t=lv===0?0:lv===1?pick([0,1,2]):pick([1,2,2]),D=lv===0?[2,4,5,10]:[2,4,5,10,20,25,50];let d,n;do{d=pick(D);n=rnd(1,lv===2?d+Math.floor(d/2):d-1)}while(gcd(n,d)!==1&&d!==2||n%d===0);
  const s=R(n,d),p=s.n*100/s.d,dv=s.n/s.d,PL='Percentatge (només el nombre)';
  if(t===0)return{text:`Escriu la fracció ${F(s.n,s.d)} com a <b>nombre decimal</b> i com a <b>percentatge</b>.`,fields:[fDec('Decimal',dv),fDec(PL,p)],
   hints:['Una fracció és una divisió: numerador entre denominador.',`Busca una fracció equivalent amb denominador 100: ${F(s.n,s.d)} = ${F('?',100)}.`],
   steps:[`${s.n} : ${s.d} = ${dc(dv)}.`,`${F(s.n,s.d)} = ${F(p,100)}, és a dir, ${dc(p)} de cada 100.`,`Decimal <b>${dc(dv)}</b> · percentatge <b>${dc(p)} %</b>.`],
   err:x=>near(val(x[1]),dv)&&!near(dv,p)?'mt_percent_decimal':null};
  if(t===1)return{text:`Escriu <b>${dc(p)} %</b> com a <b>fracció irreductible</b> i com a <b>nombre decimal</b>.`,fields:[{label:'Fracció (ex. 2/5)',ans:s},fDec('Decimal',dv)],
   hints:['Percentatge vol dir «de cada 100». Posa el nombre sobre 100.',`${dc(p)} % = ${F(dc(p),100)}. Ara simplifica-la i fes la divisió.`],
   steps:[`${dc(p)} % = ${F(dc(p),100)}.`,`Simplificam: ${F(s.n,s.d)}.`,`Decimal: ${s.n} : ${s.d} = <b>${dc(dv)}</b>.`],
   err:x=>near(val(x[1]),p)&&!near(dv,p)?'mt_percent_decimal':(near(val(x[0]),p)&&!near(p,dv)?'mt_percent_frac':null)};
  return{text:`Escriu el nombre <b>${dc(dv)}</b> com a <b>percentatge</b> i com a <b>fracció irreductible</b>.`,fields:[fDec(PL,p),{label:'Fracció (ex. 3/4)',ans:s}],
   hints:['Per passar un decimal a percentatge, multiplica per 100.','Per passar-lo a fracció, posa\'l sobre 10, 100 o 1.000 i simplifica.'],
   steps:[`${dc(dv)} × 100 = ${dc(p)} %.`,`${dc(dv)} = ${F(Math.round(dv*1000),1000)}, que simplificada és ${F(s.n,s.d)}.`,`Percentatge <b>${dc(p)} %</b> · fracció <b>${F(s.n,s.d)}</b>.`],
   err:x=>near(val(x[0]),dv)&&!near(dv,p)?'mt_percent_decimal':null}}},

/* ---------- Educació financera ---------- */
mt_finances:{mat:'mates',nom:'Educació financera: preus, pressupost i estalvi',ab:'€',curs:[6],
 teoria:['El <b>preu unitari</b> és el que costa una unitat (un iogurt, un quilo, un litre...). Es calcula <b>dividint</b> el preu entre la quantitat. Ens serveix per saber quina és la <b>millor compra</b>.',
  'Un <b>pressupost</b> és un pla dels diners que tenim (ingressos) i del que gastarem (despeses). Si els ingressos són més que les despeses, hi ha <b>estalvi</b>.',
  'Quan guardam diners al banc, ens poden pagar un <b>interès</b>: un percentatge dels diners cada any. 300 € al 2 % durant 3 anys → 2 % de 300 = 6 € cada any → 6 × 3 = <b>18 €</b>.',
  'Abans de comprar, pensa: ho necessit? És la millor relació qualitat-preu?'],
 gen(lv){const t=lv===0?pick([0,0,2]):lv===1?pick([0,1,2]):pick([1,2,3]);
  if(t===0){const it=pick([['un paquet de','iogurts','cada iogurt'],['una capsa de','retoladors','cada retolador'],['una bossa de','taronges','cada taronja'],['un pack de','botelles d\'aigua','cada botella']]),n=pick([3,4,5,6,8,10,12]),u=rnd(lv?13:5,lv?199:60)*(lv?1:5),P=n*u;
   return{text:`${it[0][0].toUpperCase()+it[0].slice(1)} ${n} ${it[1]} costa <b>${eur(P/100)}</b>. Quant costa ${it[2]}?`,fields:[fDec('Preu (€)',u/100)],
    hints:['Has de repartir el preu entre totes les unitats.',`Divideix ${eur(P/100)} entre ${n}.`],
    steps:[`Preu unitari = preu : unitats.`,`${dc(P/100)} : ${n} = ${dc(u/100)}.`,`${it[2][0].toUpperCase()+it[2].slice(1)} costa <b>${eur(u/100)}</b>.`],
    err:x=>near(val(x[0]),P*n/100)?'mt_preu_unitari':null}}
  if(t===1){const it=pick([['quilos d\'arròs','kg'],['litres de llet','l'],['rotlles de paper','rotlles']]);let n1,n2,u1,u2;
   do{n1=pick([2,3,4,5]);n2=pick([2,3,4,6,8,10]);u1=rnd(40,250);u2=u1+pick([-1,1])*rnd(3,30)}while(n1===n2||u2<20);
   const A=n1*u1,B=n2*u2,best=u1<u2?'A':'B',N=lcm(n1,n2),est=Math.abs(u1-u2)*N;
   return{text:`Al supermercat hi ha dues ofertes de ${it[0]}:<br><b>A:</b> ${n1} ${it[1]} per ${eur(A/100)} &nbsp; · &nbsp; <b>B:</b> ${n2} ${it[1]} per ${eur(B/100)}.<br>Calcula el preu d'1 ${it[1]==='rotlles'?'rotlle':it[1]} a cada oferta i quant estalvies si en compres <b>${N}</b> amb l'oferta més barata.`,
    fields:[fDec('Preu unitari A (€)',u1/100),fDec('Preu unitari B (€)',u2/100),fDec(`Estalvi en ${N} (€)`,est/100)],
    hints:['Divideix el preu de cada oferta entre la quantitat que porta.',`La diferència de preu per unitat, multiplicada per ${N}, és el que estalvies.`],
    steps:[`A: ${dc(A/100)} : ${n1} = ${dc(u1/100)} €. B: ${dc(B/100)} : ${n2} = ${dc(u2/100)} €.`,`La més barata és la <b>${best}</b>. Diferència: ${dc(Math.abs(u1-u2)/100)} € per unitat.`,`En ${N}: ${dc(Math.abs(u1-u2)/100)} × ${N} = <b>${eur(est/100)}</b>.`],
    err:x=>(n1>1&&near(val(x[0]),A*n1/100))||(n2>1&&near(val(x[1]),B*n2/100))?'mt_preu_unitari':null}}
  if(t===2){const al=rnd(18,26),bus=rnd(12,30)*10,ent=pick([3,4,5,6,7,8]),din=pick([2,3,4]),gast=bus+al*(ent+din),tot=Math.ceil((gast+rnd(10,90))/50)*50;
   return{text:`Una classe de <b>${al} alumnes</b> té <b>${num(tot)} €</b> per a una excursió. L'autocar costa <b>${bus} €</b> en total, i cada alumne paga <b>${ent} €</b> d'entrada al museu i <b>${din} €</b> del dinar. Quants euros sobraran?`,fields:[fInt('Sobren (€)',tot-gast)],
    hints:['Primer calcula el que costen les entrades i els dinars de tots els alumnes.','Suma totes les despeses i resta-les dels diners que tenen.'],
    steps:[`Per alumne: ${ent} + ${din} = ${ent+din} €. Per a ${al} alumnes: ${ent+din} × ${al} = ${(ent+din)*al} €.`,`Despeses totals: ${bus} + ${(ent+din)*al} = ${gast} €.`,`Sobren: ${tot} − ${gast} = <b>${tot-gast} €</b>.`],
    err:x=>{const y=val(x[0]);return y===tot-bus-ent-din||y===tot-bus-(ent+din)||y===tot-al*(ent+din)?'mt_problema_pas':null}}}
  const Cp=pick([100,200,250,300,400,500,600,800,1000]),r=pick([1,2,3,4,5]),an=rnd(2,5),i1=Cp*r/100;
  return{text:`Guardes <b>${Cp} €</b> en un compte d'estalvi que paga un <b>${r} %</b> d'interès cada any. Quants euros d'interès hauràs guanyat en <b>${an} anys</b>? Quants diners tendràs en total?`,
   fields:[fDec('Interès (€)',i1*an),fDec('Total (€)',Cp+i1*an)],
   hints:[`Calcula primer el ${r} % de ${Cp} €: és el que guanyes en un any.`,`Multiplica l'interès d'un any per ${an} i suma-ho als ${Cp} €.`],
   steps:[`Un any: ${r} % de ${Cp} = ${Cp} × ${r} : 100 = ${dc(i1)} €.`,`${an} anys: ${dc(i1)} × ${an} = ${dc(i1*an)} €.`,`Total: ${Cp} + ${dc(i1*an)} = <b>${dc(Cp+i1*an)} €</b>.`],
   err:x=>near(val(x[0]),i1)?'mt_interes_anys':null}}},

/* ---------- Patrons i successions ---------- */
mt_patrons:{mat:'mates',nom:'Patrons i successions',ab:'Pt',curs:[6],
 teoria:['Una <b>successió</b> és una llista de nombres que segueixen una <b>regla</b> (un patró). Cada nombre és un <b>terme</b>.',
  'Per descobrir la regla, mira com canvia cada terme respecte de l\'anterior: <b>se suma</b> (3, 7, 11, 15 → +4), <b>es resta</b>, o <b>es multiplica</b> (2, 6, 18, 54 → ×3).',
  'Si cada vegada se suma el mateix nombre, podem calcular qualsevol terme sense escriure\'ls tots: terme número n = primer terme + (n − 1) × el que se suma.',
  'Exemple: 5, 8, 11, 14... El terme 20 és 5 + 19 × 3 = <b>62</b>.'],
 gen(lv){const t=lv===0?pick([0,0,2]):lv===1?pick([0,1,2,3]):pick([1,2,3,3]);
  if(t===0){const a=rnd(1,lv?60:30),d=pick([2,3,4,5,6,7,9,10,11,12,15,25])*(Math.random()<.25?-1:1),s=Array.from({length:7},(_,i)=>a+i*d);if(s.some(v=>v<0))s.forEach((_,i)=>s[i]=a+Math.abs(d)*i);
   const dd=s[1]-s[0];
   return{text:`Escriu els dos termes següents:<br><b>${s.slice(0,5).join(', ')}, ...</b>`,fields:[{label:'6è terme',ans:R(s[5])},{label:'7è terme',ans:R(s[6])}],
    hints:['Calcula la diferència entre cada terme i el següent.',`Cada terme és el de davant ${dd>0?'més':'menys'} ${Math.abs(dd)}.`],
    steps:[`Regla: ${dd>0?'+':'−'} ${Math.abs(dd)}.`,`${s[4]} ${dd>0?'+':'−'} ${Math.abs(dd)} = ${s[5]}; ${s[5]} ${dd>0?'+':'−'} ${Math.abs(dd)} = ${s[6]}.`,`Els termes són <b>${s[5]}</b> i <b>${s[6]}</b>.`]}}
  if(t===1){const mul=Math.random()<.6;let s,rg;
   if(mul){const a=rnd(1,5),k=pick([2,3]);s=Array.from({length:6},(_,i)=>a*k**i);rg=`× ${k}`}
   else{const a=rnd(1,10),p=rnd(2,6),q=rnd(1,p-1);s=[a];for(let i=1;i<6;i++)s.push(i%2?s[i-1]+p:s[i-1]-q);rg=`+ ${p}, − ${q}, alternant`}
   return{text:`Descobreix la regla i escriu el terme següent:<br><b>${s.slice(0,5).join(', ')}, ...</b>`,fields:[fInt('Terme següent',s[5])],
    hints:['No sempre se suma el mateix. Prova si es multiplica o si les operacions canvien.',mul?'Divideix cada terme entre l\'anterior.':'Mira els salts: no són tots iguals, però es repeteixen.'],
    steps:[`Comparam cada terme amb l'anterior: ${s.slice(1,5).map((v,i)=>`${s[i]} → ${v}`).join(', ')}.`,`Regla: ${rg}.`,`Terme següent: <b>${num(s[5])}</b>.`]}}
  if(t===2){const a=rnd(1,4),d=rnd(1,3),N=lv===0?pick([5,6,7]):rnd(8,25),v=a+(N-1)*d,cn=[a,a+d,a+2*d];
   return{text:`Observa com creixen les figures fetes amb quadrets.<br>Quants quadrets tendrà la <b>figura ${N}</b>?`,fig:fitxes(cn),fields:[fInt('Quadrets',v)],
    hints:[`Compta els quadrets de cada figura: ${cn.join(', ')}... Quants n'afegim cada vegada?`,`La figura 1 en té ${a} i cada figura nova n'afegeix ${d}. Fins a la figura ${N} n'afegim ${N-1} vegades.`],
    steps:[`Figura 1: ${a} quadrets. Cada figura n'afegeix ${d}.`,`Figura ${N}: ${a} + (${N} − 1) × ${d} = ${a} + ${(N-1)*d}.`,`Tendrà <b>${v} quadrets</b>.`],
    err:x=>{const y=val(x[0]);return y!==v&&(y===a*N||y===d*N)?'mt_patro_proporcional':null}}}
  const a=rnd(2,20),d=rnd(2,9),n=rnd(10,40),v=a+(n-1)*d,ask=Math.random()<.5;
  return{text:ask?`A la successió <b>${a}, ${a+d}, ${a+2*d}, ${a+3*d}, ...</b> quin lloc ocupa el nombre <b>${v}</b>?`:`A la successió <b>${a}, ${a+d}, ${a+2*d}, ${a+3*d}, ...</b> quin és el terme número <b>${n}</b>?`,
   fields:[ask?fInt('Lloc (número de terme)',n):fInt(`Terme ${n}`,v)],
   hints:[`Cada terme és l'anterior + ${d}. El primer és ${a}.`,ask?`Quantes vegades has de sumar ${d} a ${a} per arribar a ${v}? Després suma-hi 1.`:`Del terme 1 al terme ${n} sumam ${d} un total de ${n-1} vegades.`],
   steps:ask?[`De ${a} a ${v} hi ha ${v-a}.`,`${v-a} : ${d} = ${n-1} salts.`,`Ocupa el lloc ${n-1} + 1 = <b>${n}</b>.`]:[`Primer terme ${a}, sumam ${d} cada vegada.`,`Terme ${n} = ${a} + ${n-1} × ${d} = ${a} + ${(n-1)*d}.`,`El terme ${n} és <b>${v}</b>.`],
   err:x=>{const y=val(x[0]);return!ask&&y!==v&&(y===a*n||y===d*n||y===a+n*d)?'mt_patro_proporcional':(ask&&y===n-1?'mt_problema_pas':null)}}}},

/* ---------- Igualtats i nombre desconegut ---------- */
mt_equacions:{mat:'mates',nom:'Igualtats: troba el nombre amagat',ab:'Eq',curs:[6],
 teoria:['Una <b>igualtat</b> és com una <b>balança en equilibri</b>: el que hi ha a cada costat del signe = val el mateix.',
  'Quan hi ha un nombre desconegut (un quadre □ o una lletra, com la <b>x</b>), el trobam fent l\'<b>operació inversa</b>:',
  '• □ + 7 = 15 → □ = 15 − 7 = <b>8</b><br>• □ − 4 = 9 → □ = 9 + 4 = <b>13</b><br>• 6 × □ = 42 → □ = 42 : 6 = <b>7</b><br>• □ : 3 = 5 → □ = 5 × 3 = <b>15</b>',
  'Si hi ha dues operacions (3 × □ + 2 = 20), desfem primer la suma i després la multiplicació: 20 − 2 = 18 → 18 : 3 = <b>6</b>. Comprova-ho sempre!'],
 gen(lv){const t=lv===0?0:lv===1?pick([0,1,1,2]):pick([1,2,2]),B='<span style="display:inline-block;width:1.2em;height:1.2em;border:2px solid #2F6BFF;vertical-align:-.2em"></span>';
  if(t===0){const op=pick(['+','−','×',':']),x=rnd(2,lv?60:20),a=rnd(2,op==='×'||op===':'?12:50);let e,r,wr;
   if(op==='+'){r=x+a;e=`${B} + ${a} = ${r}`;wr=r+a}else if(op==='−'){r=x-a;if(r<0){return this.gen(lv)}e=`${B} − ${a} = ${r}`;wr=r-a}else if(op==='×'){r=x*a;e=`${a} × ${B} = ${r}`;wr=r*a}else{r=x;e=`${B} : ${a} = ${r}`}
   const X=op===':'?x*a:x,inv={'+':'restar','−':'sumar','×':'dividir',':':'multiplicar'}[op];
   if(op===':')wr=Math.floor(x/a)||-1;
   return{text:`Quin nombre va dins el quadre?<br><span style="font-size:1.3em">${e}</span>`,fields:[fInt('Nombre amagat',X)],
    hints:['Pensa quina operació desfà la que hi ha.',`Per desfer «${op} ${a}» has de ${inv} ${a}.`],
    steps:[`L'operació contrària de ${op} és ${inv}.`,op==='+'?`${r} − ${a} = ${X}`:op==='−'?`${r} + ${a} = ${X}`:op==='×'?`${r} : ${a} = ${X}`:`${r} × ${a} = ${X}`,`El nombre amagat és <b>${num(X)}</b>. Comprovació: ${e.replace(B,num(X))}.`],
    err:x2=>val(x2[0])===wr&&wr!==X?'mt_eq_inversa':null}}
  const k=rnd(2,lv===2?9:6),x=rnd(2,lv===2?25:12),b=rnd(1,30),c=k*x+b;
  if(t===2){const obj=pick(['caixes','sacs','paquets']);
   return{text:`La balança està en equilibri. A un plat hi ha <b>${k} ${obj} iguals</b> i una pesa de <b>${b} kg</b>; a l'altre, una pesa de <b>${c} kg</b>. Quant pesa cada ${obj==='caixes'?'caixa':obj==='sacs'?'sac':'paquet'}?`,fig:k<=8?balanca(k,b,c):null,fields:[fInt('Pes (kg)',x)],
    hints:[`Si treus la pesa de ${b} kg d'un plat, n'has de treure ${b} kg de l'altre perquè continuï en equilibri.`,`Ara ${k} ${obj} pesen ${c-b} kg. Reparteix-ho entre ${k}.`],
    steps:[`${k} × □ + ${b} = ${c}.`,`Treim ${b} kg de cada plat: ${k} × □ = ${c-b}.`,`□ = ${c-b} : ${k} = <b>${x} kg</b>.`],
    err:x2=>{const y=val(x2[0]);return y===(c+b)/k||y===c/k-b||y===c-b?'mt_eq_inversa':null}}}
  return{text:`Troba el valor de <b>x</b>:<br><span style="font-size:1.3em">${k} × x + ${b} = ${c}</span>`,fields:[fInt('x',x)],
   hints:['Desfés primer la suma i després la multiplicació.',`Resta ${b} als dos costats: ${k} × x = ${c-b}.`],
   steps:[`Restam ${b}: ${k} × x = ${c} − ${b} = ${c-b}.`,`Dividim entre ${k}: x = ${c-b} : ${k} = ${x}.`,`<b>x = ${x}</b>. Comprovació: ${k} × ${x} + ${b} = ${c}.`],
   err:x2=>{const y=val(x2[0]);return y===(c+b)/k||y===c/k-b?'mt_eq_inversa':null}}}},

/* ---------- Moviments al pla ---------- */
mt_moviments:{mat:'mates',nom:'Moviments al pla: translació, simetria i gir',ab:'Mv',curs:[6],
 teoria:['Els <b>moviments</b> canvien una figura de lloc sense canviar-ne la forma ni la mida (les figures queden <b>iguals</b>).',
  '<b>Translació:</b> lliscar la figura. Tots els punts es mouen el mateix nombre de quadres en la mateixa direcció.',
  '<b>Simetria:</b> com un mirall. Cada punt passa a l\'altra banda de l\'<b>eix de simetria</b>, a la mateixa distància. Un <b>eix de simetria</b> d\'una figura la divideix en dues meitats que coincideixen si la doblegam.',
  '<b>Gir:</b> fer voltar la figura al voltant d\'un punt (el centre). Un gir de 180° (mitja volta) al voltant de l\'origen canvia el punt (3, 2) pel (−3, −2).'],
 fig:()=>grid(-5,5,[{p:[[1,1],[4,1],[1,3]],l:['A','B','C']},{p:[[-1,1],[-4,1],[-1,3]],l:["A'","B'","C'"],c:C.o,fill:C.ol}],[{v:0}]),
 gen(lv){const t=lv===0?pick([0,2]):lv===1?pick([0,1,2]):pick([0,1,1,3]);
  if(t===2){const SH=SHAPES.filter(s=>lv>0||s[1]>0&&s[0]!=='octàgon regular'),[nm,ax,pf]=pick(SH);
   return{text:`Quants <b>eixos de simetria</b> té aquesta figura (un <b>${nm}</b>)?`,fig:shapeFig(pf()),fields:[fInt('Eixos de simetria',ax)],
    hints:['Un eix de simetria divideix la figura en dues meitats iguals que coincideixen si la doblegues.','Prova línies verticals, horitzontals i diagonals. Els polígons regulars en tenen tants com costats.'],
    steps:[`Cercam les línies que parteixen el ${nm} en dues meitats que coincideixen.`,ax===0?'Cap línia no aconsegueix que les dues meitats coincideixin.':`N'hi ha ${ax}.`,`El ${nm} té <b>${ax}</b> eix${ax===1?'':'os'} de simetria.`]}}
  const tri=()=>{let P;do{const x=rnd(-3,1),y=rnd(-3,1);P=[[x,y],[x+rnd(2,3),y],[x+rnd(0,2),y+rnd(2,3)]]}while(false);return P};
  if(t===0){const P=tri(),dx=rnd(-3,3),dy=rnd(-3,3);if(!dx&&!dy)return this.gen(lv);const Q=P.map(([x,y])=>[x+dx,y+dy]),k=rnd(0,2),L=['A','B','C'][k];
   const mv=[dx?`${Math.abs(dx)} ${Math.abs(dx)===1?'quadre':'quadres'} ${dx>0?'a la dreta':'a l\'esquerra'}`:'',dy?`${Math.abs(dy)} ${dy>0?'amunt':'avall'}`:''].filter(Boolean).join(' i ');
   return{text:`Fem una <b>translació</b> del triangle ABC: ${mv}. Quines coordenades té el punt <b>${L}'</b>?`,fig:grid(-6,6,[{p:P,l:['A','B','C']}]),
    fields:[{label:'x (si és negativa, posa el signe −)',ans:R(Q[k][0])},{label:'y',ans:R(Q[k][1])}],
    hints:[`Primer escriu les coordenades de ${L}: (${cx(P[k][0])}, ${cx(P[k][1])}).`,'Moure\'s a dreta o esquerra canvia la x; amunt o avall canvia la y.'],
    steps:[`${L} = (${cx(P[k][0])}, ${cx(P[k][1])}).`,`x: ${cx(P[k][0])} ${dx>=0?'+':'−'} ${Math.abs(dx)} = ${cx(Q[k][0])}. y: ${cx(P[k][1])} ${dy>=0?'+':'−'} ${Math.abs(dy)} = ${cx(Q[k][1])}.`,`${L}' = (<b>${cx(Q[k][0])}, ${cx(Q[k][1])}</b>).`],
    err:x=>{const a=val(x[0]),b=val(x[1]);return Q[k][0]!==Q[k][1]&&a===Q[k][1]&&b===Q[k][0]?'mt_coord_ordre':null}}}
  if(t===1){const vert=Math.random()<.5,e=lv===2?rnd(-2,2):0;let px,py;do{px=rnd(-5,5);py=rnd(-5,5)}while(vert?Math.abs(2*e-px)>5||px===e:Math.abs(2*e-py)>5||py===e);
   const Q=vert?[2*e-px,py]:[px,2*e-py],W=vert?[-px,py]:[px,-py];
   return{text:`Dibuixam el simètric del punt <b>P(${cx(px)}, ${cx(py)})</b> respecte de l'eix vermell (${vert?`la recta vertical x = ${cx(e)}`:`la recta horitzontal y = ${cx(e)}`}). Quines coordenades té P'?`,
    fig:grid(-6,6,[{p:[[px,py]],l:['P']}],[vert?{v:e}:{h:e}]),fields:[{label:'x (si és negativa, posa el signe −)',ans:R(Q[0])},{label:'y',ans:R(Q[1])}],
    hints:[`Compta quants quadres hi ha de P fins a l'eix.`,`P' és a la mateixa distància de l'eix, a l'altra banda. ${vert?'La y no canvia.':'La x no canvia.'}`],
    steps:[vert?`P és a ${Math.abs(px-e)} quadres de l'eix x = ${cx(e)}.`:`P és a ${Math.abs(py-e)} quadres de l'eix y = ${cx(e)}.`,vert?`A l'altra banda: x = ${cx(e)} ${px>e?'−':'+'} ${Math.abs(px-e)} = ${cx(Q[0])}. La y és la mateixa.`:`A l'altra banda: y = ${cx(e)} ${py>e?'−':'+'} ${Math.abs(py-e)} = ${cx(Q[1])}. La x és la mateixa.`,`P' = (<b>${cx(Q[0])}, ${cx(Q[1])}</b>).`],
    err:x=>{const a=val(x[0]),b=val(x[1]);if(e!==0&&a===W[0]&&b===W[1])return'mt_sim_eix';if(Q[0]!==Q[1]&&a===Q[1]&&b===Q[0])return'mt_coord_ordre';return null}}}
  let px,py;do{px=rnd(-5,5);py=rnd(-5,5)}while(!px||!py);
  return{text:`Fem un <b>gir de 180°</b> (mitja volta) del punt <b>P(${cx(px)}, ${cx(py)})</b> al voltant de l'origen (0, 0). On queda el punt?`,fig:grid(-6,6,[{p:[[px,py]],l:['P']}]),
   fields:[{label:'x (si és negativa, posa el signe −)',ans:R(-px)},{label:'y',ans:R(-py)}],
   hints:['Mitja volta deixa el punt a l\'altra banda de l\'origen, a la mateixa distància.','Les dues coordenades canvien de signe.'],
   steps:['Amb mitja volta al voltant de l\'origen, el punt queda just a l\'altra banda.',`Canviam el signe de les dues coordenades: (${cx(px)}, ${cx(py)}) → (${cx(-px)}, ${cx(-py)}).`,`P' = (<b>${cx(-px)}, ${cx(-py)}</b>).`],
   err:x=>{const a=val(x[0]),b=val(x[1]);return a===-px&&b===py||a===px&&b===-py?'mt_coord_signe':null}}}},

/* ---------- Gràfics de sectors i de línies ---------- */
mt_grafics_sl:{mat:'mates',nom:'Gràfics de sectors i de línies',ab:'Gs',curs:[6],
 teoria:['El <b>gràfic de sectors</b> és un cercle dividit en trossos. Cada tros (sector) mostra quina part del total representa una dada, sovint en percentatge. Tot el cercle és el 100 % (360°).',
  'Per calcular els graus d\'un sector: <b>percentatge × 360 : 100</b>. El 25 % és 25 × 360 : 100 = <b>90°</b>.',
  'El <b>gràfic de línies</b> uneix punts i serveix per veure com canvia una dada amb el temps (la temperatura durant una setmana, l\'alçada d\'una planta...). Si la línia puja, la dada augmenta; si baixa, disminueix.'],
 gen(lv){const t=lv===0?pick([0,2]):lv===1?pick([0,1,2]):pick([0,1,1,2]);
  if(t===0){const N=pick(lv===0?[20,40,60,100,200]:[40,60,80,120,200,300,400]),SET=pick([['Esport preferit',['Futbol','Bàsquet','Natació','Tennis']],['Transport per anar a escola',['A peu','Cotxe','Bicicleta','Autobús']],['Fruita preferida',['Poma','Plàtan','Maduixa','Kiwi']]]);
   let ps;do{ps=[rnd(2,8),rnd(2,6),rnd(1,5)].map(v=>v*5);ps.push(100-ps[0]-ps[1]-ps[2])}while(ps[3]<5||ps.some(p=>p*N%100));
   const k=rnd(0,3);
   return{text:`${SET[0]} dels <b>${N} alumnes</b> d'una escola. Quants alumnes han triat <b>${SET[1][k].toLowerCase()}</b>?`,fig:pie(ps.map((p,i)=>({p,n:SET[1][i]}))),fields:[fInt('Alumnes',ps[k]*N/100)],
    hints:[`Busca el percentatge de ${SET[1][k]} al gràfic.`,`Calcula el ${ps[k]} % de ${N}: ${N} × ${ps[k]} : 100.`],
    steps:[`${SET[1][k]}: ${ps[k]} %.`,`${ps[k]} % de ${N} = ${N} × ${ps[k]} : 100 = ${ps[k]*N/100}.`,`L'han triat <b>${ps[k]*N/100} alumnes</b>.`],
    err:x=>val(x[0])===ps[k]&&ps[k]!==ps[k]*N/100?'mt_percent_euros':null}}
  if(t===1){const byCount=lv===2&&Math.random()<.5;
   if(byCount){const N=pick([12,18,20,24,30,36,40,60]),k=rnd(1,N-1),g=k*360/N;if(!Number.isInteger(g))return this.gen(lv);
    return{text:`En una enquesta a <b>${N} persones</b>, <b>${k}</b> prefereixen el cinema. Quants graus ha de fer el sector del cinema en un gràfic de sectors?`,fields:[fInt('Graus',g)],
     hints:['Tot el cercle (360°) són les '+N+' persones.',`Calcula primer quants graus ocupa cada persona (divideix 360° entre ${N}) i després multiplica per les ${k} persones.`],
     steps:[`Cada persona: 360° : ${N} = ${dc(360/N)}°.`,`${k} persones: ${dc(360/N)}° × ${k} = ${g}°.`,`El sector fa <b>${g}°</b>.`]}}
   const p=pick([5,10,15,20,25,30,35,40,45,50,60,75]);
   return{text:`En un gràfic de sectors, una dada representa el <b>${p} %</b> del total. Quants graus fa el seu sector?`,fig:pie([{p,n:`${p} %`},{p:100-p,n:'la resta'}]),fields:[fInt('Graus',p*3.6)],
    hints:['El cercle sencer, el 100 %, fa 360°.',`Calcula el ${p} % de 360.`],
    steps:['100 % → 360°.',`${p} % de 360 = 360 × ${p} : 100 = ${dc(p*3.6)}.`,`El sector fa <b>${dc(p*3.6)}°</b>.`],
    err:x=>val(x[0])===p?'mt_sector_graus':null}}
  const cats=['Dl','Dt','Dc','Dj','Dv','Ds','Dg'],n=lv===0?5:7,base=lv===2?rnd(-4,6):rnd(8,20);let v;do{v=[base];for(let i=1;i<n;i++)v.push(v[i-1]+rnd(-4,4))}while(new Set(v).size<4||Math.max(...v)-Math.min(...v)<4);
  const q=lv===0?pick([0,1]):pick([0,1,2]),i=rnd(0,n-2),j=rnd(i+1,n-1),mx=Math.max(...v),mn=Math.min(...v);
  const Q=[[`Quina va ser la temperatura més alta de la setmana?`,mx,['Busca el punt més alt de la línia.','Mira a quin nombre de l\'eix vertical correspon.'],[`El punt més alt és a ${cx(mx)} °C.`]],
   [`Quina diferència de temperatura hi va haver entre la més alta i la més baixa?`,mx-mn,['Busca el punt més alt i el més baix.','Resta les dues temperatures (compte si n\'hi ha de negatives!).'],[`Màxima ${cx(mx)} °C, mínima ${cx(mn)} °C.`,`${cx(mx)} − (${cx(mn)}) = ${mx-mn}.`]],
   [`Quants graus va canviar la temperatura entre ${cats[i]} i ${cats[j]}? (si va baixar, posa el signe −)`,v[j]-v[i],[`Llegeix la temperatura de ${cats[i]} i de ${cats[j]}.`,'Fes la del segon dia menys la del primer.'],[`${cats[i]}: ${cx(v[i])} °C · ${cats[j]}: ${cx(v[j])} °C.`,`${cx(v[j])} − (${cx(v[i])}) = ${cx(v[j]-v[i])}.`]]][q];
  return{text:`El gràfic mostra la temperatura màxima de cada dia. ${Q[0]}`,fig:lineChart(cats.slice(0,n),v,'°C'),fields:[{label:'Graus (°C)',ans:R(Q[1])}],hints:Q[2],
   steps:[...Q[3],`Resposta: <b>${cx(Q[1])}</b>.`],err:x=>q===1&&mn<0&&val(x[0])===mx+mn?'mt_enters_diferencia':null}}}
});
})();
