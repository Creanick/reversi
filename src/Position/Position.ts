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
        conditionError(1 <= position && position <= size * size, ErrorsMessages.positionError);
        this.position = position;
        this.size = size;
    }
    public isEdge(direction: Directions): boolean {
        if (direction === Directions.top) {
            return 1 <= this.position && this.position <= this.size;
        }
        return true;
    }
}
Position.ErrorMessages = ErrorsMessages;
export default Position;
