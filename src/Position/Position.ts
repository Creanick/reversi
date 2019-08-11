import conditionError from '../utils/conditionError';

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
class Position {
    public position: number;

    public size: number;

    public constructor(position: number, size: number) {
        conditionError(position >= 1 && position <= size * size, ErrorMessages.positionError);
        conditionError(size > 1, ErrorMessages.sizeError);
        this.position = position;
        this.size = size;
    }

    public isEdge(edge: Edge): boolean {
        if (edge === Edge.top) {
            return this.position >= 1 && this.position <= this.size;
        }
        if (edge === Edge.right) {
            return this.position % this.size === 0;
        }
        if (edge === Edge.left) {
            return this.position % this.size === 1;
        }
        if (edge === Edge.bottom) {
            return ((this.size - 1) * this.size) < this.position && this.position <= this.size ** 2;
        }
        return false;
    }

    public hasEdge(edge: Edge): boolean {
        return !this.isEdge(edge);
    }

    public hasCorner(corner: Corner): boolean {
        if (corner === Corner.topLeft) {
            return !(this.isEdge(Edge.top) || this.isEdge(Edge.left));
        }
        if (corner === Corner.topRight) {
            return !(this.isEdge(Edge.top) || this.isEdge(Edge.right));
        }
        if (corner === Corner.bottomLeft) {
            return !(this.isEdge(Edge.bottom) || this.isEdge(Edge.left));
        }
        if (corner === Corner.bottomRight) {
            return !(this.isEdge(Edge.bottom) || this.isEdge(Edge.right));
        }

        return false;
    }
}
export default Position;
