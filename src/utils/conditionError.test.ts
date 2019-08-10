import conditionError from './conditionError';

it('should throw error', (): void => {
    expect((): void => conditionError(false, 'throw error')).toThrow('throw error');
    expect((): void => conditionError(false, 'throw error')).toThrow(Error);
});
it('should not throw any error', (): void => {
    expect((): void => conditionError(true, 'dasfdsa')).not.toThrow();
});
