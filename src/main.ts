import { drawField, drawPreview, updateScore } from './field'
import { dropActivePice, gameToDrawState, instantDrop, moveActivePiceLeft, moveActivePiceRight, newRandomPice, savePice, spinActivePice } from './game'
import { openMenu } from './menu'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

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
`
//setup game canvas
const canvas = document.createElement('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
//setup preview canvas
const previewCanvas: HTMLCanvasElement = document.createElement('canvas')
const previewCtx = previewCanvas.getContext('2d') as CanvasRenderingContext2D
// setup hold canvas 
const holdCanvas: HTMLCanvasElement = document.createElement('canvas')
const holdCtx = holdCanvas.getContext('2d') as CanvasRenderingContext2D

const setSize = () => {
  canvas.width = Math.round((window.innerHeight * 0.45)/ 10) * 10
  canvas.height = canvas.width * 2
  previewCanvas.width = canvas.width * 0.3
  previewCanvas.height = canvas.width * 1.2
  holdCanvas.width = canvas.width * 0.3
  holdCanvas.height = canvas.width * 0.4
}
window.addEventListener('resize', setSize)
setSize()

//score thing
const score = document.querySelector('#score') as HTMLElement
const linesCleared = document.querySelector('#cleared') as HTMLElement
const level = document.querySelector('#level') as HTMLElement



score.innerHTML = 0 as any as string

document.querySelector('#game')?.appendChild(canvas)
document.querySelector('#right')?.appendChild(previewCanvas)
document.querySelector('#left')?.prepend(holdCanvas)

//setup menu
export const menu = document.querySelector('#menu') as HTMLDialogElement
const startButton = document.querySelector('#startButton') as HTMLElement



//setup initial playing field
const gameState: GameState = {
  hasSaved: false,
  nextPices: [0,0,0].map(() => newRandomPice()),
  activePice: newRandomPice(), 
  layingPices: [],
  lookup: new Array(10).fill([]).map(() => new Array(20).fill(false)),
  speed: 500,
  spedUp: false,
  score: 0,
  linesCleared: 0,
  level: 1,
  gameOver: false
}


openMenu(gameState)

startButton.addEventListener('click', () => {
  menu.close('')
  if(gameState.gameOver) {
      gameState.hasSaved = false
      gameState.nextPices = [0,0,0].map(() => newRandomPice())
      gameState.activePice = newRandomPice()
      gameState.savedPice = undefined
      gameState.layingPices = []
      gameState.lookup = new Array(10).fill([]).map(() => new Array(20).fill(false))
      gameState.speed = 500
      gameState.spedUp = false
      gameState.score = 0
      gameState.linesCleared = 0
      gameState.level = 1
      gameState.gameOver = false
  }
  animate(0)
})




//setup key event listener
document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (gameState.gameOver) return
  switch(event.key) {
    case 'ArrowLeft':
      moveActivePiceLeft(gameState)
      break
    case 'ArrowRight':
      moveActivePiceRight(gameState)
      break   
    case 'ArrowUp':
      savePice(gameState)
      break   
    case 's':
      spinActivePice(gameState)
      break 
    case 'd':
      instantDrop(gameState)
        break 
    case 'ArrowDown':
      gameState.spedUp = true
      break
    default:
      return
  }
   event.preventDefault();
})
document.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    gameState.spedUp = false
  }

})


drawField(ctx, gameToDrawState(gameState))


let lastUpdate = 0
let frame = 0
const animate = (timestamp: number) => {
  frame = requestAnimationFrame(animate)
  //drop the pice  
  
  if(timestamp - lastUpdate > (gameState.spedUp ? gameState.speed * 0.2 :gameState.speed)) {
    dropActivePice(gameState, frame)
    lastUpdate = timestamp
  }
  drawField(ctx, gameToDrawState(gameState))
  drawPreview(holdCtx, previewCtx, gameState)
  updateScore(gameState, score, linesCleared, level)
}

export const pause = () => {
  cancelAnimationFrame(frame)
}
export const continueGame = () => {
  animate(lastUpdate)
}
document.querySelector('#continue')?.addEventListener('click', () => {
  (document.querySelector('#paused') as HTMLDialogElement)?.close()
  animate(lastUpdate)
})
document.querySelector('#pause')?.addEventListener('click', () => {
  (document.querySelector('#paused') as HTMLDialogElement)?.showModal();
  (document.querySelector('#pausedScore') as HTMLElement).innerText = `score: ${gameState.score}`
  pause()
})