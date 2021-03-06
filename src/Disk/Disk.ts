import Position from '../Position/Position';

import { DiskType, DiskCore } from './Disk.types';

class Disk {
    private _position: Position;

    public get position(): Position {
        return this._position;
    }

    public set position(value: Position) {
        this._position = value;
    }

    private _type: DiskType;

    public get type(): DiskType {
        return this._type;
    }

    public set type(value: DiskType) {
        this._type = value;
    }

    public constructor({ position, type = DiskType.empty }: DiskCore) {
        this._position = position;
        this._type = type;
    }

    public get oppositeType(): DiskType {
        if (this.type === DiskType.empty) return DiskType.empty;
        if (this.type === DiskType.light) return DiskType.dark;
        if (this.type === DiskType.dark) return DiskType.light;
        return DiskType.empty;
    }

    public isOppositeType(diskType: DiskType): boolean {
        return this.oppositeType === diskType;
    }

    public toggle(): void{
        if (this._type === DiskType.empty) return;
        if (this._type === DiskType.light) {
            this._type = DiskType.dark;
            return;
        }
        if (this._type === DiskType.dark) {
            this._type = DiskType.light;
        }
    }

    public reset(): void{
        this._type = DiskType.empty;
    }

    public update(type: DiskType): void {
        this._type = type;
    }
}
export default Disk;
