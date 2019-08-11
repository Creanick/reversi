import Position, { ErrorMessages, Edges, Corners } from './Position';

function testBegin(size: number): void {
    describe(`Test for board size ${size}`, (): void => {
        it('size should not be greater than 1', (): void => {
            expect((): void => {
                new Position(1, 1);
            }).toThrow(ErrorMessages.sizeError);
        });
        if (size < 2) return;
        it('size should be greater than 1', (): void => {
            expect((): void => {
                new Position(1, size);
            }).not.toThrow();
        });
        it('should throw for 0 position ', (): void => {
            expect((): void => {
                new Position(0, size);
            }).toThrow(ErrorMessages.positionError);
        });
        it('should not throw error for right positions', (): void => {
            for (let i = 1; i <= size * size; i += 1) {
                expect((): void => {
                    new Position(i, size);
                }).not.toThrow();
            }
        });

        it('should throw error for wrong positions', (): void => {
            expect((): void => {
                new Position(size * size + 1, size);
            }).toThrow();
            expect((): void => {
                new Position(size * size + 2, size);
            }).toThrow(ErrorMessages.positionError);
        });
        it('should throw error for negative position', (): void => {
            expect((): void => {
                new Position(-34, size);
            }).toThrow(ErrorMessages.positionError);
        });
        it('should be true for right top edge', (): void => {
            for (let i = 1; i <= size; i += 1) {
                const p1 = new Position(i, size);
                expect(p1.isEdge(Edges.top)).toBeTruthy();
                expect(p1.hasEdge(Edges.top)).toBeFalsy();
                expect(p1.hasCorner(Corners.topLeft)).toBeFalsy();
                expect(p1.hasCorner(Corners.topRight)).toBeFalsy();
            }
        });
        it('should be false for wrong top edge', (): void => {
            for (let i = size + 1; i <= size ** 2; i += 1) {
                const p = new Position(i, size);
                expect(p.isEdge(Edges.top)).toBeFalsy();
                expect(p.hasEdge(Edges.top)).toBeTruthy();
            }
        });
        it('should be true for right left edge', (): void => {
            for (let i = size + 1; i < size ** 2; i += size) {
                const p = new Position(i, size);
                expect(p.isEdge(Edges.left)).toBeTruthy();
                expect(p.hasEdge(Edges.left)).toBeFalsy();
                expect(p.hasCorner(Corners.topLeft)).toBeFalsy();
                expect(p.hasCorner(Corners.bottomLeft)).toBeFalsy();
            }
        });
        it('should be false for wrong left edge', (): void => {
            const p = new Position(size + 2, size);
            expect(p.isEdge(Edges.left)).toBeFalsy();
            expect(p.hasEdge(Edges.left)).toBeTruthy();
        });
        it('should be true for right right edge', (): void => {
            for (let i = size; i <= size ** 2; i += size) {
                const p = new Position(i, size);
                expect(p.isEdge(Edges.right)).toBeTruthy();
                expect(p.hasEdge(Edges.right)).toBeFalsy();
                expect(p.hasCorner(Corners.topRight)).toBeFalsy();
                expect(p.hasCorner(Corners.bottomRight)).toBeFalsy();
            }
        });
        it('should be false for wrong right edge', (): void => {
            const p = new Position(size - 1, size);
            expect(p.isEdge(Edges.right)).toBeFalsy();
            expect(p.hasEdge(Edges.right)).toBeTruthy();
        });
        it('should be true for right down edge', (): void => {
            for (let i = ((size - 1) * size) + 1; i <= size ** 2; i += 1) {
                const p = new Position(i, size);
                expect(p.isEdge(Edges.bottom)).toBeTruthy();
                expect(p.hasEdge(Edges.bottom)).toBeFalsy();
                expect(p.hasCorner(Corners.bottomLeft)).toBeFalsy();
                expect(p.hasCorner(Corners.bottomRight)).toBeFalsy();
            }
        });
        it('should be false for wrong bottom edge', (): void => {
            const p = new Position((size - 1) * size, size);
            expect(p.isEdge(Edges.bottom)).toBeFalsy();
            expect(p.hasEdge(Edges.bottom)).toBeTruthy();
        });
    });
}

testBegin(4);
testBegin(2);
testBegin(3);
testBegin(1);
