import ReversiBoard from './ReversiBoard';

import { DiskType } from '../Disk/Disk.types';
import { Edge, Corner } from '../Position/Position.types';

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
            expect(r.disks[i].type).toBe(DiskType.empty);
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
        firstDisk.update(DiskType.dark);
        thirdDisk.update(DiskType.light);
        forthDisk.update(DiskType.dark);

        expect(r.isDiskAvailable(-1)).toBeFalsy();
        expect(r.isDiskAvailable(0)).toBeFalsy();
        expect(r.isDiskAvailable(1)).toBeTruthy();
        expect(r.isDiskAvailable(2)).toBeFalsy();
        expect(r.isDiskAvailable(3)).toBeTruthy();
        expect(r.isDiskAvailable(4)).toBeTruthy();
        r.getDisk(r.boardSize).update(DiskType.light);
        expect(r.isDiskAvailable(r.boardSize)).toBeTruthy();
        expect(r.isDiskAvailable(r.boardSize + 1)).toBeFalsy();
        const r1 = new ReversiBoard(size);
        expect(r1.isDiskAvailable(r.boardSize)).toBeFalsy();
    });
    it('test for board delete disk', (): void => {
        const r = new ReversiBoard(size);
        r.getDisk(3).update(DiskType.light);
        r.deleteDisk(3);
        expect(r.isDiskAvailable(3)).toBeFalsy();
        expect(r.getDisk(3).type).toBe(DiskType.empty);
    });
    it('test for board toggle disk', (): void => {
        const r = new ReversiBoard(size);
        r.toggleDisk(3);
        expect(r.getDisk(3).type).toBe(DiskType.empty);
        r.getDisk(3).update(DiskType.light);
        r.toggleDisk(3);
        expect(r.getDisk(3).type).toBe(DiskType.dark);
        r.toggleDisk(3);
        expect(r.getDisk(3).type).toBe(DiskType.light);
    });
    it('test for board override method', (): void => {
        const r = new ReversiBoard(size);
        r.override(DiskType.dark, 1, 3);
        r.override(DiskType.dark, -1);
        r.override(DiskType.light, 4);
        expect(r.getDisk(1).type).toBe(DiskType.dark);
        expect(r.getDisk(3).type).toBe(DiskType.dark);
        expect(r.getDisk(4).type).toBe(DiskType.light);
    });
}

