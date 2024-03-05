import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
const axiosParams = {
    baseURL:
        process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_API_URL : '/api/v1/',
    validateStatus: () => true,
};

export const didAbort = (error: any) => axios.isCancel(error) && { aborted: true };

const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error: any) => axios.isAxiosError(error);

const withAbort = (fn: any) => {
    const executor = async (...args: any) => {
        const originalConfig = args[args.length - 1];
        const { abort, ...config } = originalConfig;

        if (typeof abort === 'function') {
            const { cancel, token } = getCancelSource();
            config.cancelToken = token;
            abort(cancel);
        }

        try {
            if (args.length > 2) {
                const [url, body] = args;
                return await fn(url, body, config);
            } else {
                const [url] = args;
                return await fn(url, config);
            }
        } catch (error: any) {
            if (didAbort(error)) {
                error.aborted = true;
            }

            throw error;
        }
    };

    return executor;
};

const axiosInstance = axios.create(axiosParams);
const api = (axios: AxiosInstance) => {
    return {
        get: (url: string, config = {}) => withAbort(axios.get)(url, config),
        delete: (url: string, config = {}) => withAbort(axios.delete)(url, config),
        post: (url: string, body: any, config = {}) => withAbort(axios.post)(url, body, config),
        patch: (url: string, body: any, config = {}) => withAbort(axios.patch)(url, body, config),
        put: (url: string, body: any, config = {}) => withAbort(axios.put)(url, body, config),
    };
};

export default api(axiosInstance);
