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

    public static DiskType: typeof DiskType;

    public constructor({ position, type = DiskType.empty }: DiskCore) {
        this._position = position;
        this._type = type;
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
Disk.DiskType = DiskType;
export default Disk;
