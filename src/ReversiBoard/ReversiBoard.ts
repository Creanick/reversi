import Disk from '../Disk/Disk';
import Position from '../Position/Position';
import conditionError from '../utils/conditionError';

const { ErrorMessages } = Position;

class ReversiBoard {
    private _size: number;

    public get size(): number {
        return this._size;
    }

    public set size(value: number) {
        this._size = value;
    }

    private _disks: Disk[];

    public get disks(): Disk[] {
        return this._disks;
    }

    public set disks(value: Disk[]) {
        this._disks = value;
    }

    public constructor(size: number) {
        conditionError(size > 1, ErrorMessages.sizeError);
        this._size = size;
        this._disks = Array.from(
            { length: (size * size) },
            (_value, index): Disk => new Disk({
                position: new Position({
                    position: index + 1,
                    size,
                }),
            }),
        );
    }

    public getDisk(position: number): Disk {
        return this._disks[position - 1];
    }

    public get boardSize(): number {
        return this._size * this._size;
    }

    public printDisks(): void{
        let result = '';
        for (let i = 0; i < this._disks.length; i += this._size) {
            for (let j = i; j <= i + this._size - 1; j += 1) {
                result += `${this._disks[j].type}  `;
            }
            // eslint-disable-next-line no-console
            console.log(`${result}\n`);
            result = '';
        }
    }
}

export default ReversiBoard;
