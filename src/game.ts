import { openMenu } from "./menu"


export const dropActivePice = (state: GameState, frame: number) => {
    //check if a pice is on the bottom
    const possible = !getBlockPosForPice(state.activePice)
        .map(({x,y}) => (c(x,y+1)))
        .find(({x,y}) => y > 19 || state.lookup[x][y])
    if(possible){
        state.activePice.pos.y += 1
        return true
    } else {
        //TODO handle everthing (pice will lay down)
        newPice(state, frame)
        return false
    }
}
export const moveActivePiceRight = (state: GameState) => {
    //check if fields on the right are free
    const possible = !getBlockPosForPice(state.activePice)
        .map(({x,y}) => (c(x+1,y)))
        .find(({x,y}) => x > 9 || state.lookup[x][y])
    if(possible) state.activePice.pos.x += 1
}
export const moveActivePiceLeft = (state: GameState) => {
    const possible = !getBlockPosForPice(state.activePice)
        .map(({x,y}) => (c(x-1,y)))
        .find(({x,y}) => x < 0 || state.lookup[x][y])
    if(possible) state.activePice.pos.x -= 1
}
export const spinActivePice = (state: GameState) => {
    const turnedPice = {...state.activePice, rotation: (state.activePice.rotation + 1) % 4 }
    const possible = !getBlockPosForPice(turnedPice as any)
        .some(({x,y}) => x < 0 || x > 9 || y > 19 || state.lookup[x][y])
    if (possible) state.activePice.rotation = (state.activePice.rotation + 1) % 4 as any
}

export const gameToDrawState = (state: GameState) => ({
        layingPices: state.layingPices,
        pice: { color: state.activePice.color, coords: getBlockPosForPice(state.activePice) }
    } as FieldDrawState)

export const instantDrop = (state: GameState) => {
    let dropHeight = 0
    while(dropActivePice(state, 1)){ dropHeight++ }
    state.score += dropHeight * 2 * state.level
}

const newPice = (state: GameState, frame: number) => {
    let lost = false
    state.layingPices = state.layingPices.concat(getBlockPosForPice(state.activePice).map(e => ({
        color: state.activePice.color,
        coord: e
    })))
    getBlockPosForPice(state.activePice).forEach(({x,y}) => {
        if (y == -1) 
            lost = true
        state.lookup[x][y] = true 
        })
    if (!lost) {
        clearRows(state)
        state.activePice = state.nextPices.shift() as Pice
        state.nextPices.push(newRandomPice())
        state.hasSaved = false
        state.score += state.level * (state.spedUp ? 15 : 10)
    } else {
        cancelAnimationFrame(frame)
        state.gameOver = true
        openMenu(state)
    }
}

export const savePice = (state: GameState) => {
    if (!state.hasSaved) {
        if (state.savedPice) {
            const p = state.activePice
            state.activePice = state.savedPice
            state.activePice.pos = { x: 4, y:-2 }
            state.activePice.rotation = 0
            state.savedPice = p
        } else {
            state.savedPice = state.activePice
            state.activePice = state.nextPices.shift() as Pice
            state.nextPices.push(newRandomPice())
        }
        state.hasSaved = true
    }
}

const clearRows = (state: GameState) => {
    const fullLines:  number[] = [] 
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            if(!state.lookup[x][y])
                break
            if(x === 9) 
                fullLines.push(y)
        }
    }
    fullLines.forEach((l) => {
        state.layingPices.forEach((p,i) => {
            state.lookup[p.coord.x][p.coord.y] = false
            if(p.coord.y === l) {
                delete state.layingPices[i]
            } else if(p.coord.y < l) {
                p.coord.y += 1
            }
        })
        state.score += state.level * 100
    })
    state.layingPices.forEach(p => {
        state.lookup[p.coord.x][p.coord.y] = true
    })
    state.linesCleared += fullLines.length
    if (state.level < Math.floor(state.linesCleared / 10) + 1) {
        state.speed *= 0.8
    }
    state.level = Math.floor(state.linesCleared / 10) + 1
    if(fullLines.length == 4) state.score += state.level * 200
}

