import Disk from '../Disk/Disk';
import Position from '../Position/Position';
import conditionError from '../utils/conditionError';

import { ErrorMessages, Corner, Edge } from '../Position/Position.types';
import { DiskType } from '../Disk/Disk.types';

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
        if (disk.type === DiskType.light || disk.type === DiskType.dark) return true;
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

    public override(diskType: DiskType, ...positions: number[]): void{
        positions.forEach((position): void => {
            if (!this.isPositionValid(position)) return;
            this.getDisk(position).update(diskType);
        });
    }

    public nextDiskEdge(position: number, edge: Edge): Disk | null{
        if (!this.isPositionValid(position)) return null;
        const currentDisk = this.getDisk(position);
        const nextPosition = currentDisk.position.nextEdge(edge);
        if (nextPosition instanceof Position) {
            return this.getDisk(nextPosition.position);
        }
        return null;
    }

    public nextDiskCorner(position: number, corner: Corner): Disk | null{
        if (!this.isPositionValid(position)) return null;
        const currentDisk = this.getDisk(position);
        const nextPosition = currentDisk.position.nextCorner(corner);
        if (nextPosition instanceof Position) {
            return this.getDisk(nextPosition.position);
        }
        return null;
    }

    public isAnyEmptyDisk(): boolean {
        for (let i = 1; i <= this.boardSize; i += 1) {
            const disk = this.getDisk(i);
            if (disk.type === DiskType.empty) {
                return true;
            }
        }
        return false;
    }

    public maxDiskType(): DiskType[] {
        let darkCounter = 0;
        let lightCounter = 0;
        for (let i = 1; i <= this.boardSize; i += 1) {
            const disk = this.getDisk(i);
            if (disk.type === DiskType.light)lightCounter += 1;
            if (disk.type === DiskType.dark)darkCounter += 1;
        }
        if (darkCounter > lightCounter) return [DiskType.dark];
        if (darkCounter < lightCounter) return [DiskType.light];
        return [DiskType.dark, DiskType.light];
    }

    // eslint-disable-next-line max-len
    public dominatablePositionsEdge(position: number, direction: Edge, diskType: DiskType): number[] {
        if (!this.isPositionValid(position)) return [];
        if (diskType !== DiskType.light && diskType !== DiskType.dark) return [];
        if (this.getDisk(position).type !== DiskType.empty) return [];
        let nextDisk = this.nextDiskEdge(position, direction);
        if (nextDisk === null) return [];
        if (nextDisk.type === DiskType.empty) return [];
        if (!nextDisk.isOppositeType(diskType)) return [];
        const result: number[] = [];
        while (nextDisk !== null) {
            result.push(nextDisk.position.position);
            nextDisk = this.nextDiskEdge(nextDisk.position.position, direction);
            if (nextDisk === null) return [];
            if (nextDisk.type === DiskType.empty) return [];
            if (!nextDisk.isOppositeType(diskType)) return result;
        }
        return [];
    }

    // eslint-disable-next-line max-len
    public dominatablePositionsCorner(position: number, direction: Corner, diskType: DiskType): number[] {
        if (!this.isPositionValid(position)) return [];
        if (diskType !== DiskType.light && diskType !== DiskType.dark) return [];
        if (this.getDisk(position).type !== DiskType.empty) return [];
        let nextDisk = this.nextDiskCorner(position, direction);
        if (nextDisk === null) return [];
        if (nextDisk.type === DiskType.empty) return [];
        if (!nextDisk.isOppositeType(diskType)) return [];
        const result: number[] = [];
        while (nextDisk !== null) {
            result.push(nextDisk.position.position);
            nextDisk = this.nextDiskCorner(nextDisk.position.position, direction);
            if (nextDisk === null) return [];
            if (nextDisk.type === DiskType.empty) return [];
            if (!nextDisk.isOppositeType(diskType)) return result;
        }
        return [];
    }

    public insertDisk(position: number, diskType: DiskType): boolean {
        if (!this.isAnyEmptyDisk()) return false;
        if (!this.isPositionValid(position)) return false;
        if (diskType !== DiskType.light && diskType !== DiskType.dark) return false;
        if (this.getDisk(position).type !== DiskType.empty) return false;
        const edges: Edge[] = [Edge.left, Edge.right, Edge.bottom, Edge.top];
        // eslint-disable-next-line max-len
        const corners: Corner[] = [Corner.bottomLeft, Corner.bottomRight, Corner.topLeft, Corner.topRight];
        const positions: number[] = [];
        edges.forEach((edge): void => {
            positions.push(...this.dominatablePositionsEdge(position, edge, diskType));
        });
        corners.forEach((corner): void => {
            positions.push(...this.dominatablePositionsCorner(position, corner, diskType));
        });
        if (positions.length > 0) {
            positions.forEach((pos): void => this.toggleDisk(pos));
            this.override(diskType, position);
            return true;
        }
        return false;
    }
}

export default ReversiBoard;
