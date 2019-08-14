export enum ErrorMessages {
    positionError = 'Position is not inside the board',
    sizeError='Size should be greater than 1'
}
export enum Edge{
    left,
    right,
    top,
    bottom
}
export enum Corner{
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
}
export type Direction = Edge | Corner;
export interface PositionCore{
    position: number;
    size: number;
}