export const getBlockPosForPice = (pice: Pice) => {
    let x = pice.pos.x
    let y = pice.pos.y
    switch (pice.type) {
        case "o":
            return [c(x,y),c(x+1,y),c(x,y+1),c(x+1,y+1)]
        case "i":
            switch (pice.rotation) {
                case 0: return [c(x+1,y),c(x+1,y+1),c(x+1,y+2),c(x+1,y+3)]
                case 1: return [c(x-1,y+2),c(x,y+2),c(x+1,y+2),c(x+2,y+2)]
                case 2: return [c(x,y),c(x,y+1),c(x,y+2),c(x,y+3)]
                case 3: return [c(x-1,y+1),c(x,y+1),c(x+1,y+1),c(x+2,y+1)]
            }
        case 'l':
            switch (pice.rotation) {
                case 0: return [c(x,y),c(x,y+1),c(x,y+2),c(x+1,y+2)]
                case 1: return [c(x-1,y+1),c(x,y+1),c(x+1,y+1),c(x-1,y+2)]
                case 2: return [c(x,y),c(x,y+1),c(x,y+2),c(x-1,y)]
                case 3: return [c(x-1,y+1),c(x,y+1),c(x+1,y+1),c(x+1,y)]
            }
        case 'j':
            switch (pice.rotation) {
                case 0: return [c(x,y),c(x,y+1),c(x,y+2),c(x-1,y+2)]
                case 1: return [c(x-1,y+1),c(x,y+1),c(x+1,y+1),c(x-1,y)]
                case 2: return [c(x,y),c(x,y+1),c(x,y+2),c(x+1,y)]
                case 3: return [c(x-1,y+1),c(x,y+1),c(x+1,y+1),c(x+1,y+2)]
            }
        case 'z':
            switch (pice.rotation) {
                case 0: return [c(x,y),c(x,y+1),c(x-1,y),c(x+1,y+1)]
                case 1: return [c(x+1,y+1),c(x,y+1),c(x+1,y),c(x,y+2)]
                case 2: return [c(x,y+1),c(x,y+2),c(x-1,y+1),c(x+1,y+2)]
                case 3: return [c(x,y+1),c(x-1,y+1),c(x,y),c(x-1,y+2)]
            }
        case 's':
            switch (pice.rotation) {
                case 0: return [c(x,y),c(x,y+1),c(x+1,y),c(x-1,y+1)]
                case 1: return [c(x+1,y+1),c(x,y+1),c(x+1,y+2),c(x,y)]
                case 2: return [c(x,y+1),c(x,y+2),c(x+1,y+1),c(x-1,y+2)]
                case 3: return [c(x,y+1),c(x-1,y+1),c(x,y+2),c(x-1,y)]
            }
        case 't':
            switch (pice.rotation) {
                case 0: return [c(x,y+1),c(x-1,y+1),c(x+1,y+1),c(x,y+2)]
                case 1: return [c(x,y),c(x,y+1),c(x,y+2),c(x-1,y+1)]
                case 2: return [c(x,y+1),c(x-1,y+1),c(x+1,y+1),c(x,y)]
                case 3: return [c(x,y),c(x,y+1),c(x,y+2),c(x+1,y+1)]
            }
    }
}

const c = (x : number, y: number) => ({x,y} as Coord)

export const newRandomPice = () => {
    let pos = { x: 4, y:-2 }
    const random = Math.floor(Math.random() * 7 )
    switch (random) {
        case 0: return {type : 'i', color: "cyan", pos, rotation: 0 } as IPice
        case 1: return {type : 'l', color: "orange", pos, rotation: 0 } as LPice
        case 2: return {type : 'j', color: "blue", pos, rotation: 0 } as JPice
        case 3: return {type : 'z', color: "red", pos, rotation: 0 } as ZPice
        case 4: return {type : 's', color: "lightgreen", pos, rotation: 0 } as SPice
        case 5: return {type : 't', color: "purple", pos, rotation: 0 } as TPice
        default: return {type : 'o', color: "yellow", pos, rotation: 0 } as OPice
    }
}

