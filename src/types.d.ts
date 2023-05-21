type CanvasSettings = {width: number, height: number}

type FieldDrawState = {
    pice: PiceCoords,
    layingPices: LayingPice[],
}

type PiceCoords = {
    color: string,
    coords: Coord[]
}

type LayingPice = {
    color: string,
    coord: Coord
}

type Coord = {
    x: number,
    y: number
}