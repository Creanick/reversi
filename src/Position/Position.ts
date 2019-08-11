import conditionError from '../utils/conditionError';

export enum ErrorMessages {
    positionError = 'Position is not inside the board',
    sizeError='Size should be greater than 1'
}
export enum Edges{
    left,
    right,
    top,
    bottom
}
export enum Corners{
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
}
export type Directions = Edges | Corners;
class Position {
    public position: number;

    public size: number;

    public constructor(position: number, size: number) {
        conditionError(position >= 1 && position <= size * size, ErrorMessages.positionError);
        conditionError(size > 1, ErrorMessages.sizeError);
        this.position = position;
        this.size = size;
    }

    public isEdge(edge: Edges): boolean {
        if (edge === Edges.top) {
            return this.position >= 1 && this.position <= this.size;
        }
        if (edge === Edges.right) {
            return this.position % this.size === 0;
        }
        if (edge === Edges.left) {
            return this.position % this.size === 1;
        }
        if (edge === Edges.bottom) {
            return ((this.size - 1) * this.size) < this.position && this.position <= this.size ** 2;
        }
        return false;
    }

    public hasEdge(edge: Edges): boolean {
        return !this.isEdge(edge);
    }

    public hasCorner(corner: Corners): boolean {
        if (corner === Corners.topLeft) {
            return !(this.isEdge(Edges.top) || this.isEdge(Edges.left));
        }
        if (corner === Corners.topRight) {
            return !(this.isEdge(Edges.top) || this.isEdge(Edges.right));
        }
        if (corner === Corners.bottomLeft) {
            return !(this.isEdge(Edges.bottom) || this.isEdge(Edges.left));
        }
        if (corner === Corners.bottomRight) {
            return !(this.isEdge(Edges.bottom) || this.isEdge(Edges.right));
        }

        return false;
    }
}
export default Position;
