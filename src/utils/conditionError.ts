export = (bool: boolean, message: string): void => {
    if (!bool) {
        throw new Error(message);
    }
};
