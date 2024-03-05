import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

export enum HttpStatus {
    isLoading,
    isSuccess,
    isError,
}

function isErrorResponseCode(code: number) {
    return code >= 400;
}

type UseApiLayerType<T> =
    | UseApiLayerSuccessType<T>
    | UseApiLayerErrorType<T>
    | UseApiLayerLoadingType;

type UseApiLayerSuccessType<T> = {
    data: T;
    status: HttpStatus;
    statusCode: number;
    error: null;
};

type UseApiLayerErrorType<T> = {
    data: T | null;
    status: HttpStatus;
    statusCode: number | undefined;
    error: Error | null;
};

type UseApiLayerLoadingType = {
    data: null;
    status: HttpStatus;
    statusCode: undefined;
    error: null;
};

function useApiLayer<T>(
    requestFunction: () => Promise<AxiosResponse<T>> | void
): UseApiLayerType<T> {
    const [data, setData] = useState<T | null>(null);
    const [status, setStatus] = useState<HttpStatus>(HttpStatus.isLoading);
    const [statusCode, setStatusCode] = useState<number>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setData(null);
            setStatus(HttpStatus.isLoading);
            setStatusCode(undefined);
            setError(null);
            try {
                const response = await requestFunction();
                if (!response) {
                    setData(null);
                    setStatus(HttpStatus.isError);
                    setError(null);
                    return;
                }
                setData(response.data);
                setStatusCode(response.status);

                if (isErrorResponseCode(response.status)) {
                    setStatus(HttpStatus.isError);
                    return;
                }
                setStatus(HttpStatus.isSuccess);
            } catch (e) {
                setData(null);
                setError(e as Error);
                setStatus(HttpStatus.isError);
            }
        };

        fetchData();
    }, [requestFunction]);

    return { data, status, error, statusCode };
}
export function isDataAvailable<T>(status: HttpStatus, data: T | null): data is T {
    return status === HttpStatus.isSuccess && data !== null;
}

export default useApiLayer;
