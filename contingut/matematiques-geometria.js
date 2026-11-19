/* Aprenem - MATEMÀTIQUES 6è: polígons, circumferència i cercle, àrees, cossos geomètrics i volum
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. Fonts: vegeu contingut/matematiques.js. */
(()=>{
const {num,dc,fInt,fDec,fTxt,val,eq,near,fo,svg,tx,ln,pts,C,regPts}=MT;
const PI=3.14,cm2='Àrea (cm²)';
const poly=(P,o={})=>`<polygon points="${pts(P)}" fill="${o.f||C.bl}" stroke="${o.c||C.b}" stroke-width="${o.w||3}" stroke-linejoin="round"/>`;
const lab=(x,y,s,c)=>tx(x,y,s,{fs:15,c:c||C.t});

/* ---------- dibuixos de figures planes ---------- */
function rectFig(b,h,lb,lh){const s=Math.min(220/b,120/h),w=b*s,hh=h*s,x=(340-w)/2,y=15;
 return svg(340,hh+50,poly([[x,y],[x+w,y],[x+w,y+hh],[x,y+hh]])+lab(x+w/2,y+hh+18,lb)+lab(x-10,y+hh/2,lh,C.t).replace('text-anchor="middle"','text-anchor="end"'),320)}
function romFig(b,h,sd,dx,lb,lh,ls){const s=Math.min(220/(b+dx),120/h),W=b*s,D=dx*s,H=h*s,x=(340-W-D)/2,y=15;
 return svg(340,H+50,poly([[x+D,y],[x+D+W,y],[x+W,y+H],[x,y+H]])+ln(x+D,y,x+D,y+H,{dash:1,c:C.o,w:2})+lab(x+D+8,y+H/2,lh,C.o).replace('text-anchor="middle"','text-anchor="start"')
  +lab(x+W/2,y+H+18,lb)+lab(x+D/2-12,y+H/2-4,ls,C.g).replace('text-anchor="middle"','text-anchor="end"'),320)}
function triFigA(b,h,lb,lh){const s=Math.min(220/b,120/h),W=b*s,H=h*s,x=(340-W)/2,y=15,ax=x+W*.32;
 return svg(340,H+50,poly([[x,y+H],[x+W,y+H],[ax,y]])+ln(ax,y,ax,y+H,{dash:1,c:C.o,w:2})+lab(ax+8,y+H/2,lh,C.o).replace('text-anchor="middle"','text-anchor="start"')+lab(x+W/2,y+H+18,lb),320)}
function rombFig(D,d,lD,ld){const s=Math.min(240/D,130/d),W=D*s,H=d*s,cx=170,y=12,cy=y+H/2;
 return svg(340,H+30,poly([[cx-W/2,cy],[cx,y],[cx+W/2,cy],[cx,y+H]])+ln(cx-W/2,cy,cx+W/2,cy,{dash:1,c:C.o,w:2})+ln(cx,y,cx,y+H,{dash:1,c:C.o,w:2})
  +lab(cx+W/4,cy+13,lD,C.o)+lab(cx+8,cy-H/4,ld,C.o).replace('text-anchor="middle"','text-anchor="start"'),320)}
function trapFig(B,b,h,lB,lb,lh){const s=Math.min(230/B,120/h),W=B*s,w=b*s,H=h*s,x=(340-W)/2,y=22,tl=x+(W-w)/2;
 return svg(340,H+55,poly([[x,y+H],[x+W,y+H],[tl+w,y],[tl,y]])+ln(tl,y,tl,y+H,{dash:1,c:C.o,w:2})+lab(tl+8,y+H/2,lh,C.o).replace('text-anchor="middle"','text-anchor="start"')
  +lab(x+W/2,y+H+18,lB)+lab(tl+w/2,y-12,lb),320)}
function circFig(r,useD,l){const R0=70,cx=170,cy=85;let g=`<circle cx="${cx}" cy="${cy}" r="${R0}" fill="${C.bl}" stroke="${C.b}" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="3.5" fill="${C.t}"/>`;
 g+=useD?ln(cx-R0,cy,cx+R0,cy,{c:C.o,w:2.5})+lab(cx,cy-13,l,C.o):ln(cx,cy,cx+R0,cy,{c:C.o,w:2.5})+lab(cx+R0/2,cy-13,l,C.o);return svg(340,172,g,300)}
function regFig(n,ls,la){const P=regPts(n,170,90,75),i=P.reduce((b,p,k)=>(p[1]+P[(k+1)%n][1])>(P[b][1]+P[(b+1)%n][1])?k:b,0),m=[(P[i][0]+P[(i+1)%n][0])/2,(P[i][1]+P[(i+1)%n][1])/2];
 return svg(340,190,poly(P)+`<circle cx="170" cy="90" r="3.5" fill="${C.t}"/>`+(la?ln(170,90,m[0],m[1],{dash:1,c:C.o,w:2})+lab(178,(90+m[1])/2,la,C.o).replace('text-anchor="middle"','text-anchor="start"'):'')+(ls?lab(m[0],m[1]+16,ls):''),300)}

/* ---------- dibuixos de cossos ---------- */
function solidFig(n,pyr){const cx=170,cy=150,R0=95,k=.36,H=pyr?125:105,rot=Math.PI/2+(n%2?0:.3);
 const B=Array.from({length:n},(_,i)=>{const t=rot+2*Math.PI*i/n;return{x:cx+R0*Math.cos(t),y:cy+R0*k*Math.sin(t),s:Math.sin(t),c:Math.cos(t)}});
 // amagat (línia de punts): vèrtex de darrere que no és l'extrem esquerre ni el dret de la silueta
 const xs=B.map(b=>b.x),iL=xs.indexOf(Math.min(...xs)),iR=xs.indexOf(Math.max(...xs)),back=i=>B[i].s<-0.01&&i!==iL&&i!==iR;let g='';
 for(let i=0;i<n;i++){const j=(i+1)%n,hid=(B[i].s+B[j].s)/2<-0.01;g+=ln(B[i].x,B[i].y,B[j].x,B[j].y,{c:hid?C.g:C.b,w:hid?1.5:3,dash:hid})}
 if(pyr){for(let i=0;i<n;i++)g+=ln(B[i].x,B[i].y,cx,cy-H,{c:back(i)?C.g:C.b,w:back(i)?1.5:3,dash:back(i)});g+=`<circle cx="${cx}" cy="${cy-H}" r="4" fill="${C.b}"/>`}
 else{for(let i=0;i<n;i++){const j=(i+1)%n;g+=ln(B[i].x,B[i].y-H,B[j].x,B[j].y-H,{c:C.b,w:3})+ln(B[i].x,B[i].y,B[i].x,B[i].y-H,{c:back(i)?C.g:C.b,w:back(i)?1.5:3,dash:back(i)})}}
 return svg(340,190,g,280)}
function boxFig(l,a,h,o={}){const k=.5,an=35*Math.PI/180,s=Math.min(190/(l+a*k*Math.cos(an)),120/(h+a*k*Math.sin(an))),L=l*s,Hh=h*s,dx=a*k*Math.cos(an)*s,dy=a*k*Math.sin(an)*s,x=(340-L-dx)/2,y=12+dy;
 const F=[[x,y],[x+L,y],[x+L,y+Hh],[x,y+Hh]],sh=p=>[p[0]+dx,p[1]-dy];let g=poly([F[0],F[1],sh(F[1]),sh(F[0])],{f:'#EEF3FF'})+poly([F[1],sh(F[1]),sh(F[2]),F[2]],{f:'#D3E0FF'})+poly(F);
 if(o.grid){const t=(p,q,f)=>[p[0]+(q[0]-p[0])*f,p[1]+(q[1]-p[1])*f],gl=(p,q)=>ln(p[0],p[1],q[0],q[1],{c:C.b,w:1});
  for(let i=1;i<l;i++){const f=i/l,p=t(F[0],F[1],f);g+=gl(p,[p[0],F[3][1]])+gl(p,sh(p))}
  for(let j=1;j<h;j++){const f=j/h,p=t(F[0],F[3],f),q=t(F[1],F[2],f);g+=gl(p,q)+gl(q,sh(q))}
  for(let m=1;m<a;m++){const f=m/a,d=[dx*f,-dy*f];g+=gl([F[0][0]+d[0],F[0][1]+d[1]],[F[1][0]+d[0],F[1][1]+d[1]])+gl([F[1][0]+d[0],F[1][1]+d[1]],[F[2][0]+d[0],F[2][1]+d[1]])}}
 g+=lab(x+L/2,y+Hh+18,o.ll||'')+lab(x-10,y+Hh/2,o.lh||'').replace('text-anchor="middle"','text-anchor="end"')+lab(x+L+dx/2+10,y+Hh-dy/2+10,o.la||'').replace('text-anchor="middle"','text-anchor="start"');
 return svg(340,y+Hh+32,g,320)}

Object.assign(ERR,{
 mt_nom_poligon:{kid:'Compte amb el prefix: penta- vol dir 5, hexa- 6, hepta- 7, octo- 8, enea- 9 i deca- 10. Compta els costats!',par:'Confon els noms dels polígons'},
 mt_triangle_criteri:{kid:'Això és la classificació segons els angles (o segons els costats). Mira què et demana la pregunta.',par:'Confon la classificació dels triangles per costats i per angles'},
 mt_quadrilaters:{kid:'Revisa les característiques: costats iguals? angles rectes? costats paral·lels?',par:'Confon els tipus de quadrilàters'},
 mt_diagonals_doble:{kid:'Gairebé! Així cada diagonal es compta dues vegades (d\'anada i de tornada). Divideix-ho entre 2.',par:'Compta dues vegades cada diagonal'},
 mt_circ_2:{kid:'T\'has oblidat del 2! La longitud de la circumferència és 2 × π × radi (o π × diàmetre).',par:'Calcula la longitud de la circumferència com π × r'},
 mt_circ_area:{kid:'Això és l\'àrea del cercle (π × r × r). La longitud de la circumferència és 2 × π × r.',par:'Confon la longitud de la circumferència amb l\'àrea del cercle'},
 mt_radi_diametre:{kid:'Compte amb el radi i el diàmetre: el diàmetre és el doble del radi.',par:'Confon el radi i el diàmetre'},
 mt_area_perimetre:{kid:'Has calculat el perímetre (el voltant). L\'àrea és la superfície de dins.',par:'Confon l\'àrea amb el perímetre'},
 mt_area_costat:{kid:'Per a l\'àrea del romboide cal l\'altura (la línia perpendicular), no el costat inclinat.',par:'Fa servir el costat inclinat en lloc de l\'altura'},
 mt_area_meitat:{kid:'Gairebé! No t\'oblidis de dividir entre 2.',par:'Oblida dividir entre 2 (triangle, rombe, trapezi o polígon regular)'},
 mt_area_long:{kid:'Això és la longitud de la circumferència. L\'àrea del cercle és π × r × r.',par:'Confon l\'àrea del cercle amb la longitud de la circumferència'},
 mt_area_retall:{kid:'Aquesta és l\'àrea del rectangle sencer. Has de treure el tros que hi falta.',par:'No resta la part que falta en una figura composta'},
 mt_euler:{kid:'Comprova-ho amb la fórmula d\'Euler: cares + vèrtexs = arestes + 2.',par:'Compta malament cares, vèrtexs o arestes (no compleix Euler)'},
 mt_prisma_piramide:{kid:'Compte! El prisma té dues bases iguals; la piràmide en té una i les cares laterals s\'ajunten en un vèrtex.',par:'Confon prismes i piràmides (o cilindre i con)'},
 mt_volum_suma:{kid:'El volum no és una suma: es multipliquen les tres mesures (llarg × ample × alt).',par:'Suma les dimensions en lloc de multiplicar-les'},
 mt_volum_base:{kid:'Això és l\'àrea de la base. Encara l\'has de multiplicar per l\'altura.',par:'Calcula només l\'àrea de la base'}
});

Object.assign(SK,{
/* ---------- Polígons i circumferència ---------- */
mt_poligons:{mat:'mates',nom:'Polígons: classificació i perímetre',ab:'Pg',curs:[6],
 teoria:['Un <b>polígon</b> és una figura plana tancada formada per segments (els <b>costats</b>). Els punts on s\'ajunten són els <b>vèrtexs</b>, i les <b>diagonals</b> uneixen vèrtexs no consecutius.',
  'Segons els costats: triangle (3), quadrilàter (4), pentàgon (5), hexàgon (6), heptàgon (7), octàgon (8), enneàgon (9), decàgon (10)... Un polígon és <b>regular</b> si té tots els costats i angles iguals.',
  '<b>Triangles</b> — per costats: equilàter (3 iguals), isòsceles (2 iguals), escalè (cap igual). Per angles: acutangle (3 aguts), rectangle (1 recte), obtusangle (1 obtús).',
  '<b>Quadrilàters</b> — paral·lelograms (costats paral·lels dos a dos): quadrat, rectangle, rombe i romboide. Trapezis: només dos costats paral·lels. Trapezoides: cap.',
  'El <b>perímetre</b> és la suma de tots els costats. En un polígon regular: nombre de costats × costat.'],
 fig:()=>svg(340,110,[3,5,6,8].map((n,i)=>poly(regPts(n,45+i*83,50,36),{w:2.5})).join(''),340),
 gen(lv){const PN={3:['triangle'],4:['quadrilàter','quadrilater'],5:['pentàgon'],6:['hexàgon'],7:['heptàgon'],8:['octàgon'],9:['enneàgon','eneàgon','nonàgon'],10:['decàgon'],11:['hendecàgon','undecàgon'],12:['dodecàgon']};
  const t=lv===0?pick([0,1,1]):lv===1?pick([0,1,2,3]):pick([1,2,3,4]);
  if(t===0){const n=rnd(3,lv?10:8);
   return{text:`Com s'anomena un polígon de <b>${n} costats</b>?`,fig:svg(340,180,poly(regPts(n,170,90,80)),220),fields:[fTxt('Nom del polígon',PN[n])],
    hints:['Compta els costats i pensa en el prefix: tri- (3), penta- (5), hexa- (6), hepta- (7), octo- (8)...','El nom acaba en -àgon (excepte el triangle i el quadrilàter).'],
    steps:[`El polígon té ${n} costats.`,`Prefix: ${['','','','tri-','quadri-','penta-','hexa-','hepta-','octo-','enea-','deca-'][n]||''}.`,`Es diu <b>${PN[n][0]}</b>.`],
    err:x=>[n-1,n+1].some(m=>PN[m]&&PN[m].some(w=>fo(w)===fo(x[0])))?'mt_nom_poligon':null}}
  if(t===1){const n=rnd(3,lv?12:8),dec=lv>0&&Math.random()<.5,l=dec?rnd(15,95)/10:rnd(2,15),nm=n===4?'quadrat':n===3?'triangle equilàter':PN[n][0]+' regular',P=Math.round(n*l*10)/10,rev=lv===2&&Math.random()<.5;
   if(rev)return{text:`Un ${nm} té un perímetre de <b>${dc(P)} cm</b>. Quant fa cada costat?`,fields:[fDec('Costat (cm)',l)],
    hints:[`Quants costats iguals té un ${nm}?`,`Reparteix el perímetre entre els ${n} costats.`],
    steps:[`Un ${nm} té ${n} costats iguals.`,`${dc(P)} : ${n} = ${dc(l)}.`,`Cada costat fa <b>${dc(l)} cm</b>.`]};
   return{text:`Quant fa el <b>perímetre</b> d'un ${nm} de ${dc(l)} cm de costat?`,fig:regFig(n,`${dc(l)} cm`),fields:[fDec('Perímetre (cm)',P)],
    hints:[`Quants costats té un ${nm}? Tots fan el mateix.`,`Multiplica el nombre de costats per la longitud d'un costat.`],
    steps:[`Un ${nm} té ${n} costats iguals.`,`${n} × ${dc(l)} = ${dc(P)}.`,`El perímetre és <b>${dc(P)} cm</b>.`]}}
  if(t===2){const SIDE={'equilàter':['equilàter','equilater'],'isòsceles':['isòsceles','isosceles'],'escalè':['escalè','escale']},ANG={'acutangle':['acutangle'],'rectangle':['rectangle'],'obtusangle':['obtusangle']};
   const bySide=Math.random()<.5;let ty,d,q;
   if(bySide){ty=pick(Object.keys(SIDE));const a=rnd(3,12);let b,c;if(ty==='equilàter'){b=a;c=a}else if(ty==='isòsceles'){do{c=rnd(2,2*a-1)}while(c===a);b=a}else{do{b=rnd(3,12);c=rnd(3,12)}while(b===a||c===a||b===c||a+b<=c||a+c<=b||b+c<=a)}
    d=MT.shuf([a,b,c]).map(v=>v+' cm').join(', ');q=`Un triangle té els costats de <b>${d}</b>. Com és <b>segons els costats</b>?`}
   else{ty=pick(Object.keys(ANG));let A,B;if(ty==='rectangle'){A=90;B=rnd(20,70)}else if(ty==='obtusangle'){A=rnd(95,140);B=rnd(15,180-A-15)}else{do{A=rnd(40,85);B=rnd(40,85)}while(180-A-B>=90||180-A-B<15)}
    d=MT.shuf([A,B,180-A-B]).map(v=>v+'°').join(', ');q=`Els angles d'un triangle mesuren <b>${d}</b>. Com és <b>segons els angles</b>?`}
   const own=bySide?SIDE:ANG,other=bySide?ANG:SIDE;
   return{text:q,fields:[fTxt('Tipus de triangle',own[ty])],
    hints:[bySide?'Mira quants costats són iguals.':'Mira si hi ha algun angle recte (90°) o obtús (més de 90°).',bySide?'3 iguals: equilàter · 2 iguals: isòsceles · cap igual: escalè.':'Tots aguts: acutangle · un recte: rectangle · un obtús: obtusangle.'],
    steps:[bySide?'Per costats: equilàter (3 iguals), isòsceles (2 iguals), escalè (cap igual).':'Per angles: acutangle (tots aguts), rectangle (un de 90°), obtusangle (un de més de 90°).',`Dades: ${d}.`,`És un triangle <b>${ty}</b>.`],
    err:x=>Object.values(other).flat().some(w=>fo(w)===fo(x[0]))&&!own[ty].some(w=>fo(w)===fo(x[0]))?'mt_triangle_criteri':null}}
  if(t===3){const Q=[['Té els 4 costats iguals i els 4 angles rectes.',['quadrat']],['Té els costats iguals dos a dos i els 4 angles rectes, però no tots els costats són iguals.',['rectangle']],
    ['Té els 4 costats iguals, però els angles no són rectes.',['rombe']],['Té els costats paral·lels dos a dos, però els costats no són tots iguals i els angles no són rectes.',['romboide']],
    ['Té només dos costats paral·lels.',['trapezi']],['No té cap costat paral·lel a un altre.',['trapezoide']]];
   const[desc,ans]=pick(Q),all=Q.map(q=>q[1][0]);
   return{text:`Quin quadrilàter és?<br><i>${desc}</i>`,fields:[fTxt('Nom',ans)],
    hints:['Pensa primer: té costats paral·lels? Quants parells?','Després mira si els costats són iguals i si els angles són rectes.'],
    steps:['Paral·lelograms (costats paral·lels dos a dos): quadrat, rectangle, rombe, romboide. Trapezi: només 2 paral·lels. Trapezoide: cap.',`Descripció: ${desc}`,`És un <b>${ans[0]}</b>.`],
    err:x=>all.some(w=>w!==ans[0]&&fo(w)===fo(x[0]))?'mt_quadrilaters':null}}
  const n=rnd(4,10),v=n*(n-3)/2;
  return{text:`Quantes <b>diagonals</b> té un ${PN[n][0]}?`,fig:svg(340,180,poly(regPts(n,170,90,80)),220),fields:[fInt('Diagonals',v)],
   hints:['De cada vèrtex surten diagonals cap a tots els altres vèrtexs, menys ell mateix i els dos del costat.',`De cada vèrtex en surten ${n} − 3. Però compte: cada diagonal té dos extrems!`],
   steps:[`De cada vèrtex surten ${n} − 3 = ${n-3} diagonals.`,`${n} vèrtexs × ${n-3} = ${n*(n-3)}, però així comptam cada diagonal dues vegades.`,`${n*(n-3)} : 2 = <b>${v}</b> diagonals.`],
   err:x=>val(x[0])===n*(n-3)?'mt_diagonals_doble':null}}},
mt_circumf:{mat:'mates',nom:'Circumferència i cercle',ab:'Ci',curs:[6],
 teoria:['La <b>circumferència</b> és la línia corba tancada amb tots els punts a la mateixa distància del <b>centre</b>. El <b>cercle</b> és la superfície que queda a dins.',
  'El <b>radi</b> (r) va del centre a la circumferència. El <b>diàmetre</b> (d) la travessa passant pel centre: <b>d = 2 × r</b>.',
  'Si dividim la longitud de qualsevol circumferència entre el seu diàmetre, sempre surt el mateix nombre: <b>π (pi) ≈ 3,14</b>.',
  'Longitud de la circumferència: <b>L = 2 × π × r</b> = π × d. Exemple: r = 5 cm → L = 2 × 3,14 × 5 = <b>31,4 cm</b>.'],
 fig:()=>circFig(5,false,'radi'),
 gen(lv){const t=lv===0?pick([0,1,1]):lv===1?pick([1,1,2]):pick([1,2,3]);
  if(t===0){const r=rnd(2,30),askD=Math.random()<.5,d=2*r;
   return{text:askD?`El radi d'una circumferència fa <b>${r} cm</b>. Quant fa el diàmetre?`:`El diàmetre d'una circumferència fa <b>${d} cm</b>. Quant fa el radi?`,fig:circFig(r,!askD,askD?`r = ${r} cm`:`d = ${d} cm`),fields:[fInt(askD?'Diàmetre (cm)':'Radi (cm)',askD?d:r)],
    hints:['El diàmetre passa pel centre i va d\'un costat a l\'altre.','El diàmetre és el doble del radi.'],
    steps:['d = 2 × r.',askD?`d = 2 × ${r} = ${d}.`:`r = ${d} : 2 = ${r}.`,askD?`El diàmetre fa <b>${d} cm</b>.`:`El radi fa <b>${r} cm</b>.`],
    err:x=>val(x[0])===(askD?r/2:2*d)?'mt_radi_diametre':null}}
  if(t===1){const useD=lv>0&&Math.random()<.5,r=rnd(2,lv?25:12),L=2*PI*r;
   return{text:`Calcula la <b>longitud</b> d'una circumferència de ${useD?`${2*r} cm de diàmetre`:`${r} cm de radi`}. (π = 3,14)`,fig:circFig(r,useD,useD?`d = ${2*r} cm`:`r = ${r} cm`),fields:[fDec('Longitud (cm)',L)],
    hints:['La fórmula és L = 2 × π × r (o bé π × d).',useD?`El radi és la meitat del diàmetre: ${r} cm.`:`Substitueix: 2 × 3,14 × ${r}.`],
    steps:[useD?`El diàmetre fa ${2*r} cm, per tant r = ${r} cm.`:'L = 2 × π × r.',`L = 2 × 3,14 × ${r} = ${dc(L)}.`,`La longitud és <b>${dc(L)} cm</b>.`],
    err:x=>{const y=val(x[0]);if(useD&&near(y,2*PI*2*r))return'mt_radi_diametre';if(near(y,PI*r))return'mt_circ_2';if(r!==2&&near(y,PI*r*r))return'mt_circ_area';return null}}}
  if(t===2){let r,v,L;do{r=rnd(10,35);v=rnd(2,9);L=2*PI*r*v}while(L>=1000&&!Number.isInteger(L));
   return{text:`Una roda de bicicleta té <b>${r} cm de radi</b>. Quants centímetres avança si fa <b>${v} voltes</b>? (π = 3,14)`,fields:[fDec('Distància (cm)',L)],
    hints:['En cada volta, la roda avança la longitud de la seva circumferència.',`Calcula primer la longitud: 2 × 3,14 × ${r}.`],
    steps:[`Una volta: 2 × 3,14 × ${r} = ${dc(2*PI*r)} cm.`,`${v} voltes: ${dc(2*PI*r)} × ${v} = ${dc(L)}.`,`Avança <b>${dc(L)} cm</b>.`],
    err:x=>near(val(x[0]),2*PI*r)?'mt_problema_pas':near(val(x[0]),PI*r*v)?'mt_circ_2':null}}
  const r=rnd(2,20),L=2*PI*r;
  return{text:`Una circumferència fa <b>${dc(L)} cm</b> de llarg. Quant fa el seu <b>radi</b>? (π = 3,14)`,fields:[fInt('Radi (cm)',r)],
   hints:['L = 2 × π × r. Fes l\'operació contrària.',`Divideix ${dc(L)} entre 2 × 3,14 = 6,28.`],
   steps:['L = 2 × 3,14 × r = 6,28 × r.',`r = ${dc(L)} : 6,28 = ${r}.`,`El radi fa <b>${r} cm</b>.`],
   err:x=>val(x[0])===2*r?'mt_radi_diametre':null}}},

/* ---------- Àrees ---------- */
mt_area_quad:{mat:'mates',nom:'Àrea del quadrat, rectangle i romboide',ab:'Aq',curs:[6],
 teoria:['L\'<b>àrea</b> és la mesura de la superfície d\'una figura. Es mesura en unitats quadrades: cm², m²...',
  '<b>Quadrat:</b> A = costat × costat. <b>Rectangle:</b> A = base × altura.',
  '<b>Romboide:</b> A = base × altura. Compte: l\'<b>altura</b> és la línia perpendicular a la base (la de punts), no el costat inclinat.',
  'No confonguis l\'àrea (la superfície de dins) amb el <b>perímetre</b> (la longitud del voltant).'],
 fig:()=>romFig(8,4,5,3,'base','altura','costat'),
 gen(lv){const sh=pick(lv===0?['q','r','r']:['q','r','p','p']),dec=lv===1&&Math.random()<.5,D=()=>dec?rnd(15,99)/10:rnd(2,lv?20:12),rev=lv===2&&Math.random()<.5;
  if(sh==='q'){const c=D(),A=Math.round(c*c*100)/100;
   if(rev){const k=rnd(3,15);return{text:`Un quadrat té una àrea de <b>${k*k} cm²</b>. Quant fa el costat?`,fields:[fInt('Costat (cm)',k)],
    hints:['L\'àrea del quadrat és costat × costat.',`Busca un nombre que multiplicat per ell mateix doni ${k*k}.`],steps:['A = c × c.',`${k} × ${k} = ${k*k}.`,`El costat fa <b>${k} cm</b>.`],err:x=>k!==4&&val(x[0])===k*k/4?'mt_area_perimetre':null}}
   return{text:`Calcula l'àrea d'un <b>quadrat</b> de ${dc(c)} cm de costat.`,fig:rectFig(1,1,`${dc(c)} cm`,`${dc(c)} cm`),fields:[fDec(cm2,A)],
    hints:['Quina és la fórmula de l\'àrea del quadrat?','Multiplica el costat per ell mateix.'],steps:['A = costat × costat.',`A = ${dc(c)} × ${dc(c)} = ${dc(A)}.`,`L'àrea és <b>${dc(A)} cm²</b>.`],
    err:x=>c!==4&&near(val(x[0]),4*c)?'mt_area_perimetre':null}}
  if(sh==='r'){let b,h;do{b=D();h=D()}while(b===h);const A=Math.round(b*h*100)/100;
   if(rev){const bb=rnd(4,20),hh=rnd(3,15);return{text:`Un rectangle té una àrea de <b>${bb*hh} cm²</b> i una base de <b>${bb} cm</b>. Quant fa l'altura?`,fields:[fInt('Altura (cm)',hh)],
    hints:['A = base × altura. Quin nombre multiplicat per la base dona l\'àrea?',`Divideix ${bb*hh} : ${bb}.`],steps:['A = b × h, per tant h = A : b.',`h = ${bb*hh} : ${bb} = ${hh}.`,`L'altura fa <b>${hh} cm</b>.`],err:x=>bb*hh-bb!==hh&&val(x[0])===bb*hh-bb?'mt_area_perimetre':null}}
   return{text:`Calcula l'àrea d'aquest <b>rectangle</b>.`,fig:rectFig(b,h,`${dc(b)} cm`,`${dc(h)} cm`),fields:[fDec(cm2,A)],
    hints:['Quina és la fórmula de l\'àrea del rectangle?','Multiplica la base per l\'altura.'],steps:['A = base × altura.',`A = ${dc(b)} × ${dc(h)} = ${dc(A)}.`,`L'àrea és <b>${dc(A)} cm²</b>.`],
    err:x=>!near(2*(b+h),A)&&near(val(x[0]),2*(b+h))?'mt_area_perimetre':null}}
  let b,h,sd,dx;do{b=rnd(5,lv===2?25:15);h=rnd(3,12);sd=h+rnd(1,4);dx=Math.sqrt(sd*sd-h*h)}while(dx>.6*b);const A=b*h;
  return{text:`Calcula l'àrea d'aquest <b>romboide</b>.`,fig:romFig(b,h,sd,dx,`${b} cm`,`${h} cm`,`${sd} cm`),fields:[fInt(cm2,A)],
   hints:['L\'àrea del romboide és base × altura.','L\'altura és la línia de punts (perpendicular a la base), no el costat inclinat.'],
   steps:['A = base × altura (la perpendicular).',`A = ${b} × ${h} = ${A}.`,`L'àrea és <b>${num(A)} cm²</b>.`],
   err:x=>{const y=val(x[0]);return y===b*sd?'mt_area_costat':y===2*(b+sd)&&y!==A?'mt_area_perimetre':null}}}},
mt_area_tri:{mat:'mates',nom:'Àrea del triangle, rombe i trapezi',ab:'A3',curs:[6],
 teoria:['<b>Triangle:</b> és la meitat d\'un romboide (o rectangle) amb la mateixa base i altura → <b>A = (base × altura) : 2</b>.',
  '<b>Rombe:</b> A = (diagonal major × diagonal menor) : 2.',
  '<b>Trapezi:</b> A = (base major + base menor) × altura : 2.',
  'En totes tres fórmules hi ha un <b>: 2</b>. No te l\'oblidis!'],
 fig:()=>triFigA(8,5,'base','altura'),
 gen(lv){const sh=pick(lv===0?['t','t','r']:['t','r','z']),rev=lv===2&&Math.random()<.4;
  if(sh==='t'){let b,h;do{b=rnd(3,lv?24:14);h=rnd(2,lv?18:10)}while(b*h%2);const A=b*h/2;
   if(rev)return{text:`Un triangle té una àrea de <b>${A} cm²</b> i una base de <b>${b} cm</b>. Quant fa l'altura?`,fields:[fInt('Altura (cm)',h)],
    hints:['A = b × h : 2. Per tant, b × h = 2 × A.',`b × h = ${2*A}. Divideix entre la base.`],steps:[`b × h = 2 × ${A} = ${2*A}.`,`h = ${2*A} : ${b} = ${h}.`,`L'altura fa <b>${h} cm</b>.`],err:x=>val(x[0])===A/b?'mt_area_meitat':null};
   return{text:`Calcula l'àrea d'aquest <b>triangle</b>.`,fig:triFigA(b,h,`${b} cm`,`${h} cm`),fields:[fDec(cm2,A)],
    hints:['A = base × altura : 2.',`Multiplica ${b} × ${h} i divideix entre 2.`],steps:['A = (base × altura) : 2.',`${b} × ${h} = ${b*h}; ${b*h} : 2 = ${dc(A)}.`,`L'àrea és <b>${dc(A)} cm²</b>.`],
    err:x=>val(x[0])===b*h?'mt_area_meitat':null}}
  if(sh==='r'){let D,d;do{D=rnd(6,lv?24:16);d=rnd(4,D-1)}while(D*d%2);const A=D*d/2;
   return{text:`Calcula l'àrea d'un <b>rombe</b> amb diagonals de ${D} cm i ${d} cm.`,fig:rombFig(D,d,`${D} cm`,`${d} cm`),fields:[fDec(cm2,A)],
    hints:['A = diagonal major × diagonal menor : 2.',`Multiplica ${D} × ${d} i divideix entre 2.`],steps:['A = (D × d) : 2.',`${D} × ${d} = ${D*d}; ${D*d} : 2 = ${A}.`,`L'àrea és <b>${num(A)} cm²</b>.`],
    err:x=>val(x[0])===D*d?'mt_area_meitat':null}}
  let B,b,h;do{B=rnd(8,lv===2?26:18);b=rnd(3,B-2);h=rnd(3,12)}while((B+b)*h%2);const A=(B+b)*h/2;
  return{text:`Calcula l'àrea d'aquest <b>trapezi</b>.`,fig:trapFig(B,b,h,`${B} cm`,`${b} cm`,`${h} cm`),fields:[fDec(cm2,A)],
   hints:['A = (base major + base menor) × altura : 2.',`Suma ${B} + ${b}, multiplica per ${h} i divideix entre 2.`],
   steps:[`Sumam les bases: ${B} + ${b} = ${B+b}.`,`Multiplicam per l'altura: ${B+b} × ${h} = ${(B+b)*h}.`,`Dividim entre 2: ${(B+b)*h} : 2 = <b>${num(A)} cm²</b>.`],
   err:x=>val(x[0])===(B+b)*h?'mt_area_meitat':null}}},
mt_area_cercle:{mat:'mates',nom:'Àrea del cercle i dels polígons regulars',ab:'Ac',curs:[6],
 teoria:['<b>Cercle:</b> A = π × r × r = π × r². Exemple: r = 3 cm → A = 3,14 × 3 × 3 = <b>28,26 cm²</b>.',
  'Compte: si et donen el diàmetre, primer calcula el radi (la meitat).',
  '<b>Polígon regular:</b> l\'<b>apotema</b> (a) és el segment del centre al punt mitjà d\'un costat. A = perímetre × apotema : 2.',
  'Exemple: hexàgon de 4 cm de costat i 3,5 cm d\'apotema → P = 24 cm → A = 24 × 3,5 : 2 = <b>42 cm²</b>.'],
 fig:()=>regFig(6,'costat','apotema'),
 gen(lv){const t=lv===0?0:lv===1?pick([0,1]):pick([1,2,3]);
  if(t===0||t===1){const useD=t===1,r=rnd(1,lv?17:10),A=PI*r*r;
   return{text:`Calcula l'àrea d'un <b>cercle</b> de ${useD?`${2*r} cm de diàmetre`:`${r} cm de radi`}. (π = 3,14)`,fig:circFig(r,useD,useD?`d = ${2*r} cm`:`r = ${r} cm`),fields:[fDec(cm2,A)],
    hints:['A = π × r × r.',useD?`Primer calcula el radi: la meitat de ${2*r}.`:`Substitueix: 3,14 × ${r} × ${r}.`],
    steps:[useD?`r = ${2*r} : 2 = ${r} cm.`:'A = π × r × r.',`A = 3,14 × ${r} × ${r} = 3,14 × ${r*r} = ${dc(A)}.`,`L'àrea és <b>${dc(A)} cm²</b>.`],
    err:x=>{const y=val(x[0]);if(useD&&near(y,PI*4*r*r))return'mt_radi_diametre';if(r!==2&&near(y,2*PI*r))return'mt_area_long';return null}}}
  if(t===2){let n,l,a,A;do{n=pick([5,6,8]);l=rnd(3,12);a=Math.round(l/(2*Math.tan(Math.PI/n))*10)/10;A=n*l*a/2}while(A>=1000||Math.abs(A*100-Math.round(A*100))>1e-6);
   const nm={5:'pentàgon',6:'hexàgon',8:'octàgon'}[n],P=n*l;
   return{text:`Calcula l'àrea d'un <b>${nm} regular</b> de ${l} cm de costat i ${dc(a)} cm d'apotema.`,fig:regFig(n,`${l} cm`,`${dc(a)} cm`),fields:[fDec(cm2,A)],
    hints:['A = perímetre × apotema : 2. Calcula primer el perímetre.',`El perímetre és ${n} × ${l}.`],
    steps:[`Perímetre: ${n} × ${l} = ${P} cm.`,`${P} × ${dc(a)} = ${dc(P*a)}.`,`${dc(P*a)} : 2 = <b>${dc(A)} cm²</b>.`],
    err:x=>{const y=val(x[0]);return near(y,P*a)?'mt_area_meitat':near(y,l*a/2)?'mt_problema_pas':null}}}
  const r=rnd(2,16),A=PI*r*r/2;
  return{text:`Calcula l'àrea d'un <b>semicercle</b> (mig cercle) de ${r} cm de radi. (π = 3,14)`,fields:[fDec(cm2,A)],
   hints:['Calcula l\'àrea del cercle sencer i després...','Un semicercle és la meitat d\'un cercle.'],
   steps:[`Cercle sencer: 3,14 × ${r} × ${r} = ${dc(PI*r*r)} cm².`,`La meitat: ${dc(PI*r*r)} : 2 = ${dc(A)}.`,`L'àrea és <b>${dc(A)} cm²</b>.`],
   err:x=>near(val(x[0]),PI*r*r)?'mt_area_meitat':null}}},
mt_area_comp:{mat:'mates',nom:'Àrees de figures compostes',ab:'Ax',curs:[6],
 teoria:['Una <b>figura composta</b> està formada per figures més senzilles: rectangles, triangles, semicercles...',
  'Per calcular-ne l\'àrea: 1. La <b>descomponem</b> en figures que sabem calcular. 2. Calculam l\'àrea de cada una. 3. Les <b>sumam</b> (o restam el tros que falta).',
  'Exemple: una forma de L es pot veure com un rectangle gran al qual li falta un rectangle petit a una cantonada.'],
 gen(lv){const t=lv===0?pick([0,1]):lv===1?pick([0,0,1]):pick([0,1,2]);
  if(t===0){let W,H,w,h;do{W=rnd(8,20);H=rnd(6,16);w=rnd(2,W-3);h=rnd(2,H-3)}while(W===H);const A=W*H-w*h,s=Math.min(220/W,140/H),x=(340-W*s)/2,y=28,X=v=>x+v*s,Y=v=>y+v*s;
   const P=[[X(0),Y(0)],[X(W-w),Y(0)],[X(W-w),Y(h)],[X(W),Y(h)],[X(W),Y(H)],[X(0),Y(H)]],R_=t=>t.replace('text-anchor="middle"','text-anchor="start"'),L_=t=>t.replace('text-anchor="middle"','text-anchor="end"');
   let g=poly(P)+lab(X(W/2),Y(H)+18,`${W} cm`)+L_(lab(X(0)-8,Y(H/2),`${H} cm`));
   g+=lv===0?lab(X(W-w/2),Y(0)-12,`${w} cm`,C.g)+R_(lab(X(W)+6,Y(h/2),`${h} cm`,C.g))+`<rect x="${X(W-w)}" y="${Y(0)}" width="${w*s}" height="${h*s}" fill="none" stroke="${C.g}" stroke-dasharray="5 4"/>`
    :lab(X((W-w)/2),Y(0)-10,`${W-w} cm`)+R_(lab(X(W)+6,Y(h+(H-h)/2),`${H-h} cm`));
   return{text:`Calcula l'àrea d'aquesta figura${lv===0?` (li falta el rectangle de punts)`:''}.`,fig:svg(340,Y(H)+32,g,320),fields:[fInt(cm2,A)],
    hints:['Imagina el rectangle sencer i el tros que li falta.',lv===0?`Rectangle gran: ${W} × ${H}. Tros que falta: ${w} × ${h}.`:`El tros que falta fa ${W} − ${W-w} d'ample i ${H} − ${H-h} d'alt.`],
    steps:[`Rectangle sencer: ${W} × ${H} = ${W*H} cm².`,`Tros que falta: ${w} × ${h} = ${w*h} cm²${lv?` (${w} = ${W} − ${W-w} i ${h} = ${H} − ${H-h})`:''}.`,`Àrea: ${W*H} − ${w*h} = <b>${A} cm²</b>.`],
    err:x=>{const y=val(x[0]);return y===2*(W+H)?'mt_area_perimetre':y===W*H?'mt_area_retall':null}}}
  if(t===1){let W,H,tt;do{W=rnd(6,16);H=rnd(4,12);tt=rnd(3,8)}while(W*tt%2);const A=W*H+W*tt/2,s=Math.min(220/W,150/(H+tt)),x=(340-W*s)/2,y=12,X=v=>x+v*s,Y=v=>y+v*s;
   const g=poly([[X(0),Y(tt)],[X(W/2),Y(0)],[X(W),Y(tt)],[X(W),Y(tt+H)],[X(0),Y(tt+H)]])+ln(X(0),Y(tt),X(W),Y(tt),{dash:1,c:C.g,w:1.5})+ln(X(W/2),Y(0),X(W/2),Y(tt),{dash:1,c:C.o,w:2})
    +lab(X(W/2)+8,Y(tt/2),`${tt} cm`,C.o).replace('text-anchor="middle"','text-anchor="start"')+lab(X(W/2),Y(tt+H)+18,`${W} cm`)+lab(X(0)-8,Y(tt+H/2),`${H} cm`).replace('text-anchor="middle"','text-anchor="end"');
   return{text:'Calcula l\'àrea d\'aquesta casa (un rectangle i un triangle).',fig:svg(340,Y(tt+H)+32,g,320),fields:[fDec(cm2,A)],
    hints:['Descompon la figura: un rectangle a baix i un triangle a dalt.',`El triangle té la mateixa base que el rectangle (${W} cm) i ${tt} cm d'altura.`],
    steps:[`Rectangle: ${W} × ${H} = ${W*H} cm².`,`Triangle: ${W} × ${tt} : 2 = ${W*tt/2} cm².`,`Total: ${W*H} + ${W*tt/2} = <b>${dc(A)} cm²</b>.`],
    err:x=>{const y=val(x[0]);return y===W*H+W*tt?'mt_area_meitat':y===W*H?'mt_area_retall':null}}}
  let W,H;do{W=rnd(3,8)*2;H=rnd(5,20)}while(W===H);const r=W/2,A=W*H+PI*r*r/2,s=Math.min(240/(H+r),130/W),x=(340-(H+r)*s)/2,y=12,X=v=>x+v*s,Y=v=>y+v*s;
  const g=`<path d="M${X(0)} ${Y(0)} H${X(H)} A${r*s} ${r*s} 0 0 1 ${X(H)} ${Y(W)} H${X(0)}Z" fill="${C.bl}" stroke="${C.b}" stroke-width="3"/>`+ln(X(H),Y(0),X(H),Y(W),{dash:1,c:C.g,w:1.5})
   +lab(X(H/2),Y(W)+18,`${H} cm`)+lab(X(0)-8,Y(W/2),`${W} cm`).replace('text-anchor="middle"','text-anchor="end"');
  return{text:'Calcula l\'àrea d\'aquesta figura: un rectangle amb un semicercle a la dreta. (π = 3,14)',fig:svg(340,Y(W)+32,g,320),fields:[fDec(cm2,A)],
   hints:['Descompon-la en un rectangle i un semicercle.',`El diàmetre del semicercle és ${W} cm, per tant el radi és ${r} cm.`],
   steps:[`Rectangle: ${H} × ${W} = ${W*H} cm².`,`Semicercle: 3,14 × ${r} × ${r} : 2 = ${dc(PI*r*r/2)} cm².`,`Total: ${W*H} + ${dc(PI*r*r/2)} = <b>${dc(A)} cm²</b>.`],
   err:x=>{const y=val(x[0]);return near(y,W*H+PI*r*r)?'mt_area_meitat':near(y,W*H+PI*W*W/2)?'mt_radi_diametre':null}}}},

/* ---------- Cossos geomètrics i volum ---------- */
mt_cossos:{mat:'mates',nom:'Cossos geomètrics',ab:'Cg',curs:[6],
 teoria:['Els <b>poliedres</b> són cossos limitats només per cares planes (polígons): els <b>prismes</b> tenen dues bases iguals i paral·leles i cares laterals rectangulars; les <b>piràmides</b> tenen una base i cares laterals triangulars que s\'ajunten en un vèrtex.',
  'Elements: <b>cares</b> (els polígons), <b>arestes</b> (on s\'ajunten dues cares) i <b>vèrtexs</b> (on s\'ajunten les arestes). El nom ve de la base: prisma pentagonal, piràmide hexagonal...',
  'Si la base té <i>n</i> costats: prisma → n + 2 cares, 2n vèrtexs, 3n arestes. Piràmide → n + 1 cares, n + 1 vèrtexs, 2n arestes.',
  '<b>Fórmula d\'Euler</b>: en tots aquests poliedres, cares + vèrtexs = arestes + 2.',
  'Els <b>cossos rodons</b> tenen superfícies corbes: el <b>cilindre</b> (dues bases circulars), el <b>con</b> (una base circular i un vèrtex) i l\'<b>esfera</b>.'],
 fig:()=>solidFig(5,false)+solidFig(4,true),
 gen(lv){const BN={3:'triangular',4:'quadrangular',5:'pentagonal',6:'hexagonal',7:'heptagonal',8:'octogonal',9:'enneagonal',10:'decagonal'},t=lv===0?0:pick([0,1,2]);
  if(t===0){const n=lv===0?rnd(3,5):lv===1?rnd(3,6):rnd(5,10),pyr=Math.random()<.5,F=pyr?n+1:n+2,V=pyr?n+1:2*n,A=pyr?2*n:3*n,nm=`${pyr?'piràmide':'prisma'} ${BN[n]}`,showF=lv<2||n<=6;
   return{text:`${showF?'Observa aquest cos: és una':'Pensa en una'} <b>${nm}</b>. Quantes cares, vèrtexs i arestes té?`,fig:showF?solidFig(n,pyr):null,fields:[{label:'Cares',ans:R(F)},{label:'Vèrtexs',ans:R(V)},{label:'Arestes',ans:R(A)}],
    hints:[`La base té ${n} costats. ${pyr?'Una piràmide té una base i una cara triangular per cada costat de la base.':'Un prisma té dues bases i una cara rectangular per cada costat de la base.'}`,'Comprova el resultat amb la fórmula d\'Euler: cares + vèrtexs = arestes + 2.'],
    steps:pyr?[`Cares: 1 base + ${n} triangles = ${F}.`,`Vèrtexs: ${n} de la base + 1 de dalt = ${V}. Arestes: ${n} de la base + ${n} laterals = ${A}.`,`Euler: ${F} + ${V} = ${A} + 2 ✓. Resposta: <b>${F} cares, ${V} vèrtexs i ${A} arestes</b>.`]
     :[`Cares: 2 bases + ${n} rectangles = ${F}.`,`Vèrtexs: ${n} a cada base → ${V}. Arestes: ${n} a cada base + ${n} laterals = ${A}.`,`Euler: ${F} + ${V} = ${A} + 2 ✓. Resposta: <b>${F} cares, ${V} vèrtexs i ${A} arestes</b>.`],
    err:x=>{const c=val(x[0]),v=val(x[1]),a=val(x[2]);return c+v!==a+2?'mt_euler':null}}}
  if(t===1){const n=rnd(3,10),pyr=Math.random()<.5,F=pyr?n+1:n+2,V=pyr?n+1:2*n,A=pyr?2*n:3*n,ask=pick(['F','V','A']);
   const kn=ask==='F'?`${V} vèrtexs i ${A} arestes`:ask==='V'?`${F} cares i ${A} arestes`:`${F} cares i ${V} vèrtexs`,ans={F,V,A}[ask],w={F:'cares',V:'vèrtexs',A:'arestes'}[ask];
   return{text:`Un poliedre té ${kn}. Quantes <b>${w}</b> té?`,fields:[fInt(w[0].toUpperCase()+w.slice(1),ans)],
    hints:['Fes servir la fórmula d\'Euler.','Cares + vèrtexs = arestes + 2.'],
    steps:['Fórmula d\'Euler: C + V = A + 2.',ask==='A'?`${F} + ${V} = A + 2 → A = ${F+V} − 2.`:ask==='F'?`C + ${V} = ${A} + 2 → C = ${A+2} − ${V}.`:`${F} + V = ${A} + 2 → V = ${A+2} − ${F}.`,`Té <b>${ans} ${w}</b>.`],
    err:x=>{const y=val(x[0]);return(ask==='A'&&y===F+V)||(ask==='F'&&y===A-V)||(ask==='V'&&y===A-F)?'mt_euler':null}}}
  const Q=[['Cos rodó amb dues bases circulars iguals i una superfície lateral corba.',['cilindre'],'r'],['Cos rodó amb una base circular i un vèrtex.',['con'],'r'],['Cos rodó sense bases ni vèrtexs: tots els seus punts són a la mateixa distància del centre.',['esfera'],'r'],
   ['Poliedre amb 6 cares que són quadrats iguals.',['cub','hexàedre'],''],['Poliedre amb dues bases hexagonals i 6 cares laterals rectangulars.',['prisma hexagonal'],'p'],['Poliedre amb una base quadrada i 4 cares triangulars que s\'ajunten en un vèrtex.',['piràmide quadrangular','piràmide quadrada'],'y'],
   ['Poliedre amb dues bases triangulars i 3 cares laterals rectangulars.',['prisma triangular'],'p'],['Poliedre amb una base pentagonal i 5 cares triangulars que s\'ajunten en un vèrtex.',['piràmide pentagonal'],'y']];
  const[d,ans,k]=pick(Q);
  return{text:`Quin cos geomètric és?<br><i>${d}</i>`,fields:[fTxt('Nom del cos',ans)],
   hints:['Té cares planes (poliedre) o superfícies corbes (cos rodó)?','Quantes bases té? Les cares laterals s\'ajunten en un vèrtex?'],
   steps:['Prisma: 2 bases iguals. Piràmide: 1 base i un vèrtex. Cilindre: 2 bases circulars. Con: 1 base circular i un vèrtex. Esfera: cap base.',`Descripció: ${d}`,`És ${/^[aeiouàèéíòóú]/i.test(ans[0])?'l\'':'el '}<b>${ans[0]}</b>.`.replace('el <b>piràmide','la <b>piràmide').replace('l\'<b>esfera','l\'<b>esfera')],
   err:x=>{const f=fo(x[0]);if(k==='p'&&f.includes('piramide'))return'mt_prisma_piramide';if(k==='y'&&f.includes('prisma'))return'mt_prisma_piramide';if(ans[0]==='cilindre'&&f==='con'||ans[0]==='con'&&f==='cilindre')return'mt_prisma_piramide';return null}}}},
mt_volum:{mat:'mates',nom:'Volum del cub i de l\'ortoedre',ab:'Vo',curs:[6],
 teoria:['El <b>volum</b> és l\'espai que ocupa un cos. El podem comptar en cubs d\'1 cm³ (cubs d\'1 cm d\'aresta).',
  '<b>Ortoedre</b> (prisma rectangular, com una capsa): V = llarg × ample × alt. <b>Cub:</b> V = aresta × aresta × aresta = a³.',
  'Exemple: una capsa de 5 cm × 3 cm × 2 cm → V = 5 × 3 × 2 = <b>30 cm³</b> (hi caben 30 cubets).',
  'Per saber quants litres hi caben, recorda: <b>1 dm³ = 1 litre</b> i 1.000 cm³ = 1 litre.'],
 fig:()=>boxFig(4,3,2,{grid:true,ll:'llarg',la:'ample',lh:'alt'}),
 gen(lv){const t=lv===0?pick([0,1,2]):lv===1?pick([0,1,3]):pick([1,3,4]);
  if(t===0){const a=rnd(2,lv?12:9),V=a**3;
   return{text:`Calcula el volum d'un <b>cub</b> de ${a} cm d'aresta.`,fig:boxFig(1,1,1,{ll:`${a} cm`,lh:`${a} cm`,la:`${a} cm`}),fields:[fInt('Volum (cm³)',V)],
    hints:['V = aresta × aresta × aresta.',`Multiplica ${a} × ${a} × ${a}.`],steps:['V = a × a × a.',`${a} × ${a} = ${a*a}; ${a*a} × ${a} = ${num(V)}.`,`El volum és <b>${num(V)} cm³</b>.`],
    err:x=>{const y=val(x[0]);return y===3*a?'mt_volum_suma':y===a*a?'mt_volum_base':null}}}
  if(t===1||t===2){let l,a,h;do{l=rnd(2,t===2?6:lv?15:10);a=rnd(2,t===2?4:lv?12:8);h=rnd(2,t===2?4:lv?12:8)}while(l===a&&a===h);const V=l*a*h;
   return{text:t===2?`Aquest ortoedre està fet de cubets d'1 cm³. Quants cubets té? (és el seu volum en cm³)`:`Calcula el volum d'aquesta <b>capsa</b> (ortoedre).`,fig:boxFig(l,a,h,{grid:t===2,ll:`${l} cm`,la:`${a} cm`,lh:`${h} cm`}),fields:[fInt('Volum (cm³)',V)],
    hints:[t===2?'Compta els cubets d\'una capa i després quantes capes hi ha.':'V = llarg × ample × alt.',`${l} × ${a} = ${l*a} cubets a cada capa.`],
    steps:[`Una capa: ${l} × ${a} = ${l*a}.`,`${h} capes: ${l*a} × ${h} = ${num(V)}.`,`El volum és <b>${num(V)} cm³</b>.`],
    err:x=>{const y=val(x[0]);return y===l+a+h?'mt_volum_suma':y===l*a?'mt_volum_base':null}}}
  if(t===3){const l=rnd(3,8)*10,a=rnd(2,5)*10,h=rnd(2,6)*10,Vc=l*a*h,L=Vc/1000;
   return{text:`Un aquari fa <b>${l} cm</b> de llarg, <b>${a} cm</b> d'ample i <b>${h} cm</b> d'alt. Quants litres d'aigua hi caben?`,fig:boxFig(l,a,h,{ll:`${l} cm`,la:`${a} cm`,lh:`${h} cm`}),fields:[fDec('Capacitat (litres)',L)],
    hints:['Calcula primer el volum en cm³.','1.000 cm³ = 1 litre. Divideix entre 1.000.'],
    steps:[`V = ${l} × ${a} × ${h} = ${num(Vc)} cm³.`,`${num(Vc)} cm³ : 1.000 = ${dc(L)} dm³.`,`1 dm³ = 1 l → hi caben <b>${dc(L)} litres</b>.`],
    err:x=>{const y=val(x[0]);return y===Vc?'mt_problema_pas':near(y,Vc/100)||near(y,Vc/10)||near(y,Vc/10000)?'mt_vol_1000':y===l+a+h?'mt_volum_suma':null}}}
  const l=rnd(3,12),a=rnd(2,10),h=rnd(2,10),V=l*a*h;
  return{text:`Una capsa té un volum de <b>${num(V)} cm³</b>. Fa <b>${l} cm</b> de llarg i <b>${a} cm</b> d'ample. Quant fa d'alt?`,fields:[fInt('Altura (cm)',h)],
   hints:['V = llarg × ample × alt. Calcula primer l\'àrea de la base.',`La base fa ${l} × ${a} = ${l*a} cm². Quantes vegades hi cap dins el volum?`],
   steps:[`Base: ${l} × ${a} = ${l*a} cm².`,`Alt = ${num(V)} : ${l*a} = ${h}.`,`Fa <b>${h} cm</b> d'alt.`],
   err:x=>val(x[0])===V-l-a?'mt_volum_suma':null}}}
});
})();
