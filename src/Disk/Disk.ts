import Position from '../Position/Position';

enum DiskType{empty, light, dark}
interface DiskCore{
    position: Position;
    type?: DiskType;
}
class Disk {
    public position: Position;

    public type: DiskType;

    public static DiskType: typeof DiskType;

    public constructor({ position, type = DiskType.empty }: DiskCore) {
        this.position = position;
        this.type = type;
    }

    public toggle(): void{
        if (this.type === DiskType.empty) return;
        if (this.type === DiskType.light) {
            this.type = DiskType.dark;
            return;
        }
        if (this.type === DiskType.dark) {
            this.type = DiskType.light;
        }
    }

    public reset(): void{
        this.type = DiskType.empty;
    }

    public update(type: DiskType): void {
        this.type = type;
    }
}
Disk.DiskType = DiskType;
export default Disk;
