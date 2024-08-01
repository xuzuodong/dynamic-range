export type Coord = [x: number, y: number]

export type DynamicRangeAtIso = {
    x: number
    y: number
    marker?: {
        symbol?: 'triangle-down' | 'triangle' | 'diamond'
        fillColor: 'white'
    }
} | Coord

export interface Camera {
    name: string
    lowLightEv: number
    data: DynamicRangeAtIso[]
}
