import conditionError from '../utils/conditionError';

enum ErrorsMessages {
    positionError = 'Position is not inside the board',
}
enum Directions {
    left,
    right,
    top,
    down,
}
class Position {
    public position: number;

    public size: number;

    public static ErrorMessages: typeof ErrorsMessages;

    public constructor(position: number, size: number) {
        conditionError(position >= 1 && position <= size * size, ErrorsMessages.positionError);
        this.position = position;
        this.size = size;
    }

    public isEdge(direction: Directions): boolean {
        if (direction === Directions.top) {
            return this.position >= 1 && this.position <= this.size;
        }
        return true;
    }
}
Position.ErrorMessages = ErrorsMessages;
export default Position;
