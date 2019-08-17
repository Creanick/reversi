import Disk from './Disk';
import Position from '../Position/Position';

import { DiskType } from './Disk.types';


describe('Test Disk Class property', (): void => {
    it('Test Disk Property disk type empty', (): void => {
        const disk = new Disk({ position: new Position({ position: 10, size: 4 }) });
        expect(disk.type).toBe(DiskType.empty);
    });
    it('Test Disk property disk type light', (): void => {
        const disk = new Disk({
            position: new Position({ position: 1, size: 4 }),
            type: DiskType.light,
        });
        expect(disk.type).toBe(DiskType.light);
    });
    it('Test Disk property disk type dark', (): void => {
        const disk = new Disk({
            position: new Position({ position: 1, size: 4 }),
            type: DiskType.dark,
        });
        expect(disk.type).toBe(DiskType.dark);
    });
    it('Test Disk property for position', (): void => {
        const disk = new Disk({ position: new Position({ position: 10, size: 4 }) });
        expect(disk.position).toEqual(new Position({ position: 10, size: 4 }));
    });
});

describe('Test Disk Class Methods', (): void => {
    it('disk toggle method test for empty', (): void => {
        const disk = new Disk(
            {
                position: new Position({ position: 10, size: 4 }),
                type: DiskType.empty,
            },
        );
        disk.toggle();
        expect(disk.type).toBe(DiskType.empty);
        disk.reset();
        expect(disk.type).toBe(DiskType.empty);
        disk.update(DiskType.light);
        expect(disk.type).toBe(DiskType.light);
    });
    it('disk toggle method test for light', (): void => {
        const disk = new Disk(
            {
                position: new Position({ position: 10, size: 4 }),
                type: DiskType.light,
            },
        );
        disk.toggle();
        expect(disk.type).toBe(DiskType.dark);
        disk.update(DiskType.light);
        expect(disk.type).toBe(DiskType.light);
        disk.reset();
        expect(disk.type).toBe(DiskType.empty);
    });
    it('disk toggle method test for dark', (): void => {
        const disk = new Disk(
            {
                position: new Position({ position: 10, size: 4 }),
                type: DiskType.dark,
            },
        );
        disk.toggle();
        expect(disk.type).toBe(DiskType.light);
        disk.update(DiskType.dark);
        expect(disk.type).toBe(DiskType.dark);
        disk.reset();
        expect(disk.type).toBe(DiskType.empty);
    });
});
it('disk opposite type test', (): void => {
    const disk = new Disk(
        {
            position: new Position({ position: 10, size: 4 }),
        },
    );
    expect(disk.oppositeType).toBe(DiskType.empty);
    disk.update(DiskType.dark);
    expect(disk.oppositeType).toBe(DiskType.light);
    disk.toggle();
    expect(disk.oppositeType).toBe(DiskType.dark);
});
it('disk opposite type method test ', (): void => {
    const disk = new Disk(
        {
            position: new Position({ position: 10, size: 4 }),
            type: DiskType.dark,
        },
    );
    expect(disk.isOppositeType(DiskType.empty)).toBeFalsy();
    expect(disk.isOppositeType(DiskType.dark)).toBeFalsy();
    expect(disk.isOppositeType(DiskType.light)).toBeTruthy();
    disk.toggle();
    expect(disk.isOppositeType(DiskType.empty)).toBeFalsy();
    expect(disk.isOppositeType(DiskType.dark)).toBeTruthy();
    expect(disk.isOppositeType(DiskType.light)).toBeFalsy();
    disk.reset();
    expect(disk.isOppositeType(DiskType.empty)).toBeTruthy();
    expect(disk.isOppositeType(DiskType.dark)).toBeFalsy();
    expect(disk.isOppositeType(DiskType.light)).toBeFalsy();
});
