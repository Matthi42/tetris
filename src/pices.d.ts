type Pice = OPice | IPice | LPice | JPice | ZPice | SPice | TPice
type GenericPice = {
    pos: Coord,
    rotation: 0 | 1 | 2 | 3
}
type OPice = GenericPice & {
    type: 'o',
    color: 'yellow'
}
type IPice = GenericPice & {
    type: 'i',
    color: 'cyan'
}
type LPice = GenericPice & {
    type: 'l',
    color: 'orange'
}
type JPice = GenericPice & {
    type: 'j',
    color: 'blue'
}
type ZPice = GenericPice & {
    type: 'z',
    color: 'red'
}
type SPice = GenericPice & {
    type: 's',
    color: 'lightgreen'
}
type TPice = GenericPice & {
    type: 't',
    color: 'purple'
}


type GameState = {
    hasSaved: boolean
    nextPices: Pice[]
    savedPice?: Pice
    activePice: Pice,
    layingPices: LayingPice[],
    lookup: boolean[][],
    speed: number,
    spedUp: boolean,
    linesCleared: number,
    score: number,
    level: number,
    gameOver: boolean
}