export type Coord = [x: number, y: number]

export interface Marker {
    symbol?: 'triangle-down' | 'triangle' | 'diamond'
    fillColor?: 'white'
}

export type DynamicRangeAtIso = {
    x: number
    y: number
    marker?: Marker
} | Coord

export interface Camera {
    name: string
    lowLightEv: number
    data: DynamicRangeAtIso[]
}
