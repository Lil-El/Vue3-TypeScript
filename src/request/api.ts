import { request } from ".";
import type { RequestConfig } from "./type";

interface MINORequestConfig<T> extends RequestConfig {
    data?: T;
}

interface MINOResponseConfig<T> {
    code: number;
    data: T;
    message: string;
}

const minoRequest = <T, V = any>(config: MINORequestConfig<T>) => {
    if (config.method == "get" || config.method == "GET") {
        config.params = config.data;
    }
    return request.request<MINOResponseConfig<V>>(config);
};

export default minoRequest;
