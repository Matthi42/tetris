(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const q=c=>{if(w(),c.score>0){const o=document.querySelector("#gameInfo");let e=document.querySelector("#scoreO");if(e||(e=document.createElement("p"),e.id="scoreO"),e.innerText=`score: ${c.score}`,!document.querySelector("#gameOver")){const s=document.createElement("p");s.id="gameOver",s.innerText="Game Over",o.append(s)}let n=document.querySelector("#nameInput");n||(n=document.createElement("input"),n.id="nameInput",n.type="text");let t=document.querySelector("#saveButton");t||(t=document.createElement("button"),t.id="saveButton",t.innerText="save",t.addEventListener("click",()=>{const s={name:n==null?void 0:n.value,score:c.score},a=JSON.parse(localStorage.getItem("scoreboard"))??[];a.push(s),a.sort((p,B)=>B.score-p.score),localStorage.setItem("scoreboard",JSON.stringify(a)),w(),o.removeChild(n),o.removeChild(t)})),o.append(e,n,t)}h.open||h.showModal()},w=()=>{const c=document.querySelector("#scoreboard"),o=JSON.parse(localStorage.getItem("scoreboard"))??[];c.innerHTML="",o.forEach((e,n)=>{const t=document.createElement("td");t.innerText=n+1;const s=document.createElement("td");s.innerText=e.name;const a=document.createElement("td");a.innerHTML=e.score;const p=document.createElement("tr");p.append(t,s,a),c==null||c.append(p)})},O=(c,o)=>d(c.activePice).map(({x:n,y:t})=>r(n,t+1)).find(({x:n,y:t})=>t>19||c.lookup[n][t])?(D(c,o),!1):(c.activePice.pos.y+=1,!0),C=c=>{!d(c.activePice).map(({x:e,y:n})=>r(e+1,n)).find(({x:e,y:n})=>e>9||c.lookup[e][n])&&(c.activePice.pos.x+=1)},H=c=>{!d(c.activePice).map(({x:e,y:n})=>r(e-1,n)).find(({x:e,y:n})=>e<0||c.lookup[e][n])&&(c.activePice.pos.x-=1)},I=c=>{const o={...c.activePice,rotation:(c.activePice.rotation+1)%4};!d(o).some(({x:n,y:t})=>n<0||n>9||t>19||c.lookup[n][t])&&(c.activePice.rotation=(c.activePice.rotation+1)%4)},T=c=>({layingPices:c.layingPices,pice:{color:c.activePice.color,coords:d(c.activePice)}}),U=c=>{let o=0;for(;O(c,1);)o++;c.score+=o*2*c.level},D=(c,o)=>{let e=!1;c.layingPices=c.layingPices.concat(d(c.activePice).map(n=>({color:c.activePice.color,coord:n}))),d(c.activePice).forEach(({x:n,y:t})=>{t==-1&&(e=!0),c.lookup[n][t]=!0}),e?(cancelAnimationFrame(o),c.gameOver=!0,q(c)):(N(c),c.activePice=c.nextPices.shift(),c.nextPices.push(u()),c.hasSaved=!1,c.score+=c.level*(c.spedUp?15:10))},F=c=>{if(!c.hasSaved){if(c.savedPice){const o=c.activePice;c.activePice=c.savedPice,c.activePice.pos={x:4,y:-2},c.activePice.rotation=0,c.savedPice=o}else c.savedPice=c.activePice,c.activePice=c.nextPices.shift(),c.nextPices.push(u());c.hasSaved=!0}},N=c=>{const o=[];for(let e=0;e<20;e++)for(let n=0;n<10&&c.lookup[n][e];n++)n===9&&o.push(e);o.forEach(e=>{c.layingPices.forEach((n,t)=>{c.lookup[n.coord.x][n.coord.y]=!1,n.coord.y===e?delete c.layingPices[t]:n.coord.y<e&&(n.coord.y+=1)}),c.score+=c.level*100}),c.layingPices.forEach(e=>{c.lookup[e.coord.x][e.coord.y]=!0}),c.linesCleared+=o.length,c.level<Math.floor(c.linesCleared/10)+1&&(c.speed*=.8),c.level=Math.floor(c.linesCleared/10)+1,o.length==4&&(c.score+=c.level*200)},d=c=>{let o=c.pos.x,e=c.pos.y;switch(c.type){case"o":return[r(o,e),r(o+1,e),r(o,e+1),r(o+1,e+1)];case"i":switch(c.rotation){case 0:return[r(o+1,e),r(o+1,e+1),r(o+1,e+2),r(o+1,e+3)];case 1:return[r(o-1,e+2),r(o,e+2),r(o+1,e+2),r(o+2,e+2)];case 2:return[r(o,e),r(o,e+1),r(o,e+2),r(o,e+3)];case 3:return[r(o-1,e+1),r(o,e+1),r(o+1,e+1),r(o+2,e+1)]}case"l":switch(c.rotation){case 0:return[r(o,e),r(o,e+1),r(o,e+2),r(o+1,e+2)];case 1:return[r(o-1,e+1),r(o,e+1),r(o+1,e+1),r(o-1,e+2)];case 2:return[r(o,e),r(o,e+1),r(o,e+2),r(o-1,e)];case 3:return[r(o-1,e+1),r(o,e+1),r(o+1,e+1),r(o+1,e)]}case"j":switch(c.rotation){case 0:return[r(o,e),r(o,e+1),r(o,e+2),r(o-1,e+2)];case 1:return[r(o-1,e+1),r(o,e+1),r(o+1,e+1),r(o-1,e)];case 2:return[r(o,e),r(o,e+1),r(o,e+2),r(o+1,e)];case 3:return[r(o-1,e+1),r(o,e+1),r(o+1,e+1),r(o+1,e+2)]}case"z":switch(c.rotation){case 0:return[r(o,e),r(o,e+1),r(o-1,e),r(o+1,e+1)];case 1:return[r(o+1,e+1),r(o,e+1),r(o+1,e),r(o,e+2)];case 2:return[r(o,e+1),r(o,e+2),r(o-1,e+1),r(o+1,e+2)];case 3:return[r(o,e+1),r(o-1,e+1),r(o,e),r(o-1,e+2)]}case"s":switch(c.rotation){case 0:return[r(o,e),r(o,e+1),r(o+1,e),r(o-1,e+1)];case 1:return[r(o+1,e+1),r(o,e+1),r(o+1,e+2),r(o,e)];case 2:return[r(o,e+1),r(o,e+2),r(o+1,e+1),r(o-1,e+2)];case 3:return[r(o,e+1),r(o-1,e+1),r(o,e+2),r(o-1,e)]}case"t":switch(c.rotation){case 0:return[r(o,e+1),r(o-1,e+1),r(o+1,e+1),r(o,e+2)];case 1:return[r(o,e),r(o,e+1),r(o,e+2),r(o-1,e+1)];case 2:return[r(o,e+1),r(o-1,e+1),r(o+1,e+1),r(o,e)];case 3:return[r(o,e),r(o,e+1),r(o,e+2),r(o+1,e+1)]}}},r=(c,o)=>({x:c,y:o}),u=()=>{let c={x:4,y:-2};switch(Math.floor(Math.random()*7)){case 0:return{type:"i",color:"cyan",pos:c,rotation:0};case 1:return{type:"l",color:"orange",pos:c,rotation:0};case 2:return{type:"j",color:"blue",pos:c,rotation:0};case 3:return{type:"z",color:"red",pos:c,rotation:0};case 4:return{type:"s",color:"lightgreen",pos:c,rotation:0};case 5:return{type:"t",color:"purple",pos:c,rotation:0};default:return{type:"o",color:"yellow",pos:c,rotation:0}}},z=20,f=10,x=(c,o)=>{const e={width:c.canvas.width,height:c.canvas.height};c.clearRect(0,0,e.width,e.height),J(c,e),j(c,e,o)},J=(c,o)=>{const e=new Path2D,n=o.width/f;for(let t=0;t<=z;t++)e.moveTo(0,t*n),e.lineTo(o.width,t*n);for(let t=0;t<=f;t++)e.moveTo(t*n,0),e.lineTo(t*n,o.height);c.stroke(e)},j=(c,o,e)=>{const n=o.width/f;c.fillStyle=e.pice.color,e.pice.coords.forEach(t=>{c.fillRect(t.x*n,t.y*n,n,n)}),e.layingPices.forEach(t=>{c.fillStyle=t.color,c.fillRect(t.coord.x*n,t.coord.y*n,n,n)})},G=(c,o,e)=>{const n=o.canvas.width/3;o.clearRect(0,0,o.canvas.width,o.canvas.height),e.nextPices.forEach((t,s)=>{t.rotation=0,t.pos={x:1,y:s*4},o.fillStyle=t.color,d(t).forEach(a=>{o.fillRect(a.x*n,a.y*n,n,n)}),t.pos={x:4,y:-2}}),c.clearRect(0,0,c.canvas.width,c.canvas.height),e.savedPice&&(e.savedPice.rotation=0,e.savedPice.pos={x:1,y:0},c.fillStyle=e.savedPice.color,d(e.savedPice).forEach(t=>{c.fillRect(t.x*n,t.y*n,n,n)}),e.savedPice.pos={x:4,y:-2})},$=(c,o,e,n)=>{o.innerHTML=c.score,e.innerHTML=c.linesCleared,n.innerHTML=c.level};document.querySelector("#app").innerHTML=`

    <dialog id="menu">
      <main>
        <h1>Tetris</h1>
        <div id="gameInfo"></div>
        <h3>scoreboard</h3>
          <table>
            <thead>
              <tr>
                <th>place</th>
                <th>name</th>
                <th>score</th>
              </tr>
            </thead>
            <tbody id="scoreboard"></tbody>
          </table>
        <button id="startButton">start game</button>
      </main>
    </dialog>
    <dialog id="paused">
      <div class="split">
        <p id="pausedScore"></p>
        <button id="continue">continue</button>
      </div>
    </dialog>

  <div id="main">
    <div id="left">
      <div><span>level: </span><span id="level"></span></div>
      <div><span>score: </span><span id="score"></span></div>
      <div><span>Lines cleared: </span><span id="cleared"></span></div>
      <button id="pause">pause</button>
    </div>
    <div id="game"></div>
    <div id="right"></div>
  </div>
`;const l=document.createElement("canvas"),A=l.getContext("2d"),v=document.createElement("canvas"),K=v.getContext("2d"),m=document.createElement("canvas"),Q=m.getContext("2d"),M=()=>{l.width=Math.round(window.innerHeight*.45/10)*10,l.height=l.width*2,v.width=l.width*.3,v.height=l.width*1.2,m.width=l.width*.3,m.height=l.width*.4};window.addEventListener("resize",M);M();const R=document.querySelector("#score"),V=document.querySelector("#cleared"),W=document.querySelector("#level");R.innerHTML=0;var S;(S=document.querySelector("#game"))==null||S.appendChild(l);var b;(b=document.querySelector("#right"))==null||b.appendChild(v);var E;(E=document.querySelector("#left"))==null||E.prepend(m);const h=document.querySelector("#menu"),X=document.querySelector("#startButton"),i={hasSaved:!1,nextPices:[0,0,0].map(()=>u()),activePice:u(),layingPices:[],lookup:new Array(10).fill([]).map(()=>new Array(20).fill(!1)),speed:500,spedUp:!1,score:0,linesCleared:0,level:1,gameOver:!1};q(i);X.addEventListener("click",()=>{h.close(""),i.gameOver&&(i.hasSaved=!1,i.nextPices=[0,0,0].map(()=>u()),i.activePice=u(),i.savedPice=void 0,i.layingPices=[],i.lookup=new Array(10).fill([]).map(()=>new Array(20).fill(!1)),i.speed=500,i.spedUp=!1,i.score=0,i.linesCleared=0,i.level=1,i.gameOver=!1),g(0)});document.addEventListener("keydown",c=>{if(!i.gameOver){switch(c.key){case"ArrowLeft":H(i);break;case"ArrowRight":C(i);break;case"ArrowUp":F(i);break;case"s":I(i);break;case"d":U(i);break;case"ArrowDown":i.spedUp=!0;break;default:return}c.preventDefault()}});document.addEventListener("keyup",c=>{c.key==="ArrowDown"&&(i.spedUp=!1)});x(A,T(i));let y=0,P=0;const g=c=>{P=requestAnimationFrame(g),c-y>(i.spedUp?i.speed*.2:i.speed)&&(O(i,P),y=c),x(A,T(i)),G(Q,K,i),$(i,R,V,W)},Y=()=>{cancelAnimationFrame(P)};var L;(L=document.querySelector("#continue"))==null||L.addEventListener("click",()=>{var c;(c=document.querySelector("#paused"))==null||c.close(),g(y)});var k;(k=document.querySelector("#pause"))==null||k.addEventListener("click",()=>{var c;(c=document.querySelector("#paused"))==null||c.showModal(),document.querySelector("#pausedScore").innerText=`score: ${i.score}`,Y()});