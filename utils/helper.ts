


export function createHttpError(errorCode: number, error: string): Error {
    const errorMessage = `HTTP Error ${errorCode}: ${error}`;
    console.error(errorMessage);
    return new Error(errorMessage);
}


export function createResponse(
    {
        res,
        statusCode,
        statusText,
        message,
        data,
    }: {
        res: any;
        statusCode: number;
        statusText: string;
        message: string;
        data: any;

    }
): any {

    return res.status(statusCode).json({
        statusCode,
        statusText,
        message,
        data
    });
}