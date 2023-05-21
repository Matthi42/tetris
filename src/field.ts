import { getBlockPosForPice } from "./game"

const rows = 20
const lines = 10

export const drawField = (ctx: CanvasRenderingContext2D, state: FieldDrawState) => {
    const settings: CanvasSettings = {
        width: ctx.canvas.width,
        height: ctx.canvas.height
    }
    ctx.clearRect(0,0,settings.width,settings.height)
    drawGrid(ctx,settings)
    drawPice(ctx, settings, state)

}

const drawGrid = (ctx: CanvasRenderingContext2D, canvasSettings: CanvasSettings) => {
    const path = new Path2D()
    const space = canvasSettings.width / lines
    //horizontal lines
    for (let i = 0; i <= rows; i++) {
        path.moveTo(0, i * space)
        path.lineTo(canvasSettings.width, i * space)            
    }
    //vertical lines
    for (let i = 0; i <= lines; i++) {
        path.moveTo(i * space, 0)
        path.lineTo(i * space, canvasSettings.height)
    }
    ctx.stroke(path)
}

const drawPice = (ctx: CanvasRenderingContext2D, canvasSettings: CanvasSettings, state: FieldDrawState) => {
    const space = canvasSettings.width / lines
    ctx.fillStyle = state.pice.color
    state.pice.coords.forEach(c => {
        ctx.fillRect(c.x * space, c.y* space, space, space)
    })
    state.layingPices.forEach(c => {
        ctx.fillStyle = c.color
        ctx.fillRect(c.coord.x * space, c.coord.y* space, space, space)

    })

}

export const drawPreview = (holdCtx: CanvasRenderingContext2D, previewCtx: CanvasRenderingContext2D, state: GameState) => {
    const space = previewCtx.canvas.width/ 3
    previewCtx.clearRect(0,0,previewCtx.canvas.width,previewCtx.canvas.height)
    state.nextPices.forEach((p, i) => {
        p.rotation = 0
        p.pos = {x:1, y: i*4}
        previewCtx.fillStyle = p.color;
        getBlockPosForPice(p).forEach(b => {
            previewCtx.fillRect(b.x * space, b.y * space, space, space)
        })
        p.pos = { x: 4, y:-2 }
    })
    holdCtx.clearRect(0,0,holdCtx.canvas.width,holdCtx.canvas.height)
    if (state.savedPice){
        state.savedPice.rotation = 0
        state.savedPice.pos = {x:1, y: 0}
        holdCtx.fillStyle = state.savedPice.color
        getBlockPosForPice(state.savedPice).forEach(b => {
            holdCtx.fillRect(b.x * space, b.y* space, space, space)
        })

        state.savedPice.pos = { x: 4, y:-2 }
    }

}

export const updateScore = (state: GameState, score: HTMLElement, linesCleared: HTMLElement, level: HTMLElement) => {
    score.innerHTML = state.score as any
    linesCleared.innerHTML = state.linesCleared as any
    level.innerHTML = state.level as any
}