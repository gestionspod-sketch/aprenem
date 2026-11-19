/* Aprenem - MATEMÀTIQUES 6è: mesura (longitud, massa, capacitat, superfície, volum, temps) i angles
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. Fonts: vegeu contingut/matematiques.js. */
(()=>{
const {num,dc,fInt,fDec,fTxt,val,eq,near,fo,svg,tx,ln,pts,C,taula,regPts}=MT;
// Conversió entre unitats d'una escala (base 10, 100 o 1000 per graó). Retorna valors exactes.
function conv(n,base,maxStep,lv,ok=()=>true){for(let g=0;g<800;g++){const i=rnd(0,n-1),j=rnd(0,n-1),s=Math.abs(j-i);if(!s||s>maxStep||!ok(i,j))continue;
 const dp=lv===0?0:rnd(0,2),a=rnd(lv?11:1,lv?9999:999);if(dp&&a%10===0)continue;
 const nu=a*(j>i?base**s:1),de=10**dp*(j<i?base**s:1),v=nu/de;
 if(v<0.001||v>=1e6||Math.abs(v*1000-Math.round(v*1000))>1e-6||v>=1000&&!Number.isInteger(v))continue;
 return{i,j,s,a,dp,v,x:a/10**dp,ans:R(nu,de)}}}
const fConv=(label,c)=>Number.isInteger(c.v)&&c.v>=1000?fInt(label,c.v):{label,ans:c.ans};
const escala=(us,f)=>`<div class="tablewrap"><table class="mini"><tr>${us.map(u=>`<th>${u}</th>`).join('')}</tr><tr>${us.map((u,i)=>`<td style="text-align:center;font-size:13px;color:#4A5468">${i<us.length-1?`× ${f} →`:''}</td>`).join('')}</tr></table></div><p class="muted" style="margin:6px 0 0;font-size:15px">Cap a la dreta (unitat més petita): multiplicam per ${f}. Cap a l'esquerra: dividim per ${f}.</p>`;
const hm=(h,m)=>`${h}:${String(m).padStart(2,'0')}`;

Object.assign(ERR,{
 mt_unitats_salt:{kid:'Gairebé! Compta bé els graons de l\'escala d\'unitats: t\'has descomptat d\'un.',par:'Compta malament els graons en canviar d\'unitat'},
 mt_unitats_sentit:{kid:'Has anat en sentit contrari. Si passes a una unitat més petita, el nombre es fa més gran (multiplica).',par:'Multiplica quan ha de dividir (o al revés) en canviar d\'unitat'},
 mt_sup_10:{kid:'Compte! A les unitats de superfície (m², cm²...) cada graó és × 100, no × 10.',par:'Fa servir 10 en lloc de 100 en les unitats de superfície'},
 mt_vol_1000:{kid:'Compte! A les unitats de volum (m³, dm³, cm³) cada graó és × 1.000.',par:'No fa servir 1.000 en les unitats de volum'},
 mt_vol_litre:{kid:'Recorda: 1 dm³ = 1 litre i 1 cm³ = 1 ml. Són la mateixa quantitat.',par:'No relaciona volum i capacitat (1 dm³ = 1 l)'},
 mt_temps_100:{kid:'Una hora no són 100 minuts: són 60! I 1 minut són 60 segons.',par:'Pensa el temps en base 10 (1 h = 100 min)'},
 mt_sexag_60:{kid:'Tens 60 minuts o més: els has de convertir. 60 minuts fan 1 hora (o 1 grau).',par:'No passa els minuts a hores (o graus) quan arriben a 60'},
 mt_sexag_resta:{kid:'Si els minuts de dalt són menys que els de baix, has de canviar 1 hora (o 1 grau) per 60 minuts abans de restar.',par:'Resta els minuts al revés quan no n\'hi ha prou'},
 mt_comp_supl:{kid:'Has calculat l\'altre! Complementaris sumen 90° (un angle recte) i suplementaris sumen 180° (un angle pla).',par:'Confon angles complementaris i suplementaris'},
 mt_tipus_angle:{kid:'Revisa: agut és menys de 90°, recte és 90°, obtús és entre 90° i 180°, i pla és 180°.',par:'Confon els tipus d\'angles'},
 mt_triangle_180:{kid:'Els tres angles d\'un triangle sumen 180°, no 360°.',par:'Pensa que els angles d\'un triangle sumen 360°'},
 mt_triangle_recte:{kid:'No t\'oblidis de l\'angle recte! En un triangle rectangle un angle ja fa 90°.',par:'Oblida l\'angle recte en un triangle rectangle'},
 mt_quadr_360:{kid:'Els quatre angles d\'un quadrilàter sumen 360°.',par:'No sap que els angles d\'un quadrilàter sumen 360°'},
 mt_suma_poligon:{kid:'La suma dels angles d\'un polígon és (nombre de costats − 2) × 180°. Pots dividir-lo en triangles!',par:'Calcula malament la suma dels angles d\'un polígon'},
 mt_angle_central:{kid:'Aquest és l\'angle central (360° : n). L\'angle interior és la suma dels angles dividida entre els costats.',par:'Confon l\'angle interior amb l\'angle central d\'un polígon regular'}
});

/* ---------- dibuixos d'angles ---------- */
function angFig(deg,lab){const cx=deg>90?175:80,cy=150,L=120,r=36,rd=deg*Math.PI/180,x2=cx+L*Math.cos(rd),y2=cy-L*Math.sin(rd);
 let g=ln(cx,cy,cx+L+25,cy,{w:3})+ln(cx,cy,x2,y2,{w:3});
 if(deg===90)g+=`<path d="M${cx} ${cy} H${cx+24} V${cy-24} H${cx}Z" fill="${C.ol}" stroke="${C.o}" stroke-width="2.5"/>`;
 else g=`<path d="M${cx} ${cy} L${cx+r} ${cy} A${r} ${r} 0 0 0 ${(cx+r*Math.cos(rd)).toFixed(1)} ${(cy-r*Math.sin(rd)).toFixed(1)}Z" fill="${C.ol}" stroke="${C.o}" stroke-width="2.5"/>`+g;
 g+=`<circle cx="${cx}" cy="${cy}" r="4" fill="${C.t}"/>`;if(lab)g+=tx(cx+64*Math.cos(rd/2),cy-64*Math.sin(rd/2),lab,{fs:17,c:C.b});
 return svg(340,170,g,300)}
function lineFig(a,tot){ // angle pla (180) o recte (90) dividit en dos
 const cx=tot===180?170:80,cy=150,L=125,rd=a*Math.PI/180,rt=tot*Math.PI/180;
 let g=ln(cx,cy,cx+L+20,cy,{w:3})+ln(cx,cy,cx+L*Math.cos(rt),cy-L*Math.sin(rt),{w:3})+ln(cx,cy,cx+L*Math.cos(rd),cy-L*Math.sin(rd),{w:3,c:C.b});
 g+=`<circle cx="${cx}" cy="${cy}" r="4" fill="${C.t}"/>`+tx(cx+62*Math.cos(rd/2),cy-62*Math.sin(rd/2),`${a}°`,{fs:16})+tx(cx+62*Math.cos((rd+rt)/2),cy-62*Math.sin((rd+rt)/2),'?',{fs:20,c:C.r});
 if(tot===90)g+=`<path d="M${cx} ${cy-14} H${cx+14} V${cy}" fill="none" stroke="${C.g}" stroke-width="1.5"/>`;
 return svg(340,170,g,300)}
function triFig(A,B){const Cc=180-A-B,s=x=>Math.sin(x*Math.PI/180),ac=s(B)/s(Cc),P=[[0,0],[1,0],[ac*Math.cos(A*Math.PI/180),ac*s(A)]];
 const xs=P.map(p=>p[0]),mnx=Math.min(...xs),mxx=Math.max(...xs),mxy=Math.max(...P.map(p=>p[1])),k=Math.min(250/(mxx-mnx),140/mxy),Q=P.map(([x,y])=>[45+(x-mnx)*k,170-y*k]);
 const gx=(Q[0][0]+Q[1][0]+Q[2][0])/3,gy=(Q[0][1]+Q[1][1]+Q[2][1])/3,lb=(p,t,c)=>{const dx=gx-p[0],dy=gy-p[1],d=Math.hypot(dx,dy)||1;return tx(p[0]+dx/d*30,p[1]+dy/d*30,t,{fs:15,c})};
 return svg(340,190,`<polygon points="${pts(Q)}" fill="${C.bl}" stroke="${C.b}" stroke-width="3"/>`+lb(Q[0],`${A}°`)+lb(Q[1],`${B}°`)+lb(Q[2],'?',C.r),300)}

Object.assign(SK,{
/* ---------- Mesura ---------- */
mt_mesures:{mat:'mates',nom:'Longitud, massa i capacitat',ab:'Lm',curs:[6],
 teoria:['Les unitats de <b>longitud</b> (metre), <b>massa</b> (gram) i <b>capacitat</b> (litre) segueixen la mateixa escala: cada unitat és 10 vegades més gran que la de la seva dreta.',
  'Prefixos: <b>kilo</b> (× 1.000), <b>hecto</b> (× 100), <b>deca</b> (× 10), unitat, <b>deci</b> (: 10), <b>centi</b> (: 100), <b>mil·li</b> (: 1.000).',
  'Per passar a una unitat <b>més petita</b>, multiplicam per 10 a cada graó (correm la coma cap a la dreta). Per passar a una unitat <b>més gran</b>, dividim (correm la coma cap a l\'esquerra).',
  'Exemple: 3,5 km → m: 3 graons cap avall → × 1.000 → 3.500 m. També: 1 tona (t) = 1.000 kg.'],
 fig:()=>escala(['km','hm','dam','m','dm','cm','mm'],10)+escala(['kg','hg','dag','g','dg','cg','mg'],10)+escala(['kl','hl','dal','l','dl','cl','ml'],10),
 gen(lv){const M=pick([['km','hm','dam','m','dm','cm','mm'],['kg','hg','dag','g','dg','cg','mg'],['kl','hl','dal','l','dl','cl','ml']]);
  if(lv===2&&Math.random()<.35){const i=rnd(0,3),k=Math.min(6,i+pick([2,3])),q1=rnd(1,9),q2=rnd(1,10**(k-i)-1),v=q1*10**(k-i)+q2;
   return{text:`Expressa en <b>${M[k]}</b>:<br>${q1} ${M[i]} ${q2} ${M[k]}`,fields:[fInt(`Resultat (${M[k]})`,v)],
    hints:[`Passa primer ${q1} ${M[i]} a ${M[k]}.`,`De ${M[i]} a ${M[k]} hi ha ${k-i} graons: × ${num(10**(k-i))}. Després suma-hi els ${q2} ${M[k]}.`],
    steps:[`${q1} ${M[i]} = ${q1} × ${num(10**(k-i))} = ${num(q1*10**(k-i))} ${M[k]}.`,`Sumam: ${num(q1*10**(k-i))} + ${q2} = ${num(v)}.`,`Resultat: <b>${num(v)} ${M[k]}</b>.`],
    err:x=>{const y=val(x[0]);return y===q1+q2?'mt_unitats_salt':null}}}
  const c=conv(7,10,lv===0?3:6,lv),{i,j,s,v,x}=c,f=10**s;
  return{text:`Expressa en <b>${M[j]}</b>:<br>${dc(x)} ${M[i]} = ? ${M[j]}`,fields:[fConv(`Resultat (${M[j]})`,c)],
   hints:[`Mira l'escala: de ${M[i]} a ${M[j]} hi ha ${s} graó${s>1?'ns':''} cap a ${j>i?'la dreta':'l\'esquerra'}.`,`Has de ${j>i?'multiplicar':'dividir'} per ${num(f)}.`],
   steps:[`De ${M[i]} a ${M[j]} hi ha ${s} graó${s>1?'ns':''} cap a ${j>i?'una unitat més petita':'una unitat més gran'}.`,`${j>i?'Multiplicam':'Dividim'} per ${num(f)}: correm la coma ${s} llocs cap a la ${j>i?'dreta':'esquerra'}.`,`${dc(x)} ${M[i]} = <b>${dc(v)} ${M[j]}</b>.`],
   err:x2=>{const y=val(x2[0]);if(near(y,v*10)||near(y,v/10))return'mt_unitats_salt';if(near(y,j>i?x/f:x*f))return'mt_unitats_sentit';return null}}}},
mt_superficie:{mat:'mates',nom:'Unitats de superfície',ab:'Sf',curs:[6],
 teoria:['La <b>superfície</b> es mesura en unitats quadrades. El <b>metre quadrat</b> (m²) és un quadrat d\'1 m de costat.',
  'Unitats: km², hm², dam², <b>m²</b>, dm², cm², mm². Cada unitat és <b>100 vegades</b> més gran que la de la seva dreta (un quadrat de 10 × 10).',
  'Per passar a una unitat més petita, multiplicam per <b>100</b> a cada graó (correm la coma 2 llocs). Per passar a una de més gran, dividim per 100.',
  'Per als camps feim servir les <b>unitats agràries</b>: 1 hectàrea (ha) = 1 hm² = 10.000 m²; 1 àrea (a) = 1 dam² = 100 m²; 1 centiàrea (ca) = 1 m².'],
 fig:()=>escala(['km²','hm²','dam²','m²','dm²','cm²','mm²'],100),
 gen(lv){const SU=['km²','hm²','dam²','m²','dm²','cm²','mm²'],AG={1:'ha',2:'a',3:'ca'},agr=lv===2&&Math.random()<.5;
  const c=conv(7,100,lv===0?1:agr?2:3,lv,agr?(i=>i>=1&&i<=3):undefined),{i,j,s,v,x}=c,f=100**s,ui=agr?AG[i]:SU[i];
  return{text:`Expressa en <b>${SU[j]}</b>:<br>${dc(x)} ${ui} = ? ${SU[j]}`,fields:[fConv(`Resultat (${SU[j]})`,c)],
   hints:[agr?`Recorda: ${ui} = ${SU[i]}.`:`De ${SU[i]} a ${SU[j]} hi ha ${s} graó${s>1?'ns':''}.`,`Cada graó de superfície és × 100. Has de ${j>i?'multiplicar':'dividir'} per ${num(f)}.`],
   steps:[agr?`${ui} és el mateix que ${SU[i]}. De ${SU[i]} a ${SU[j]} hi ha ${s} graó${s>1?'ns':''}.`:`De ${SU[i]} a ${SU[j]} hi ha ${s} graó${s>1?'ns':''}.`,`${j>i?'Multiplicam':'Dividim'} per ${num(f)} (correm la coma ${2*s} llocs cap a la ${j>i?'dreta':'esquerra'}).`,`${dc(x)} ${ui} = <b>${dc(v)} ${SU[j]}</b>.`],
   err:x2=>{const y=val(x2[0]),v10=j>i?x*10**s:x/10**s;if(!near(v10,v)&&near(y,v10))return'mt_sup_10';if(near(y,j>i?x/f:x*f))return'mt_unitats_sentit';return null}}}},
mt_volum_unitats:{mat:'mates',nom:'Unitats de volum i capacitat',ab:'Vu',curs:[6],
 teoria:['El <b>volum</b> és l\'espai que ocupa un cos. Es mesura en unitats cúbiques: el <b>metre cúbic</b> (m³) és un cub d\'1 m d\'aresta.',
  'Unitats: <b>m³</b>, dm³, cm³, mm³. Cada unitat és <b>1.000 vegades</b> més gran que la de la seva dreta (un cub de 10 × 10 × 10). Correm la coma 3 llocs a cada graó.',
  'Volum i capacitat estan relacionats: <b>1 dm³ = 1 litre</b>, <b>1 cm³ = 1 ml</b> i <b>1 m³ = 1.000 litres</b>.'],
 fig:()=>escala(['m³','dm³','cm³','mm³'],'1.000')+taula(['Volum','Capacitat'],[['1 m³','1.000 l'],['1 dm³','1 l'],['1 cm³','1 ml']]),
 gen(lv){
  if(Math.random()<.45){const REL=[['m³','litres',1000],['dm³','litres',1],['cm³','ml',1],['litres','cm³',1000],['dm³','ml',1000],['litres','dm³',1],['ml','cm³',1]];
   const[a,b,f]=pick(REL);let q;do{q=lv===0?rnd(1,20):rnd(11,250)/10}while(Number.isInteger(q)&&lv>0&&Math.random()<.5);const v=Math.round(q*f*1000)/1000;
   const ctx=a==='m³'?`Una piscina petita té un volum de ${dc(q)} m³. Quants litres d'aigua hi caben?`:`Expressa ${dc(q)} ${a} en ${b}.`;
   return{text:ctx,fields:[fDec(`Resultat (${b})`,v)],
    hints:['Recorda: 1 dm³ = 1 litre, 1 cm³ = 1 ml i 1 m³ = 1.000 litres.',f===1?`${a} i ${b} són la mateixa quantitat.`:`Has de multiplicar per ${num(f)}.`],
    steps:[a==='m³'?'1 m³ = 1.000 litres.':a==='litres'&&b==='cm³'?'1 litre = 1 dm³ = 1.000 cm³.':a==='dm³'&&b==='ml'?'1 dm³ = 1 litre = 1.000 ml.':`1 ${a.replace('litres','litre')} = 1 ${b.replace('litres','litre')}.`,f===1?`Per tant, ${dc(q)} ${a} = ${dc(v)} ${b}.`:`${dc(q)} × ${num(f)} = ${dc(v)}.`,`Resultat: <b>${dc(v)} ${b}</b>.`],
    err:x=>{const y=val(x[0]);if(f===1000&&(near(y,q*100)||near(y,q*10)))return'mt_vol_1000';if(f===1&&(near(y,q*1000)||near(y,q/1000)))return'mt_vol_litre';return null}}}
  const VU=['m³','dm³','cm³','mm³'],c=conv(lv===2?4:3,1000,lv===0?1:2,lv),{i,j,s,v,x}=c,f=1000**s;
  return{text:`Expressa en <b>${VU[j]}</b>:<br>${dc(x)} ${VU[i]} = ? ${VU[j]}`,fields:[fConv(`Resultat (${VU[j]})`,c)],
   hints:[`De ${VU[i]} a ${VU[j]} hi ha ${s} graó${s>1?'ns':''}.`,`Cada graó de volum és × 1.000. Has de ${j>i?'multiplicar':'dividir'} per ${num(f)}.`],
   steps:[`De ${VU[i]} a ${VU[j]} hi ha ${s} graó${s>1?'ns':''}.`,`${j>i?'Multiplicam':'Dividim'} per ${num(f)} (correm la coma ${3*s} llocs cap a la ${j>i?'dreta':'esquerra'}).`,`${dc(x)} ${VU[i]} = <b>${dc(v)} ${VU[j]}</b>.`],
   err:x2=>{const y=val(x2[0]),w=k=>j>i?x*k**s:x/k**s;if(near(y,w(10))||near(y,w(100)))return'mt_vol_1000';if(near(y,j>i?x/f:x*f))return'mt_unitats_sentit';return null}}}},
mt_temps:{mat:'mates',nom:'El temps: hores, minuts i segons',ab:'Tm',curs:[6],
 teoria:['El temps es compta en <b>sistema sexagesimal</b>: 1 hora = <b>60 minuts</b> i 1 minut = <b>60 segons</b>. Per tant, 1 hora = 3.600 segons.',
  'Passar d\'hores a minuts: multiplicam per 60. 2 h 15 min = 2 × 60 + 15 = 135 min.',
  'Passar de minuts a hores: dividim entre 60. 135 min → 135 : 60 = 2 i sobren 15 → 2 h 15 min.',
  'Quan sumam temps i els minuts arriben a 60 o més, passam 60 minuts a 1 hora. Quan restam i no hi ha prou minuts, canviam 1 hora per 60 minuts.'],
 gen(lv){const t=lv===0?pick([0,1,2]):lv===1?pick([0,1,2,3]):pick([0,2,3,4]),HM=[{label:'Hores',ans:null},{label:'Minuts',ans:null}];
  const two=(h,m)=>[{label:'Hores',ans:R(h)},{label:'Minuts',ans:R(m)}],m60=x=>val(x[1])>=60?'mt_sexag_60':null;
  if(t===0){const h=rnd(1,lv?9:4),m=rnd(5,55),v=h*60+m;
   return{text:`Quants <b>minuts</b> són ${h} h ${m} min?`,fields:[fInt('Minuts',v)],
    hints:['Quants minuts té una hora?',`Passa les ${h} hores a minuts i després suma-hi els ${m} minuts.`],
    steps:[`${h} h = ${h} × 60 = ${h*60} min.`,`${h*60} + ${m} = ${v}.`,`Són <b>${v} minuts</b>.`],
    err:x=>val(x[0])===h*100+m?'mt_temps_100':null}}
  if(t===1){let T;do{T=rnd(70,lv?600:300)}while(T%60===0);const h=Math.floor(T/60),m=T%60;
   return{text:`Quantes <b>hores i minuts</b> són ${T} minuts?`,fields:two(h,m),
    hints:['Quants grups de 60 minuts hi caben? Cada grup és una hora.',`Divideix ${T} : 60.`],
    steps:[`${T} : 60 = ${h} i sobren ${m}.`,`${h} grups de 60 minuts són ${h} hores.`,`${T} min = <b>${h} h ${m} min</b>.`],
    err:x=>m60(x)||(val(x[0])===Math.floor(T/100)&&val(x[1])===T%100?'mt_temps_100':null)}}
  if(t===2){let h1,m1,dh,dm,e;do{h1=rnd(8,19);m1=rnd(1,11)*5;dh=rnd(0,3);dm=rnd(2,11)*5;e=h1*60+m1+dh*60+dm}while(e>=24*60||(m1+dm<60&&Math.random()<.7));
   const h=Math.floor(e/60),m=e%60,what=pick([['Una pel·lícula comença','dura','acaba'],['Un tren surt','tarda','arriba'],['Una excursió comença','dura','acaba']]);
   return{text:`${what[0]} a les <b>${hm(h1,m1)}</b> i ${what[1]} <b>${dh?`${dh} h `:''}${dm} min</b>. A quina hora ${what[2]}?`,fields:two(h,m),
    hints:['Suma les hores amb les hores i els minuts amb els minuts.','Si els minuts arriben a 60 o més, passa 60 minuts a 1 hora.'],
    steps:[`Sumam: ${h1} h + ${dh} h = ${h1+dh} h i ${m1} min + ${dm} min = ${m1+dm} min.`,m1+dm>=60?`${m1+dm} min = 1 h ${m1+dm-60} min. Ho afegim: ${h1+dh} h + 1 h = ${h} h.`:'Els minuts no arriben a 60: no cal canviar res.',`${what[2][0].toUpperCase()+what[2].slice(1)} a les <b>${hm(h,m)}</b>.`],
    err:m60}}
  if(t===3){let h1,m1,h2,m2;do{h1=rnd(7,15);m1=rnd(1,11)*5;h2=h1+rnd(1,5);m2=rnd(0,11)*5}while(h2>23||(m2>=m1&&Math.random()<.7));
   const d=h2*60+m2-(h1*60+m1),h=Math.floor(d/60),m=d%60;
   return{text:`Un viatge surt a les <b>${hm(h1,m1)}</b> i arriba a les <b>${hm(h2,m2)}</b>. Quant dura?`,fields:two(h,m),
    hints:['Resta l\'hora d\'arribada menys l\'hora de sortida.',m2<m1?`${m2} minuts no basten per restar-ne ${m1}: canvia 1 hora per 60 minuts.`:'Resta les hores amb les hores i els minuts amb els minuts.'],
    steps:[m2<m1?`Com que ${m2} < ${m1}, canviam 1 hora per 60 minuts: ${hm(h2,m2)} = ${h2-1} h ${m2+60} min.`:`Restam per separat.`,`Minuts: ${m2<m1?m2+60:m2} − ${m1} = ${m}. Hores: ${m2<m1?h2-1:h2} − ${h1} = ${h}.`,`Dura <b>${h} h ${m} min</b>.`],
    err:x=>m60(x)||(m2<m1&&val(x[0])===h2-h1&&val(x[1])===m1-m2?'mt_sexag_resta':null)}}
  const h=rnd(1,3),m=rnd(1,59),s=rnd(1,59),v=h*3600+m*60+s;
  return{text:`Quants <b>segons</b> són ${h} h ${m} min ${s} s?`,fields:[fInt('Segons',v)],
   hints:['1 hora = 60 minuts i 1 minut = 60 segons. Quants segons té una hora?',`1 h = 3.600 s. Passa cada part a segons i suma.`],
   steps:[`${h} h = ${h} × 3.600 = ${num(h*3600)} s. ${m} min = ${m} × 60 = ${m*60} s.`,`${num(h*3600)} + ${m*60} + ${s} = ${num(v)}.`,`Són <b>${num(v)} segons</b>.`],
   err:x=>val(x[0])===h*10000+m*100+s?'mt_temps_100':null}}},

/* ---------- Angles ---------- */
mt_angles:{mat:'mates',nom:'Angles: tipus i mesura',ab:'An',curs:[6],
 teoria:['Un <b>angle</b> és la part del pla entre dues semirectes que surten d\'un mateix punt (el <b>vèrtex</b>). Es mesura en <b>graus</b> (°) amb el transportador.',
  'Tipus: <b>agut</b> (menys de 90°), <b>recte</b> (90°), <b>obtús</b> (entre 90° i 180°) i <b>pla</b> (180°). Una volta completa fa 360°.',
  'Dos angles són <b>complementaris</b> si sumen 90° i <b>suplementaris</b> si sumen 180°. El complementari de 35° és 55°; el suplementari, 145°.',
  'Els graus també es divideixen en <b>minuts</b>: 1° = 60\'. Com amb les hores, quan arribam a 60\' passam a 1°.'],
 fig:()=>angFig(50,'agut')+angFig(130,'obtús'),
 gen(lv){const t=lv===0?pick([0,0,1]):lv===1?pick([0,1,2,3]):pick([0,2,2,3]);
  if(t===0){const cp=Math.random()<.5,a=cp?rnd(5,85):rnd(5,175),v=(cp?90:180)-a;
   return{text:`Quant mesura el <b>${cp?'complementari':'suplementari'}</b> d'un angle de ${a}°?`,fig:lv===0?angFig(a,`${a}°`):null,fields:[{label:'Graus',ans:R(v)}],
    hints:[cp?'Els angles complementaris sumen un angle recte. Quants graus és?':'Els angles suplementaris sumen un angle pla. Quants graus és?',`Calcula quant falta de ${a}° fins a ${cp?90:180}°.`],
    steps:[cp?'Complementaris: sumen 90°.':'Suplementaris: sumen 180°.',`${cp?90:180}° − ${a}° = ${v}°.`,`Mesura <b>${v}°</b>.`],
    err:x=>{const y=val(x[0]);return y===(cp?180:90)-a?'mt_comp_supl':null}}}
  if(t===1){const ty=pick(['agut','recte','obtús','pla']),d=ty==='agut'?rnd(15,80):ty==='recte'?90:ty==='obtús'?rnd(100,170):180,NM=['agut','recte','obtús','pla'];
   return{text:`Aquest angle mesura <b>${d}°</b>. Com s'anomena aquest tipus d'angle?`,fig:angFig(d,`${d}°`),fields:[fTxt('Tipus d\'angle',[ty,fo(ty)])],
    hints:['Compara\'l amb l\'angle recte (90°) i amb l\'angle pla (180°).',d<90?'És més petit que un angle recte.':d===90?'És exactament la cantonada d\'un quadrat.':d<180?'És més gran que un recte, però més petit que un pla.':'Les dues semirectes formen una línia recta.'],
    steps:['Agut < 90° · Recte = 90° · 90° < Obtús < 180° · Pla = 180°.',`${d}° ${d<90?'és menys de 90°':d===90?'és 90°':d<180?'és entre 90° i 180°':'és 180°'}.`,`És un angle <b>${ty}</b>.`],
    err:x=>NM.some(n=>n!==ty&&fo(n)===fo(x[0]))?'mt_tipus_angle':null}}
  if(t===2){const sum=Math.random()<.5;let a1,m1,a2,m2;do{a1=rnd(15,120);m1=rnd(5,55);a2=rnd(10,70);m2=rnd(5,55)}while(sum?(m1+m2<60&&Math.random()<.7)||a1+a2>179:(a1*60+m1<=a2*60+m2)||(m1>=m2&&Math.random()<.7));
   const tot=sum?a1*60+m1+a2*60+m2:a1*60+m1-a2*60-m2,g=Math.floor(tot/60),m=tot%60;
   return{text:`Calcula:<br><b>${a1}° ${m1}' ${sum?'+':'−'} ${a2}° ${m2}'</b>`,fields:[{label:'Graus',ans:R(g)},{label:'Minuts',ans:R(m)}],
    hints:[sum?'Suma els graus amb els graus i els minuts amb els minuts.':'Resta els graus amb els graus i els minuts amb els minuts.',sum?'Si els minuts arriben a 60 o més, passa 60\' a 1°.':m1<m2?`${m1}' no basten per restar-ne ${m2}': canvia 1° per 60'.`:'Comprova que els minuts no passen de 59.'],
    steps:sum?[`Graus: ${a1} + ${a2} = ${a1+a2}°. Minuts: ${m1} + ${m2} = ${m1+m2}'.`,m1+m2>=60?`${m1+m2}' = 1° ${m1+m2-60}'. Ho afegim: ${a1+a2+1}°.`:'Els minuts no arriben a 60.',`Resultat: <b>${g}° ${m}'</b>.`]
     :[m1<m2?`Com que ${m1}' < ${m2}', canviam 1° per 60': ${a1-1}° ${m1+60}'.`:'Restam per separat.',`Minuts: ${m1<m2?m1+60:m1} − ${m2} = ${m}'. Graus: ${m1<m2?a1-1:a1} − ${a2} = ${g}°.`,`Resultat: <b>${g}° ${m}'</b>.`],
    err:x=>val(x[1])>=60?'mt_sexag_60':(!sum&&m1<m2&&val(x[0])===a1-a2&&val(x[1])===m2-m1?'mt_sexag_resta':null)}}
  const tot=Math.random()<.5?180:90,a=tot===180?rnd(20,160):rnd(15,75),v=tot-a;
  return{text:`Observa el dibuix. ${tot===180?'Els dos angles formen un angle pla.':'Els dos angles formen un angle recte.'} Quant mesura l'angle marcat amb <b>?</b>`,fig:lineFig(a,tot),fields:[{label:'Graus',ans:R(v)}],
   hints:[tot===180?'Els dos angles junts fan una línia recta. Quants graus són?':'Els dos angles junts fan una cantonada recta. Quants graus són?',`Calcula quant falta de ${a}° fins a ${tot}°.`],
   steps:[`Junts fan un angle ${tot===180?'pla (180°)':'recte (90°)'}.`,`${tot}° − ${a}° = ${v}°.`,`L'angle ? mesura <b>${v}°</b>.`],
   err:x=>val(x[0])===(tot===180?90:180)-a?'mt_comp_supl':null}}},
mt_angles_poligon:{mat:'mates',nom:'Angles dels triangles i polígons',ab:'At',curs:[6],
 teoria:['Els tres angles de qualsevol <b>triangle</b> sumen sempre <b>180°</b>. Si en sabem dos, el tercer és 180° menys la seva suma.',
  'Els quatre angles d\'un <b>quadrilàter</b> sumen <b>360°</b> (es pot dividir en dos triangles).',
  'En general, un polígon de <i>n</i> costats es pot dividir en <i>n</i> − 2 triangles: els seus angles sumen <b>(n − 2) × 180°</b>. En un polígon regular, tots els angles són iguals: dividim la suma entre <i>n</i>.',
  'Exemple: un hexàgon regular → (6 − 2) × 180° = 720° → 720° : 6 = <b>120°</b> cada angle.'],
 fig:()=>triFig(60,70),
 gen(lv){const t=lv===0?0:lv===1?pick([0,0,1]):pick([0,1,2,2]);
  if(t===0){if(Math.random()<.3){const a=rnd(20,70),v=90-a;
    return{text:`Un triangle <b>rectangle</b> té un angle agut de ${a}°. Quant mesura l'altre angle agut?`,fig:triFig(90,a),fields:[{label:'Graus',ans:R(v)}],
     hints:['Un triangle rectangle té un angle de 90°.','Els tres angles sumen 180°.'],
     steps:['Els angles sumen 180° i un ja fa 90°.',`180° − 90° − ${a}° = ${v}°.`,`L'altre angle mesura <b>${v}°</b>.`],
     err:x=>{const y=val(x[0]);return y===180-a?'mt_triangle_recte':y===270-a?'mt_triangle_180':null}}}
   let a,b;do{a=rnd(25,lv?110:85);b=rnd(25,110)}while(180-a-b<15||a===90||b===90);const v=180-a-b;
   return{text:`Dos angles d'un triangle mesuren <b>${a}°</b> i <b>${b}°</b>. Quant mesura el tercer angle?`,fig:triFig(a,b),fields:[{label:'Graus',ans:R(v)}],
    hints:['Quant sumen sempre els tres angles d\'un triangle?',`Suma els dos que saps i resta-ho de 180°.`],
    steps:[`Els tres angles sumen 180°.`,`${a}° + ${b}° = ${a+b}°.`,`180° − ${a+b}° = <b>${v}°</b>.`],
    err:x=>val(x[0])===360-a-b?'mt_triangle_180':null}}
  if(t===1){const d=rnd(50,140);let a,b,c;do{a=rnd(50,140);b=rnd(50,140);c=360-d-a-b}while(c<40||c>170);
   return{text:`Tres angles d'un quadrilàter mesuren <b>${a}°</b>, <b>${b}°</b> i <b>${c}°</b>. Quant mesura el quart angle?`,fields:[{label:'Graus',ans:R(d)}],
    hints:['Quant sumen els quatre angles d\'un quadrilàter?','Un quadrilàter es pot dividir en dos triangles: 2 × 180°.'],
    steps:['Els angles d\'un quadrilàter sumen 360°.',`${a}° + ${b}° + ${c}° = ${a+b+c}°.`,`360° − ${a+b+c}° = <b>${d}°</b>.`],
    err:x=>val(x[0])===180-(a+b+c)?'mt_quadr_360':null}}
  const PN={3:'triangle equilàter',4:'quadrat',5:'pentàgon regular',6:'hexàgon regular',8:'octàgon regular',9:'enneàgon regular',10:'decàgon regular',12:'dodecàgon regular'},n=pick([5,6,8,9,10,12]),S=(n-2)*180,each=S/n,ask=Math.random()<.5;
  const P=regPts(n,170,95,75),fig=svg(340,190,`<polygon points="${pts(P)}" fill="${C.bl}" stroke="${C.b}" stroke-width="3"/>`,260);
  return{text:ask?`Quant mesura <b>cada angle interior</b> d'un ${PN[n]}?`:`Quant <b>sumen</b> tots els angles interiors d'un ${PN[n].replace(' regular','')}?`,fig,fields:[fInt('Graus',ask?each:S)],
   hints:[`En quants triangles es pot dividir un polígon de ${n} costats? (n − 2)`,ask?'Calcula la suma de tots els angles i divideix-la entre el nombre d\'angles.':'Multiplica el nombre de triangles per 180°.'],
   steps:[`Un polígon de ${n} costats es divideix en ${n} − 2 = ${n-2} triangles.`,`Suma dels angles: ${n-2} × 180° = ${num(S)}°.`,ask?`Cada angle: ${num(S)}° : ${n} = <b>${each}°</b>.`:`Sumen <b>${num(S)}°</b>.`],
   err:x=>{const y=val(x[0]);if(ask&&y===360/n)return'mt_angle_central';if(y===(ask?180:n*180)||(!ask&&y===(n-1)*180))return'mt_suma_poligon';return null}}}}
});
})();
