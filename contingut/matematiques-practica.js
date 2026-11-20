/* Aprenem - MATEMÀTIQUES 6è: temes que demana el llibre de referència i que encara no hi eren
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. Fonts: vegeu contingut/matematiques.js.
   Llibre de referència: «Practica Mat 6. Matemàtiques. Illes Balears» (Vicens Vives, Comunitat Zoom).
   Temes: comparar i ordenar fraccions (tema 4), comparar i ordenar decimals (tema 5), coordenades i orientació
   al pla (tema 7), bisectriu i mediatriu (tema 8), freqüència absoluta i relativa (tema 12).
   Els exercicis són originals i es generen per codi amb la solució calculada. */
(()=>{
const {num,dc,fInt,fDec,val,eq,near,fr,svg,tx,ln,pts,C,taula}=MT;

Object.assign(ERR,{
 mt_ordre_invers:{kid:'Les has ordenat al revés! Et demanam de la més petita a la més gran.',par:'Ordena de major a menor quan se li demana de menor a major'},
 mt_frac_den_gran:{kid:'Compte! Si el numerador és el mateix, la fracció amb el denominador més gran és la més petita (les parts són més petites).',par:'Pensa que, amb el mateix numerador, un denominador més gran fa la fracció més gran'},
 mt_dec_mes_xifres:{kid:'Un decimal no és més gran perquè tengui més xifres. Compara primer les dècimes, després les centèsimes... (2,5 = 2,50 > 2,45).',par:'Compara els decimals pel nombre de xifres (creu que 2,45 > 2,5)'},
 mt_dec_posicio:{kid:'Compte amb la posició: la primera xifra després de la coma són les dècimes, la segona les centèsimes i la tercera les mil·lèsimes.',par:'Confon dècimes, centèsimes i mil·lèsimes'},
 mt_coord_ordre:{kid:'Has intercanviat les coordenades. Primer va la x (horitzontal, esquerra-dreta) i després la y (vertical, amunt-avall).',par:'Intercanvia les coordenades x i y d\'un punt'},
 mt_coord_signe:{kid:'Revisa el signe! A l\'esquerra de l\'eix vertical la x és negativa, i per davall de l\'eix horitzontal la y és negativa.',par:'S\'equivoca amb el signe de les coordenades negatives'},
 mt_bis_meitat:{kid:'La bisectriu parteix l\'angle en dues parts iguals: cada part és la meitat de l\'angle sencer.',par:'No relaciona la bisectriu amb la meitat de l\'angle'},
 mt_med_meitat:{kid:'La mediatriu talla el segment just pel mig: cada tros és la meitat del segment.',par:'No sap que la mediatriu passa pel punt mitjà del segment'},
 mt_freq_rel:{kid:'Aquesta és la freqüència absoluta (quantes vegades). La relativa és aquesta quantitat dividida entre el total de dades.',par:'Confon la freqüència absoluta amb la relativa'},
 mt_freq_total:{kid:'Has sumat les freqüències que coneixes. Per trobar la que falta, resta aquesta suma del total.',par:'No dedueix la freqüència que falta a partir del total'}
});

/* ---------- dibuixos ---------- */
// Quadrícula amb eixos de coordenades. pts: [{l:'A',x,y,c}]
function grid(mn,mx,P,opt={}){const W=300,pad=22,n=mx-mn,s=(W-2*pad)/n,X=x=>pad+(x-mn)*s,Y=y=>W-pad-(y-mn)*s;let g='';
 for(let k=mn;k<=mx;k++)g+=ln(X(k),Y(mn),X(k),Y(mx),{c:C.gl,w:1})+ln(X(mn),Y(k),X(mx),Y(k),{c:C.gl,w:1});
 const ox=Math.max(mn,Math.min(mx,0));g+=ln(X(mn),Y(ox),X(mx),Y(ox),{w:2})+ln(X(ox),Y(mn),X(ox),Y(mx),{w:2});
 for(let k=mn;k<=mx;k++){if(k===0)continue;g+=tx(X(k),Y(ox)+11,k<0?'−'+(-k):k,{fs:10,fw:600,c:'#4A5468'})+tx(X(ox)-9,Y(k),k<0?'−'+(-k):k,{fs:10,fw:600,c:'#4A5468',a:'end'})}
 g+=tx(X(ox)-8,Y(ox)+11,'0',{fs:10,fw:600,c:'#4A5468'})+tx(X(mx)-4,Y(ox)-10,'x',{fs:13,c:C.b})+tx(X(ox)+10,Y(mx)+4,'y',{fs:13,c:C.b});
 if(opt.path)g+=`<polyline points="${pts(opt.path.map(([x,y])=>[X(x),Y(y)]))}" fill="none" stroke="${C.o}" stroke-width="3" stroke-dasharray="6 5"/>`;
 P.forEach(p=>{g+=`<circle cx="${X(p.x).toFixed(1)}" cy="${Y(p.y).toFixed(1)}" r="6" fill="${p.c||C.r}" stroke="#fff" stroke-width="2"/>`+tx(X(p.x)+11,Y(p.y)-11,p.l,{fs:15,c:p.c||C.r})});
 return svg(W,W,g,300)}
// Angle amb la bisectriu (discontínua)
function bisFig(deg,lab){const cx=deg>100?170:70,cy=150,L=125,rd=deg*Math.PI/180,h=rd/2,r=34;
 let g=`<path d="M${cx} ${cy} L${cx+r} ${cy} A${r} ${r} 0 0 0 ${(cx+r*Math.cos(rd)).toFixed(1)} ${(cy-r*Math.sin(rd)).toFixed(1)}Z" fill="${C.ol}" stroke="${C.o}" stroke-width="2"/>`;
 g+=ln(cx,cy,cx+L+20,cy,{w:3})+ln(cx,cy,cx+L*Math.cos(rd),cy-L*Math.sin(rd),{w:3})+ln(cx,cy,cx+(L+10)*Math.cos(h),cy-(L+10)*Math.sin(h),{w:2.5,c:C.b,dash:1});
 g+=`<circle cx="${cx}" cy="${cy}" r="4" fill="${C.t}"/>`;if(lab)g+=tx(cx-4,cy+16,lab,{fs:14,c:C.t,a:'start'});
 return svg(340,175,g,300)}
// Segment AB amb la mediatriu (discontínua) i el punt mitjà M
function medFig(lab,P){const y=110,a=60,b=280,m=(a+b)/2;let g=ln(m,20,m,190,{w:2.5,c:C.b,dash:1})+ln(a,y,b,y,{w:3});
 g+=`<path d="M${m} ${y-14} H${m+14} V${y}" fill="none" stroke="${C.g}" stroke-width="1.5"/>`;
 [[a,'A'],[b,'B'],[m,'M']].forEach(([x,l])=>{g+=`<circle cx="${x}" cy="${y}" r="5" fill="${C.t}"/>`+tx(x+(l==='M'?-12:0),y+20,l,{fs:15})});
 if(lab)g+=tx((a+m)/2,y-14,lab,{fs:14,c:C.o});
 if(P)g+=ln(a,y,m,40,{c:C.o,w:2})+ln(b,y,m,40,{c:C.o,w:2})+`<circle cx="${m}" cy="40" r="5" fill="${C.r}"/>`+tx(m+14,34,'P',{fs:15,c:C.r});
 return svg(340,200,g,300)}

const ordreFields=(vals,mk)=>vals.map((v,i)=>mk(i===0?'1a (la més petita)':i===vals.length-1?`${i+1}a (la més gran)`:`${i+1}a`,v));
const seqEq=(x,arr)=>arr.every((v,i)=>near(val(x[i]),v));

Object.assign(SK,{
/* ---------- Tema 4. Comparar i ordenar fraccions ---------- */
mt_frac_comparar:{mat:'mates',nom:'Comparar i ordenar fraccions',ab:'Fo',curs:[6],
 teoria:['Per <b>comparar fraccions</b> les hem de posar de manera que les parts siguin de la mateixa mida.',
  `<b>Mateix denominador:</b> és més gran la que té el numerador més gran. ${F(5,8)} > ${F(3,8)}.`,
  `<b>Mateix numerador:</b> és més gran la que té el denominador més <b>petit</b>, perquè les parts són més grans. ${F(2,3)} > ${F(2,5)}.`,
  `<b>Denominadors diferents:</b> les reduïm a <b>comú denominador</b> (el m.c.m. dels denominadors) i comparam els numeradors. ${F(3,4)} i ${F(5,6)} → ${F(9,12)} i ${F(10,12)}: per tant ${F(5,6)} > ${F(3,4)}.`],
 gen(lv){const t=lv===0?0:lv===1?pick([0,1,2]):pick([1,1,2]),pool=lv===0?[2,3,4,6,8]:[2,3,4,5,6,8,9,10,12];
  if(t===0){let b,e,a,c;do{b=pick(pool);e=pick(pool);a=rnd(1,b-1);c=rnd(1,e-1)}while(b===e||b%e===0&&lv&&Math.random()<.5||a*e===c*b);
   const L=lcm(b,e),na=a*L/b,nc=c*L/e,big=na>nc?[a,b]:[c,e];
   return{text:`Compara ${F(a,b)} i ${F(c,e)}.<br>Redueix-les a comú denominador (el més petit possible) i escriu quina és <b>més gran</b>.`,
    fields:[{label:'Denominador comú',ans:R(L)},{label:`Numerador de ${a}/${b}`,ans:R(na)},{label:`Numerador de ${c}/${e}`,ans:R(nc)},{label:'La més gran',ans:R(big[0],big[1])}],
    hints:[`El denominador comú ha de ser un múltiple de ${b} i de ${e}. Quin és el més petit?`,`Per passar ${F(a,b)} a denominador ${L}, per quin nombre multiplicam ${b}? Fes el mateix amb el numerador.`],
    steps:[`m.c.m.(${b}, ${e}) = ${L}.`,`${F(a,b)} = ${F(na,L)} (× ${L/b}) i ${F(c,e)} = ${F(nc,L)} (× ${L/e}).`,`Comparam els numeradors: ${Math.max(na,nc)} > ${Math.min(na,nc)}. La més gran és <b>${F(big[0],big[1])}</b>.`],
    err:x=>{const d=val(x[0]);if(d!==L&&d%b===0&&d%e===0)return'mt_den_minim';if(L!==b&&val(x[1])===a||L!==e&&val(x[2])===c)return'mt_num_igual';return null}}}
  if(t===2){const n=rnd(1,lv===2?5:3);let ds;do{ds=MT.sample([2,3,4,5,6,7,8,9,10,12].filter(d=>d>n),3)}while(ds.length<3);
   const vals=ds.map(d=>n/d).sort((p,q)=>p-q),ord=ds.slice().sort((p,q)=>q-p);
   return{text:`Ordena aquestes fraccions de la <b>més petita a la més gran</b>:<br><span style="font-size:1.15em">${ds.map(d=>F(n,d)).join(' &nbsp; ')}</span>`,
    fields:ordreFields(ord,(l,d)=>({label:l,ans:R(n,d)})),
    hints:['Totes tenen el mateix numerador. Què vol dir un denominador més gran?','Com més parts fas d\'una unitat, més petita és cada part.'],
    steps:[`Totes tenen numerador ${n}: agafam ${n} parts de cada unitat.`,`Com més gran és el denominador, més petites són les parts: ${ord.map(d=>F(n,d)).join(' < ')}.`,`Ordre: <b>${ord.map(d=>`${n}/${d}`).join(', ')}</b>.`],
    err:x=>seqEq(x,vals.slice().reverse())?'mt_frac_den_gran':null}}
  let fs;do{fs=Array.from({length:3},()=>{const d=pick(pool);return[rnd(1,lv===2?d+Math.floor(d/2):d-1),d]})}while(new Set(fs.map(([n,d])=>n/d)).size<3||new Set(fs.map(f=>f[1])).size<2||fs.some(([n,d])=>n%d===0));
  const so=fs.slice().sort((p,q)=>p[0]/p[1]-q[0]/q[1]),L=fs.reduce((m,f)=>lcm(m,f[1]),1),vals=so.map(([n,d])=>n/d);
  return{text:`Ordena aquestes fraccions de la <b>més petita a la més gran</b>:<br><span style="font-size:1.15em">${fs.map(([n,d])=>F(n,d)).join(' &nbsp; ')}</span>`,
   fields:ordreFields(so,(l,[n,d])=>({label:l,ans:R(n,d)})),
   hints:['Els denominadors no són iguals. Busca un denominador comú per a totes tres.',`Un denominador comú és ${L}. Converteix-les i compara els numeradors.`],
   steps:[`Denominador comú: m.c.m.(${[...new Set(fs.map(f=>f[1]))].join(', ')}) = ${L}.`,`${fs.map(([n,d])=>`${F(n,d)} = ${F(n*L/d,L)}`).join(' · ')}.`,`Ordenam pels numeradors: <b>${so.map(([n,d])=>`${n}/${d}`).join(' < ')}</b>.`],
   err:x=>seqEq(x,vals.slice().reverse())?'mt_ordre_invers':null}}},

/* ---------- Tema 5. Comparar i ordenar decimals ---------- */
mt_dec_ordre:{mat:'mates',nom:'Comparar i ordenar decimals',ab:'Do',curs:[6],
 teoria:['Per <b>comparar nombres decimals</b>, primer miram la <b>part entera</b>: 7,1 > 6,95 perquè 7 > 6.',
  'Si la part entera és igual, comparam xifra a xifra: primer les <b>dècimes</b>, després les <b>centèsimes</b> i després les <b>mil·lèsimes</b>.',
  'Un decimal no és més gran perquè tengui més xifres! Si cal, afegim zeros a la dreta perquè tenguin les mateixes xifres: 2,5 = 2,50, i 2,50 > 2,45.',
  'Recorda: 1 dècima = 0,1 · 1 centèsima = 0,01 · 1 mil·lèsima = 0,001.'],
 gen(lv){const t=lv===0?pick([0,0,1]):pick([0,1]);
  if(t===1){const P=[['dècima',100],['centèsima',10],['mil·lèsima',1]],k=lv===2?rnd(0,2):rnd(0,1),[pn,u]=P[k],up=Math.random()<.6;
   let T;do{T=rnd(1001,49999);if(lv<2)T-=T%10;else if(T%10===0)T+=rnd(1,9);
    if(Math.random()<.4){const dig=Math.floor(T/u)%10;T+=((up?9:0)-dig)*u}}while(T-u<1000||lv<2&&T%10);
   const r=up?T+u:T-u,wrong=P.filter(p=>p[1]!==u).map(p=>up?T+p[1]:T-p[1]);
   return{text:`Escriu el nombre que és <b>una ${pn} ${up?'més gran':'més petit'}</b> que <b>${dc(T/1000)}</b>.`,fields:[fDec('Nombre',r/1000)],
    hints:[`Una ${pn} és ${dc(u/1000)}. Quina xifra de ${dc(T/1000)} són les ${pn}s?`,up?`Suma ${dc(u/1000)}. Si la xifra arriba a 10, passa 1 a la posició de l'esquerra.`:`Resta ${dc(u/1000)}.`],
    steps:[`Una ${pn} = ${dc(u/1000)}.`,`${dc(T/1000)} ${up?'+':'−'} ${dc(u/1000)} = ${dc(r/1000)}.`,`El nombre és <b>${dc(r/1000)}</b>.`],
    err:x=>wrong.some(w=>near(val(x[0]),w/1000))?'mt_dec_posicio':null}}
  const n=lv===0?3:4,mxd=lv===2?3:2,e=rnd(0,lv===0?9:20);let T;
  do{T=Array.from({length:n},()=>{const k=rnd(1,mxd),q=10**(3-k);let d;do{d=rnd(1,10**k-1)}while(d%10===0&&k>1);return(e+(lv&&Math.random()<.25?pick([-1,1]):0))*1000+d*q})}
  while(new Set(T).size<n||T.some(v=>v<0));
  const so=T.slice().sort((p,q)=>p-q),key=v=>{const s=dc(v/1000).split(',');return[+s[0],+(s[1]||0)]},
   naive=T.slice().sort((p,q)=>{const a=key(p),b=key(q);return a[0]-b[0]||a[1]-b[1]}),vals=so.map(v=>v/1000);
  return{text:`Ordena aquests nombres de <b>més petit a més gran</b>:<br><span style="font-size:1.15em">${T.map(v=>dc(v/1000)).join(' &nbsp;·&nbsp; ')}</span>`,
   fields:ordreFields(vals,(l,v)=>fDec(l,v)),
   hints:['Mira primer la part entera. Si és igual, compara les dècimes.','Afegeix zeros a la dreta perquè tots tenguin les mateixes xifres decimals.'],
   steps:[`Els escrivim amb ${mxd} xifres decimals: ${T.map(v=>(v/1000).toFixed(mxd).replace('.',',')).join(' · ')}.`,'Comparam la part entera i després, xifra a xifra, les dècimes, les centèsimes...',`Ordre: <b>${vals.map(v=>dc(v)).join(' < ')}</b>.`],
   err:x=>{if(seqEq(x,vals.slice().reverse()))return'mt_ordre_invers';if(naive.some((v,i)=>v!==so[i])&&seqEq(x,naive.map(v=>v/1000)))return'mt_dec_mes_xifres';return null}}}},

/* ---------- Tema 7. Coordenades cartesianes i orientació al pla ---------- */
mt_coordenades:{mat:'mates',nom:'Coordenades i orientació al pla',ab:'Cc',curs:[6],
 teoria:['Per situar un punt al pla feim servir dos eixos: l\'<b>eix horitzontal</b> (eix x, d\'abscisses) i l\'<b>eix vertical</b> (eix y, d\'ordenades). Es tallen al punt (0, 0), l\'<b>origen</b>.',
  'Cada punt té dues <b>coordenades</b> entre parèntesis: <b>primer la x</b> (quant ens movem a dreta o esquerra) i <b>després la y</b> (quant ens movem amunt o avall). A(3, 2) vol dir 3 a la dreta i 2 amunt.',
  'A l\'esquerra de l\'origen la x és <b>negativa</b>, i per davall la y és <b>negativa</b>: B(−2, −4) és 2 a l\'esquerra i 4 avall.',
  'Per orientar-nos també feim servir els punts cardinals: <b>nord</b> (amunt), <b>sud</b> (avall), <b>est</b> (dreta) i <b>oest</b> (esquerra).'],
 fig:()=>grid(-4,4,[{l:'A(3, 2)',x:3,y:2},{l:'B(−2, −3)',x:-2,y:-3,c:C.b}]),
 gen(lv){const t=lv===0?pick([0,0,1]):lv===1?pick([0,1,2]):pick([0,1,1,2]),mn=lv===0?0:-5,mx=lv===0?7:5,cx=v=>v<0?'−'+(-v):String(v);
  const L='(si és negativa, posa el signe −)';
  if(t===0){const used=new Set(),P=['A','B','C'].map((l,i)=>{let x,y;do{x=rnd(mn,mx);y=rnd(mn,mx)}while(used.has(x+','+y)||(lv<2&&(x===0||y===0))||(lv===0&&(x===mn||y===mn))||x===y&&Math.random()<.7);used.add(x+','+y);return{l,x,y,c:[C.r,C.b,C.gr][i]}});
   const q=pick(P);
   return{text:`Quines són les coordenades del punt <b style="color:${q.c}">${q.l}</b>?`,fig:grid(lv===0?0:-5,lv===0?7:5,P),
    fields:[{label:`x (horitzontal) ${lv?L:''}`,ans:R(q.x)},{label:'y (vertical)',ans:R(q.y)}],
    hints:['Des del punt, baixa (o puja) fins a l\'eix horitzontal: aquesta és la x.','Ara ves fins a l\'eix vertical: aquesta és la y. Recorda: primer la x i després la y.'],
    steps:[`Horitzontalment, el punt ${q.l} és a ${q.x===0?'l\'eix vertical (x = 0)':`${Math.abs(q.x)} ${q.x>0?'a la dreta':'a l\'esquerra'} de l'origen: x = ${cx(q.x)}`}.`,`Verticalment, és ${q.y===0?'sobre l\'eix horitzontal (y = 0)':`${Math.abs(q.y)} ${q.y>0?'amunt':'avall'}: y = ${cx(q.y)}`}.`,`${q.l}(<b>${cx(q.x)}, ${cx(q.y)}</b>).`],
    err:x=>{const a=val(x[0]),b=val(x[1]);if(q.x!==q.y&&a===q.y&&b===q.x)return'mt_coord_ordre';if(Math.abs(a)===Math.abs(q.x)&&Math.abs(b)===Math.abs(q.y)&&(a!==q.x||b!==q.y))return'mt_coord_signe';return null}}}
  if(t===1){let x0,y0,dx,dy,x1,y1;do{x0=rnd(mn,mx);y0=rnd(mn,mx);dx=rnd(-4,4);dy=rnd(-4,4);x1=x0+dx;y1=y0+dy}while(!dx||!dy||x1<mn||x1>mx||y1<mn||y1>mx);
   const card=lv===2;const hx=dx>0?(card?'est':'a la dreta'):(card?'oest':'a l\'esquerra'),hy=dy>0?(card?'nord':'amunt'):(card?'sud':'avall');
   const qd=v=>`${Math.abs(v)} ${Math.abs(v)===1?'quadre':'quadres'}`;
   const mv=card?`camina <b>${qd(dx)} cap a l'${hx}</b> i després <b>${qd(dy)} cap al ${hy}</b>`:`es mou <b>${qd(dx)} ${hx}</b> i després <b>${qd(dy)} ${hy}</b>`;
   return{text:`Un robot és al punt <b>(${cx(x0)}, ${cx(y0)})</b> i ${mv}. A quin punt arriba?`,fig:lv<2?grid(mn,mx,[{l:'R',x:x0,y:y0,c:C.b}]):null,
    fields:[{label:`x ${lv?L:''}`,ans:R(x1)},{label:'y',ans:R(y1)}],
    hints:[card?'Est i oest canvien la x (dreta i esquerra). Nord i sud canvien la y (amunt i avall).':'Moure\'s a dreta o esquerra canvia la x. Moure\'s amunt o avall canvia la y.',`x: ${cx(x0)} ${dx>0?'+':'−'} ${Math.abs(dx)}. y: ${cx(y0)} ${dy>0?'+':'−'} ${Math.abs(dy)}.`],
    steps:[`La x canvia ${Math.abs(dx)} ${dx>0?'cap a la dreta (sumam)':'cap a l\'esquerra (restam)'}: ${cx(x0)} ${dx>0?'+':'−'} ${Math.abs(dx)} = ${cx(x1)}.`,`La y canvia ${Math.abs(dy)} ${dy>0?'amunt (sumam)':'avall (restam)'}: ${cx(y0)} ${dy>0?'+':'−'} ${Math.abs(dy)} = ${cx(y1)}.`,`Arriba al punt <b>(${cx(x1)}, ${cx(y1)})</b>.`],
    err:x=>{const a=val(x[0]),b=val(x[1]);if(x1!==y1&&a===y1&&b===x1)return'mt_coord_ordre';if(x1!==x0-dx&&a===x0-dx||y1!==y0-dy&&b===y0-dy)return'mt_coord_signe';return null}}}
  const hor=Math.random()<.5,f=rnd(-4,4);let p,q;do{p=rnd(-5,5);q=rnd(-5,5)}while(p===q||(p>0)===(q>0)&&Math.random()<.6||!p||!q);
  const A=hor?[p,f]:[f,p],B=hor?[q,f]:[f,q],d=Math.abs(p-q);
  return{text:`Quina és la distància (en quadres) entre els punts <b>A(${cx(A[0])}, ${cx(A[1])})</b> i <b>B(${cx(B[0])}, ${cx(B[1])})</b>?`,fig:lv<2?grid(-5,5,[{l:'A',x:A[0],y:A[1]},{l:'B',x:B[0],y:B[1],c:C.b}]):null,
   fields:[{label:'Distància (quadres)',ans:R(d)}],
   hints:[`Els dos punts tenen la mateixa ${hor?'y':'x'}: són a la mateixa línia ${hor?'horitzontal':'vertical'}.`,`Compara les ${hor?'x':'y'}: ${cx(p)} i ${cx(q)}. Si una és negativa i l'altra positiva, has de passar pel 0.`],
   steps:[`Tenen la mateixa ${hor?'y':'x'} (${cx(f)}), per tant només canvia la ${hor?'x':'y'}.`,(p>0)!==(q>0)?`De ${cx(p)} a 0 hi ha ${Math.abs(p)} i de 0 a ${cx(q)} hi ha ${Math.abs(q)}: ${Math.abs(p)} + ${Math.abs(q)} = ${d}.`:`De ${cx(p)} a ${cx(q)} hi ha ${d} quadres.`,`Distància: <b>${d} quadres</b>.`],
   err:x=>(p>0)!==(q>0)&&val(x[0])===Math.abs(Math.abs(p)-Math.abs(q))?'mt_enters_diferencia':null}}},

/* ---------- Tema 8. Bisectriu d'un angle i mediatriu d'un segment ---------- */
mt_bisectriu:{mat:'mates',nom:'Bisectriu i mediatriu',ab:'Bm',curs:[6],
 teoria:['La <b>bisectriu</b> d\'un angle és la semirecta que surt del vèrtex i el divideix en <b>dos angles iguals</b>. La bisectriu d\'un angle de 80° el parteix en dos de 40°.',
  'Cada punt de la bisectriu és a la mateixa distància dels dos costats de l\'angle.',
  'La <b>mediatriu</b> d\'un segment és la recta <b>perpendicular</b> al segment (forma 90°) que passa pel seu <b>punt mitjà</b>. El parteix en dos trossos iguals.',
  'Cada punt de la mediatriu és a la <b>mateixa distància</b> dels dos extrems del segment.',
  'Totes dues es poden dibuixar amb regle i compàs, o amb el transportador i el regle.'],
 fig:()=>bisFig(70,'bisectriu (blava)')+medFig('',true),
 gen(lv){const t=lv===0?pick([0,0,2]):lv===1?pick([0,1,2,3]):pick([0,1,2,3]);
  if(t===0){const odd=lv===2&&Math.random()<.6;let d;do{d=rnd(20,178)}while(odd?d%2===0:d%2);const g=Math.floor(d/2),m=odd?30:0;
   return{text:`Traçam la <b>bisectriu</b> d'un angle de <b>${d}°</b>. Quant mesura cadascun dels dos angles que surten?`,fig:bisFig(d,`${d}°`),
    fields:odd?[{label:'Graus',ans:R(g)},{label:'Minuts',ans:R(m)}]:[{label:'Graus',ans:R(g)}],
    hints:['La bisectriu parteix l\'angle en dues parts iguals.',odd?`Divideix ${d}° entre 2. Si sobra 1°, recorda que 1° = 60'.`:`Divideix ${d}° entre 2.`],
    steps:['Les dues parts són iguals: dividim entre 2.',odd?`${d}° : 2 = ${g}° i sobra 1° = 60'. 60' : 2 = 30'.`:`${d}° : 2 = ${g}°.`,`Cada angle mesura <b>${g}°${odd?" 30'":''}</b>.`],
    err:x=>val(x[0])===2*d?'mt_bis_meitat':null}}
  if(t===1){const h=rnd(12,85);
   return{text:`La bisectriu d'un angle el divideix en dos angles de <b>${h}°</b>. Quant mesura l'angle sencer? Com s'anomena aquest tipus d'angle (agut, recte o obtús)?`,fig:null,
    fields:[{label:'Graus',ans:R(2*h)},MT.fTxt('Tipus d\'angle',[2*h<90?'agut':2*h===90?'recte':'obtús',2*h<90?'agut':2*h===90?'recte':'obtus'])],
    hints:['Les dues parts són iguals. L\'angle sencer és la suma de totes dues.','Agut: menys de 90°. Recte: 90°. Obtús: entre 90° i 180°.'],
    steps:[`Angle sencer: ${h}° + ${h}° = ${2*h}°.`,`${2*h}° ${2*h<90?'és menys de 90°':2*h===90?'és 90°':'és entre 90° i 180°'}.`,`Mesura <b>${2*h}°</b> i és <b>${2*h<90?'agut':2*h===90?'recte':'obtús'}</b>.`],
    err:x=>{const y=val(x[0]);return y===h||Math.abs(y-h/2)<1?'mt_bis_meitat':null}}}
  if(t===2){const s=lv===2?rnd(31,199):2*rnd(3,15),Lc=lv===2?s/10:s;
   return{text:`El segment AB fa <b>${dc(Lc)} cm</b>. Traçam la seva <b>mediatriu</b>, que talla el segment al punt M. Quant fa el tros AM?`,fig:medFig('?'),
    fields:[fDec('AM (cm)',Lc/2)],
    hints:['La mediatriu passa pel punt mitjà del segment.','El tros AM és la meitat de tot el segment.'],
    steps:['M és el punt mitjà: AM i MB són iguals.',`${dc(Lc)} : 2 = ${dc(Lc/2)}.`,`AM fa <b>${dc(Lc/2)} cm</b>.`],
    err:x=>near(val(x[0]),Lc)||near(val(x[0]),Lc*2)?'mt_med_meitat':null}}
  const pa=rnd(4,15),ab=rnd(3,2*pa-1);
  return{text:`El punt P és a la <b>mediatriu</b> del segment AB, que fa ${ab} cm. La distància de P a A és de <b>${pa} cm</b>. Quina és la distància de P a B? Quants graus forma la mediatriu amb el segment?`,fig:medFig('',true),
   fields:[{label:'PB (cm)',ans:R(pa)},{label:'Angle (graus)',ans:R(90)}],
   hints:['Recorda què tenen d\'especial els punts de la mediatriu respecte dels extrems del segment.','La mediatriu és perpendicular al segment.'],
   steps:['Tots els punts de la mediatriu són a la mateixa distància d\'A i de B.',`Per tant PB = PA = ${pa} cm.`,'La mediatriu és perpendicular al segment: forma un angle de <b>90°</b>.'],
   err:x=>near(val(x[0]),ab/2)?'mt_med_meitat':null}}},

/* ---------- Tema 12. Variables i freqüències ---------- */
mt_frequencies:{mat:'mates',nom:'Variables i freqüències',ab:'Fq',curs:[6],
 teoria:['En estadística, el que estudiam és una <b>variable</b>. Pot ser <b>qualitativa</b> (no és un nombre: el color preferit, l\'esport) o <b>quantitativa</b> (és un nombre: l\'edat, el nombre de germans).',
  'La <b>freqüència absoluta</b> d\'una dada és el nombre de vegades que surt. Si 6 alumnes de 20 prefereixen el bàsquet, la freqüència absoluta del bàsquet és <b>6</b>.',
  `La <b>freqüència relativa</b> és la freqüència absoluta dividida entre el total de dades: ${F(6,20)} = ${F(3,10)} = 0,3. Si la multiplicam per 100 tenim el <b>percentatge</b>: 30 %.`,
  'La suma de totes les freqüències absolutes és el total de dades, i la suma de les relatives és 1.'],
 gen(lv){const CT=[['Hem preguntat a {n} alumnes quin és el seu esport preferit',['futbol','bàsquet','natació','handbol']],['Hem preguntat a {n} persones quin és el seu color preferit',['blau','vermell','verd','groc']],['Hem anotat la fruita que han duit per berenar {n} alumnes',['poma','plàtan','pera','taronja']],['Hem preguntat a {n} alumnes quants germans tenen',['0','1','2','3']]];
  const t=lv===0?pick([0,0,1]):lv===1?pick([0,1,1,3]):pick([1,2,3]),n=lv===0?pick([10,12,15]):lv===1?pick([12,15,20,25]):pick([20,25,50]),[ct0,cats]=pick(CT),ct=ct0.replace('{n}',n);
  let f;do{f=cats.map(()=>1);for(let i=cats.length;i<n;i++)f[rnd(0,cats.length-1)]++}while(new Set(f).size<3);
  const tab=(miss)=>taula(['Dada','Freqüència absoluta'],cats.map((cc,i)=>[cc,i===miss?'<b style="color:#EF4E5A">?</b>':f[i]]).concat([['<b>Total</b>',`<b>${n}</b>`]])),k=rnd(0,cats.length-1),c=cats[k];
  if(t===0){const data=MT.shuf(cats.flatMap((cc,i)=>Array(f[i]).fill(cc)));
   return{text:`${ct}:<br><span style="font-size:.95em">${data.join(', ')}</span><br>Quina és la <b>freqüència absoluta</b> de «${c}»?`,fields:[fInt('Freqüència absoluta',f[k])],
    hints:[`Compta quantes vegades surt «${c}».`,'Pots ratllar cada dada quan la comptis per no comptar-la dues vegades.'],
    steps:[`Comptam: ${cats.map((cc,i)=>`${cc} → ${f[i]}`).join(', ')}.`,`Comprovació: ${f.join(' + ')} = ${n} dades.`,`La freqüència absoluta de «${c}» és <b>${f[k]}</b>.`]}}
  if(t===3){return{text:`${ct}. La taula mostra el recompte, però s'ha esborrat una dada. Quina és la freqüència absoluta que falta?`,fig:tab(k),fields:[fInt('Freqüència absoluta',f[k])],
    hints:[`La suma de totes les freqüències absolutes ha de ser ${n}.`,'Suma les que coneixes i mira quant falta fins al total.'],
    steps:[`Sumam les conegudes: ${f.filter((_,i)=>i!==k).join(' + ')} = ${n-f[k]}.`,`${n} − ${n-f[k]} = ${f[k]}.`,`Falta <b>${f[k]}</b>.`],
    err:x=>n-f[k]!==f[k]&&val(x[0])===n-f[k]?'mt_freq_total':null}}
  const pc=t===2;
  return{text:`${ct}. Aquest és el recompte:`+tab(-1)+(pc?`Quin <b>percentatge</b> de les dades és «${c}»?`:`Quina és la <b>freqüència relativa</b> de «${c}»? (fracció o decimal)`),
   fields:[pc?{label:'Percentatge (%)',ans:R(f[k]*100/n)}:{label:'Freqüència relativa',ans:R(f[k],n)}],
   hints:[`Quantes vegades surt «${c}»? I quantes dades hi ha en total?`,pc?`Calcula ${f[k]} : ${n} i multiplica per 100.`:`Divideix ${f[k]} entre ${n} (ho pots escriure en forma de fracció).`],
   steps:[`Freqüència absoluta de «${c}»: ${f[k]}. Total: ${f.join(' + ')} = ${n}.`,`Freqüència relativa: ${F(f[k],n)}${fr(f[k],n)!==`${f[k]}/${n}`?` = ${fr(f[k],n)}`:''} = ${dc(f[k]/n)}.`,pc?`Percentatge: ${dc(f[k]/n)} × 100 = <b>${dc(f[k]*100/n)} %</b>.`:`La freqüència relativa és <b>${fr(f[k],n)}</b> (${dc(f[k]/n)}).`],
   err:x=>val(x[0])===f[k]&&f[k]!==f[k]*100/n?'mt_freq_rel':(pc&&near(val(x[0]),f[k]/n)?'mt_freq_rel':null)}}}
});
})();
