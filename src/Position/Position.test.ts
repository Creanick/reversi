import Position from './Position';

const { Corner, Edge, ErrorMessages } = Position;

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
                expect(p1.isEdge(Edge.top)).toBeTruthy();
                expect(p1.hasEdge(Edge.top)).toBeFalsy();
                expect(p1.hasCorner(Corner.topLeft)).toBeFalsy();
                expect(p1.hasCorner(Corner.topRight)).toBeFalsy();
                expect(p1.nextEdge(Edge.top)).toBeNull();
            }
        });
        it('should be false for wrong top edge', (): void => {
            for (let i = size + 1; i <= size ** 2; i += 1) {
                const p = new Position(i, size);
                expect(p.isEdge(Edge.top)).toBeFalsy();
                expect(p.hasEdge(Edge.top)).toBeTruthy();
            }
        });
        it('should be true for right left edge', (): void => {
            for (let i = size + 1; i < size ** 2; i += size) {
                const p = new Position(i, size);
                expect(p.isEdge(Edge.left)).toBeTruthy();
                expect(p.hasEdge(Edge.left)).toBeFalsy();
                expect(p.nextEdge(Edge.left)).toBeNull();
                expect(p.hasCorner(Corner.topLeft)).toBeFalsy();
                expect(p.hasCorner(Corner.bottomLeft)).toBeFalsy();
            }
        });
        it('should be false for wrong left edge', (): void => {
            const p = new Position(size + 2, size);
            expect(p.isEdge(Edge.left)).toBeFalsy();
            expect(p.hasEdge(Edge.left)).toBeTruthy();
        });
        it('should be true for right right edge', (): void => {
            for (let i = size; i <= size ** 2; i += size) {
                const p = new Position(i, size);
                expect(p.isEdge(Edge.right)).toBeTruthy();
                expect(p.hasEdge(Edge.right)).toBeFalsy();
                expect(p.nextEdge(Edge.right)).toBeNull();
                expect(p.hasCorner(Corner.topRight)).toBeFalsy();
                expect(p.hasCorner(Corner.bottomRight)).toBeFalsy();
            }
        });
        it('should be false for wrong right edge', (): void => {
            const p = new Position(size - 1, size);
            expect(p.isEdge(Edge.right)).toBeFalsy();
            expect(p.hasEdge(Edge.right)).toBeTruthy();
        });
        it('should be true for right buttom edge', (): void => {
            for (let i = ((size - 1) * size) + 1; i <= size ** 2; i += 1) {
                const p = new Position(i, size);
                expect(p.isEdge(Edge.bottom)).toBeTruthy();
                expect(p.hasEdge(Edge.bottom)).toBeFalsy();
                expect(p.nextEdge(Edge.bottom)).toBeNull();
                expect(p.hasCorner(Corner.bottomLeft)).toBeFalsy();
                expect(p.hasCorner(Corner.bottomRight)).toBeFalsy();
            }
        });
        it('should be false for wrong bottom edge', (): void => {
            const p = new Position((size - 1) * size, size);
            expect(p.isEdge(Edge.bottom)).toBeFalsy();
            expect(p.hasEdge(Edge.bottom)).toBeTruthy();
        });
    });
}
testBegin(4);
testBegin(2);
testBegin(3);
testBegin(1);
describe('Test for Position next edge', (): void => {
    const p = new Position(6, 4);
    it('should be return correct position for next top edge', (): void => {
        expect(p.nextEdge(Edge.top)).toEqual(new Position(2, 4));
    });

    it('should be return correct position for next left edge', (): void => {
        expect(p.nextEdge(Edge.left)).toEqual(new Position(5, 4));
    });

    it('should be return correct position for next right edge', (): void => {
        expect(p.nextEdge(Edge.right)).toEqual(new Position(7, 4));
    });

    it('should be return correct position for next edge', (): void => {
        expect(p.nextEdge(Edge.bottom)).toEqual(new Position(10, 4));
    });
});
