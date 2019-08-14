import Disk from '../Disk/Disk';
import Position from '../Position/Position';
import conditionError from '../utils/conditionError';

import { ErrorMessages } from '../Position/Position.types';

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

    public isPositionValid(position: number): boolean {
        return position >= 1 && position <= this.boardSize;
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

    public isDiskAvailable(position: number): boolean {
        if (!this.isPositionValid(position)) return false;
        const disk = this.getDisk(position);
        if (disk.type === Disk.DiskType.light || disk.type === Disk.DiskType.dark) return true;
        return false;
    }

    public deleteDisk(position: number): void{
        if (!this.isPositionValid(position)) return;
        this.getDisk(position).reset();
    }

    public toggleDisk(position: number): void{
        if (!this.isPositionValid(position)) return;
        this.getDisk(position).toggle();
    }
}

export default ReversiBoard;
