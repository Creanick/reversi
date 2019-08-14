import ReversiBoard from './ReversiBoard';
import Disk from '../Disk/Disk';

describe('Test Reversi board property size', (): void => {
    it('should throw error for wrong size 0', (): void => {
        expect((): void => {
            new ReversiBoard(0);
        }).toThrow();
    });
    it('should throw error for wrong size 1', (): void => {
        expect((): void => {
            new ReversiBoard(1);
        }).toThrow();
    });
    it('should not throw error for right size ', (): void => {
        expect((): void => {
            new ReversiBoard(2);
        }).not.toThrow();
    });
});
function flexibleTest(size: number): void {
    it('test for board disks', (): void => {
        const r = new ReversiBoard(size);
        for (let i = 0; i < size * size; i += 1) {
            expect(r.disks[i].type).toBe(Disk.DiskType.empty);
            expect(r.disks[i].position.size).toBe(size);
            expect(r.disks[i].position.position).toBe(i + 1);
        }
    });
    it('board size of reversi size should be right', (): void => {
        const r = new ReversiBoard(size);
        expect(r.boardSize).toBe(size ** 2);
    });
    it('test for board get disk method', (): void => {
        const r = new ReversiBoard(size);
        expect(r.getDisk(1).position.position).toBe(1);
        expect(r.getDisk(2).position.position).toBe(2);
        expect(r.getDisk(r.boardSize).position.position).toBe(r.boardSize);
        expect(r.getDisk(0)).toBeUndefined();
        expect(r.getDisk(-1)).toBeUndefined();
        expect(r.getDisk(r.boardSize + 1)).toBeUndefined();
    });
    it('test for board isDiskAvailable ', (): void => {
        const r = new ReversiBoard(size);
        const firstDisk = r.getDisk(1);
        const thirdDisk = r.getDisk(3);
        const forthDisk = r.getDisk(4);
        firstDisk.update(Disk.DiskType.dark);
        thirdDisk.update(Disk.DiskType.light);
        forthDisk.update(Disk.DiskType.dark);

        expect(r.isDiskAvailable(-1)).toBeFalsy();
        expect(r.isDiskAvailable(0)).toBeFalsy();
        expect(r.isDiskAvailable(1)).toBeTruthy();
        expect(r.isDiskAvailable(2)).toBeFalsy();
        expect(r.isDiskAvailable(3)).toBeTruthy();
        expect(r.isDiskAvailable(4)).toBeTruthy();
        r.getDisk(r.boardSize).update(Disk.DiskType.light);
        expect(r.isDiskAvailable(r.boardSize)).toBeTruthy();
        expect(r.isDiskAvailable(r.boardSize + 1)).toBeFalsy();
        const r1 = new ReversiBoard(size);
        expect(r1.isDiskAvailable(r.boardSize)).toBeFalsy();
    });
}

flexibleTest(2);
flexibleTest(3);
flexibleTest(4);
