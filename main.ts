import f from'node:fs'
let E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output'
let W,N,D,t
let F=(a,b)=>{let p=[],q=[a];p[a]=1;for(let c of q){for(let j=0;j<4;j++){let n=c+D[j];if(!p[n]&&t[n]!='#'&&!b[n]){p[n]=c*4+j+1;q.push(n)}}}return p}
let K=(p,x,a)=>{let w='';for(;x!=a;x=(p[x]-1)>>2)w='rldu'[(p[x]-1)&3]+w;return w}
let B=x=>x.reduce((a,y)=>(a[y]=1,a),new Uint8Array(N))
let m=p=>p.findIndex(x=>x)
let S=u=>{
u=u.trim();W=u.indexOf('\n');t=u.replace(/\n/g,'');N=t.length;D=[1,-1,W,-W]
let b=[],g=[],P=0
for(let i=0;i<N;i++){let c=t[i];if(c=='$'||c=='*')b.push(i);if('.*+'.includes(c))g.push(i);if('@+'.includes(c))P=i}
let Y=(P/W)|0,R=[],Hm=new Uint8Array(N)
for(let i=0;i<W;i++)Hm[Y*W+i]=1
for(let s of b){if(R.some(r=>r[s]))continue;let p=F(s,Hm),M=new Uint8Array(N);for(let k in p)M[k]=1;R.push(M)}
let A=b,Gb=B(g),mv='',cur=P
for(let M of R){
let e=0
for(let x=0;x<W;x++){let c=Y*W+x;if(M[c-W]||M[c+W]){e=c;break}}
let p=F(cur,B(A));mv+=K(p,e,cur);cur=e
let q=g.filter(x=>M[x]),Lv=B(q)
for(let s of q){for(let j=0;j<4;j++){let x=s-D[j];if(M[x]&&!Lv[x]&&t[x-D[j]]!='#'){Lv[x]=1;q.push(x)}}}
let qu=[[A,cur,'']],seen={},dn=null,z=1
seen[A+','+m(p)]=1
for(let[bx,pl,ms]of qu){
if(!bx.some(x=>M[x]&&!Gb[x])){dn=[ms,pl,bx];break}
let m2=B(bx),pp=F(pl,m2)
for(let i in bx)for(let j=0;j<4;j++){let de=bx[i]+D[j],sd=bx[i]-D[j];if(pp[sd]&&M[de]&&!m2[de]&&Lv[de]){let nb=bx.slice();nb[i]=de;nb.sort((x,y)=>x-y);let ky=nb+','+m(F(bx[i],B(nb)));if(!seen[ky]){seen[ky]=1;z++;qu.push([nb,bx[i],ms+K(pp,sd,pl)+'rldu'[j]])}}}
if(z>2e5)break
}
if(!dn)return ''
mv+=dn[0];cur=dn[1];A=dn[2]
}
return mv
}
for(let d of f.readdirSync(I)){f.mkdirSync(O+'/'+d,{recursive:!0});f.writeFileSync(O+'/'+d+'/solution.txt',S(f.readFileSync(I+'/'+d+'/level.txt','utf8')))}
