/* Aprenem - utilitats generals (nombres, fraccions)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */
/* ===================== utilitats ===================== */
const $=s=>document.querySelector(s);
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const lcm=(a,b)=>a/gcd(a,b)*b;
const R=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(Math.abs(n),d)||1;return{n:n/g,d:d/g}};
const req=(a,b)=>a.n*b.d===b.n*a.d;
const F=(n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const fmtR=r=>r.d===1?`${r.n}`:`${r.n}/${r.d}`;
const dec=h=>(h/100).toFixed(2).replace('.',',').replace(/,?0+$/,'');
const dec2=h=>(h/100).toFixed(2).replace('.',',');
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const once=f=>{let c=false;return(...a)=>{if(!c){c=true;f(...a)}}};
const ORD={1:'1r',2:'2n',3:'3r',4:'4t',5:'5è',6:'6è'};
const mmss=ms=>`${Math.floor(ms/60000)}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}`;
function parseVal(s){
  s=(s||'').trim().replace(/\s+/g,' ');let m;
  if(m=s.match(/^(\d+) (\d+)\s*\/\s*(\d+)$/)){const d=+m[3];return d?R(+m[1]*d+ +m[2],d):null}
  if(m=s.match(/^(-?\d+)\s*\/\s*(\d+)$/))return +m[2]?R(+m[1],+m[2]):null;
  if(m=s.match(/^(-?\d+)(?:[.,](\d+))?$/)){const f=m[2]||'';return R(parseInt(m[1]+f,10),10**f.length)}
  return null;
}
const barHTML=(parts,on,click)=>`<div class="bar${click?' click':''}">${Array.from({length:parts},(_,i)=>`<div class="${i<on?'on':''}" data-i="${i}"></div>`).join('')}</div>`;
const groupsHTML=(d,k,on,click)=>`<div class="dots">${Array.from({length:d},(_,i)=>`<div class="grp${i<on?' on':''}" data-i="${i}" style="${click?'cursor:pointer':''}">${'<span class="dot"></span>'.repeat(k)}</div>`).join('')}</div>`;

