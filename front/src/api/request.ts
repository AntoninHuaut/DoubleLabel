import { useEffect, useState } from 'react';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const enum HttpMethod {
    CONNECT = 'CONNECT',
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE',
}

interface UseFetchParameter {
    onData?: (servData: any) => any;
    onError?: (servError: any) => any;
    onAfterRequest?: () => any;
}

export const useFetch = (params: UseFetchParameter) => {
    const [data, setData] = useState<any>();
    const [error, setError] = useState<Error | null>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const [nbRequest, setNbRequest] = useState<number>(0);

    const abortRequest = () => abortController.abort();

    const cannotHandleResult = () => isLoading || nbRequest == 0;

    useEffect(() => () => abortRequest(), []);

    const makeRequest = async ({ url, options }: { url: string; options: RequestInit }) => {
        const freshAbortController = new AbortController();
        setAbortController(freshAbortController);
        setLoading(true);
        setData(null);
        setError(null);

        try {
            const response = await fetch(url, { ...options, signal: freshAbortController.signal });

            if (response.ok) {
                if (response.status !== 204) {
                    setData(await response.json());
                }
            } else {
                try {
                    const body = await response.json();
                    if (body && body.status === response.status && body.message) {
                        let message = body.message;
                        if (Array.isArray(body.message)) {
                            message = body.message.map((e: { message: string }) => e.message).join(', ');
                        }

                        setError(new Error(message));
                    } else {
                        throw new Error();
                    }
                } catch (err) {
                    throw new Error(response.statusText);
                }
            }
        } catch (error) {
            if (freshAbortController.signal.aborted) return;

            setError(error instanceof Error ? error : new Error(`${error}`));
        } finally {
            setNbRequest((v) => v + 1);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (cannotHandleResult()) return;

        if (data && params.onData) {
            params.onData(data);
        }

        if (error && params.onError) {
            params.onError(error);
        }

        if (params.onAfterRequest) {
            params.onAfterRequest();
        }
    }, [isLoading]);

    return { isLoading, nbRequest, makeRequest, abortRequest };
};

const getContentTypeHeader = (options: RequestInit): RequestInit => {
    if (options.body) return { headers: { 'Content-Type': 'application/json' } };
    return {};
};

export const mergeFetchOptions = (options: RequestInit): RequestInit => {
    return {
        ...options,
        ...getContentTypeHeader(options),
    };
};
