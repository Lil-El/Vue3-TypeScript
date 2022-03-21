import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestInterceptors, RequestConfig, CancelRequestSource } from "./type";

class Request {
    instance: AxiosInstance;
    interceptorsObj?: RequestInterceptors;

    cancelRequestSourceList?: CancelRequestSource[];
    requestUrlList?: string[];

    constructor(config: RequestConfig) {
        this.requestUrlList = [];
        this.cancelRequestSourceList = [];

        this.instance = axios.create(config);
        this.interceptorsObj = config.interceptors;

        // 类拦截器
        this.instance.interceptors.request.use(
            (res: AxiosRequestConfig) => {
                console.log("全局请求拦截器");
                return res;
            },
            (err: any) => {
                return err;
            }
        );

        // 实例拦截器
        this.instance.interceptors.request.use(this.interceptorsObj?.requestInterceptors, this.interceptorsObj?.requestInterceptorsCatch);
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch
        );

        // 类拦截器
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                console.log("全局响应拦截器");
                return res;
            },
            (err: any) => {
                return err;
            }
        );
    }

    request<T>(config: RequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            // 接口拦截
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config);
            }

            if (config.url) {
                this.requestUrlList?.push(config.url);
                config.cancelToken = new axios.CancelToken((c) => {
                    this.cancelRequestSourceList?.push({
                        [config.url as string]: c,
                    });
                });
            }

            this.instance
                .request<any, T>(config)
                .then((res) => {
                    if (config.interceptors?.responseInterceptors) {
                        res = config.interceptors.responseInterceptors<T>(res);
                    }
                    resolve(res);
                })
                .catch((err: any) => {
                    reject(err);
                })
                .finally(() => {
                    config.url && this.delUrl(config.url);
                });
        });
    }

    private getSourceIndex(url: string): number {
        return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
            return Object.keys(item)[0] === url;
        }) as number;
    }

    private delUrl(url: string) {
        const urlIndex = this.requestUrlList?.findIndex((u) => u === url);
        const sourceIndex = this.getSourceIndex(url);

        urlIndex !== -1 && this.requestUrlList?.splice(urlIndex!, 1);
        sourceIndex !== -1 && this.cancelRequestSourceList?.splice(sourceIndex!, 1);
    }

    cancelRequest(url: string | string[]) {
        if (typeof url === "string") {
            // 取消单个请求
            const sourceIndex = this.getSourceIndex(url);
            sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]();
        } else {
            // 存在多个需要取消请求的地址
            url.forEach((u) => {
                const sourceIndex = this.getSourceIndex(u);
                sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]();
            });
        }
    }
}

// TODO: 测试部分

export const request = new Request({
    method: "GET",
    baseURL: import.meta.env.BASE_URL,
    timeout: 1000 * 60 * 5,
    interceptors: {
        requestInterceptors: (config) => {
            console.log("实例拦截器");
            return config;
        },
        responseInterceptors: (result) => {
            console.log("实例拦截器");
            return result;
        },
    },
});

export default Request;
