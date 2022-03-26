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

// 取消请求
export const cancelRequest = (url: string | string[]) => {
    return request.cancelRequest(url)
}

export default minoRequest;