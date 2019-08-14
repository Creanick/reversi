import conditionError from '../utils/conditionError';

import {
    ErrorMessages, Corner, Edge, PositionCore,
} from './Position.types';

class Position {
    private _position: number;

    public get position(): number {
        return this._position;
    }

    public set position(value: number) {
        this._position = value;
    }

    private _size: number;

    public get size(): number {
        return this._size;
    }

    public set size(value: number) {
        this._size = value;
    }

    public constructor({ position, size }: PositionCore) {
        conditionError(position >= 1 && position <= size * size, ErrorMessages.positionError);
        conditionError(size > 1, ErrorMessages.sizeError);
        this._position = position;
        this._size = size;
    }

    public isEdge(edge: Edge): boolean {
        if (edge === Edge.top) {
            return this._position >= 1 && this._position <= this._size;
        }
        if (edge === Edge.right) {
            return this._position % this._size === 0;
        }
        if (edge === Edge.left) {
            return this._position % this._size === 1;
        }
        if (edge === Edge.bottom) {
            return ((this._size - 1) * this._size) < this._position
             && this._position <= this._size ** 2;
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

    public nextEdge(edge: Edge): Position | null{
        if (!this.hasEdge(edge)) return null;
        if (edge === Edge.left) {
            return new Position({ position: this._position - 1, size: this._size });
        }
        if (edge === Edge.right) {
            return new Position({ position: this._position + 1, size: this._size });
        }
        if (edge === Edge.top) {
            return new Position({ position: this._position - this._size, size: this._size });
        }
        if (edge === Edge.bottom) {
            return new Position({ position: this._position + this._size, size: this._size });
        }
        return null;
    }

    public nextCorner(corner: Corner): Position | null{
        if (!this.hasCorner(corner)) return null;
        if (corner === Corner.topLeft) {
            return new Position({ position: this._position - this._size - 1, size: this._size });
        }
        if (corner === Corner.topRight) {
            return new Position({ position: this._position - this._size + 1, size: this._size });
        }
        if (corner === Corner.bottomLeft) {
            return new Position({ position: this._position + this._size - 1, size: this._size });
        }
        if (corner === Corner.bottomRight) {
            return new Position({ position: this._position + this._size + 1, size: this._size });
        }
        return null;
    }
}
export default Position;
