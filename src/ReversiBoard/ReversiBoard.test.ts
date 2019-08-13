import ReversiBoard from './ReversiBoard';
import Disk from '../Disk/Disk';

describe('Test Reversi board property size', (): void => {
    it('should throw error for wrong size', (): void => {
        expect((): void => {
            new ReversiBoard(0);
        }).toThrow();
    });
    it('should throw error for wrong size 1', (): void => {
        expect((): void => {
            new ReversiBoard(1);
        }).toThrow();
    });
    it('should throw error for right size ', (): void => {
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
    it('test for board get disk method', (): void => {
        const r = new ReversiBoard(size);
        expect(r.getDisk(1).position.position).toBe(1);
        expect(r.getDisk(2).position.position).toBe(2);
        expect(r.getDisk(size).position.position).toBe(size);
    });
    it('board size of reversi size should be right', (): void => {
        const r = new ReversiBoard(size);
        expect(r.boardSize).toBe(size ** 2);
    });
}

flexibleTest(2);
flexibleTest(3);
flexibleTest(4);
