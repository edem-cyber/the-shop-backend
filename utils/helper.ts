


function createHttpError(errorCode: number, error: string): Error {
    const errorMessage = `HTTP Error ${errorCode}: ${error}`;
    console.error(errorMessage);
    return new Error(errorMessage);
}