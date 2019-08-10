import Position from './Position';

const boardSize = 4;
it('should throw for 0 position ', (): void => {
    expect((): void => {
        new Position(0, boardSize);
    }).toThrow(Position.ErrorMessages.positionError);
});
it('should not throw error for right positions', (): void => {
    for (let i = 1; i <= boardSize * boardSize; i += 1) {
        expect((): void => {
            new Position(i, boardSize);
        }).not.toThrow();
    }
});

it('should throw error for wrong positions', (): void => {
    expect((): void => {
        new Position(boardSize * boardSize + 1, boardSize);
    }).toThrow();
    expect((): void => {
        new Position(boardSize * boardSize + 2, boardSize);
    }).toThrow(Position.ErrorMessages.positionError);
});
it('should throw error for negative position', (): void => {
    expect((): void => {
        new Position(-34, boardSize);
    }).toThrow(Position.ErrorMessages.positionError);
});