flexibleTest(2);
flexibleTest(3);
flexibleTest(4);
flexibleTest(8);
describe('Test for board size 2 for next method', (): void => {
    it('test board next disk method for position 1', (): void => {
        const r = new ReversiBoard(2);
        // edge method
        expect(r.nextDiskEdge(1, Edge.left)).toBeNull();
        expect(r.nextDiskEdge(1, Edge.top)).toBeNull();
        expect(r.nextDiskEdge(1, Edge.bottom)).toEqual(r.getDisk(3));
        expect(r.nextDiskEdge(1, Edge.right)).toEqual(r.getDisk(2));
        // corner method
        expect(r.nextDiskCorner(1, Corner.topLeft)).toBeNull();
        expect(r.nextDiskCorner(1, Corner.bottomLeft)).toBeNull();
        expect(r.nextDiskCorner(1, Corner.topRight)).toBeNull();
        expect(r.nextDiskCorner(1, Corner.bottomRight)).toEqual(r.getDisk(4));
    });
    it('test board next disk method for position 4', (): void => {
        const r = new ReversiBoard(2);
        // edge method
        expect(r.nextDiskEdge(4, Edge.right)).toBeNull();
        expect(r.nextDiskEdge(4, Edge.bottom)).toBeNull();
        expect(r.nextDiskEdge(4, Edge.left)).toEqual(r.getDisk(3));
        expect(r.nextDiskEdge(4, Edge.top)).toEqual(r.getDisk(2));
        // corner method
        expect(r.nextDiskCorner(4, Corner.topRight)).toBeNull();
        expect(r.nextDiskCorner(4, Corner.bottomRight)).toBeNull();
        expect(r.nextDiskCorner(4, Corner.bottomLeft)).toBeNull();
        expect(r.nextDiskCorner(4, Corner.topLeft)).toEqual(r.getDisk(1));
    });
    it('test board next disk method for position 2', (): void => {
        const r = new ReversiBoard(2);
        // edge method
        expect(r.nextDiskEdge(2, Edge.right)).toBeNull();
        expect(r.nextDiskEdge(2, Edge.bottom)).toEqual(r.getDisk(4));
        expect(r.nextDiskEdge(2, Edge.left)).toEqual(r.getDisk(1));
        expect(r.nextDiskEdge(2, Edge.top)).toBeNull();
        // corner method
        expect(r.nextDiskCorner(2, Corner.topRight)).toBeNull();
        expect(r.nextDiskCorner(2, Corner.bottomRight)).toBeNull();
        expect(r.nextDiskCorner(2, Corner.bottomLeft)).toEqual(r.getDisk(3));
        expect(r.nextDiskCorner(2, Corner.topLeft)).toBeNull();
    });
});
describe('Test for board size 4 for next method', (): void => {
    it('test board next disk method for position 1', (): void => {
        const r = new ReversiBoard(4);
        // edge method
        expect(r.nextDiskEdge(1, Edge.left)).toBeNull();
        expect(r.nextDiskEdge(1, Edge.top)).toBeNull();
        expect(r.nextDiskEdge(1, Edge.bottom)).toEqual(r.getDisk(5));
        expect(r.nextDiskEdge(1, Edge.right)).toEqual(r.getDisk(2));
        // corner method
        expect(r.nextDiskCorner(1, Corner.topLeft)).toBeNull();
        expect(r.nextDiskCorner(1, Corner.bottomLeft)).toBeNull();
        expect(r.nextDiskCorner(1, Corner.topRight)).toBeNull();
        expect(r.nextDiskCorner(1, Corner.bottomRight)).toEqual(r.getDisk(6));
    });
    it('test board next disk method for position 16', (): void => {
        const r = new ReversiBoard(4);
        // edge method
        expect(r.nextDiskEdge(16, Edge.right)).toBeNull();
        expect(r.nextDiskEdge(16, Edge.bottom)).toBeNull();
        expect(r.nextDiskEdge(16, Edge.left)).toEqual(r.getDisk(15));
        expect(r.nextDiskEdge(16, Edge.top)).toEqual(r.getDisk(12));
        // corner method
        expect(r.nextDiskCorner(16, Corner.topRight)).toBeNull();
        expect(r.nextDiskCorner(16, Corner.bottomRight)).toBeNull();
        expect(r.nextDiskCorner(16, Corner.bottomLeft)).toBeNull();
        expect(r.nextDiskCorner(16, Corner.topLeft)).toEqual(r.getDisk(11));
    });
    it('test board next disk method for position 7', (): void => {
        const r = new ReversiBoard(4);
        // edge method
        expect(r.nextDiskEdge(7, Edge.right)).toEqual(r.getDisk(8));
        expect(r.nextDiskEdge(7, Edge.bottom)).toEqual(r.getDisk(11));
        expect(r.nextDiskEdge(7, Edge.left)).toEqual(r.getDisk(6));
        expect(r.nextDiskEdge(7, Edge.top)).toEqual(r.getDisk(3));
        // corner method
        expect(r.nextDiskCorner(7, Corner.topRight)).toEqual(r.getDisk(4));
        expect(r.nextDiskCorner(7, Corner.bottomRight)).toEqual(r.getDisk(12));
        expect(r.nextDiskCorner(7, Corner.bottomLeft)).toEqual(r.getDisk(10));
        expect(r.nextDiskCorner(7, Corner.topLeft)).toEqual(r.getDisk(2));
    });
});

it('should return true for some empty disk in board', (): void => {
    const r = new ReversiBoard(4);
    r.override(DiskType.light, 3, 4, 7, 12, 10, 11, 1);
    expect(r.isAnyEmptyDisk()).toBeTruthy();
});
it('should return false for fully filled board', (): void => {
    const r = new ReversiBoard(4);
    r.override(DiskType.dark, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    expect(r.isAnyEmptyDisk()).toBeFalsy();
});
