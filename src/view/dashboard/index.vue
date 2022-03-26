<template>
    <div>
        <h1>Dashboard page</h1>测试：
        <input />
        <el-button @click="sayHello('Hello World')">Hello World!!!</el-button>
        <el-button @click="handleRequest">request</el-button>
        <el-button @click="handleCancel">cancel</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import request, { cancelRequest } from "@/request/api";

export default defineComponent({
    name: "Dashboard",
    setup() {
        const instance = getCurrentInstance()!;
        const sayHello = (message: string) => {
            instance.proxy?.$message(message);
        };
        type Req = {
            name: string;
        };
        type Res = {
            data: string;
        };
        const handleRequest = async (data: Req) => {
            const res = await request<Req, Res>({
                url: "/api/common/weather/get15DaysWeatherByArea",
                method: "GET",
                data: {
                    name: "MINO",
                },
                interceptors: {
                    requestInterceptors(res) {
                        console.log("接口请求拦截");

                        return res;
                    },
                    responseInterceptors(result) {
                        console.log("接口响应拦截");
                        return result;
                    },
                },
            });
            console.log(res);
        };
        const handleCancel = () => {
            cancelRequest("/api/common/weather/get15DaysWeatherByArea");
        };
        return {
            sayHello,
            handleRequest,
            handleCancel,
        };
    },
});
</script>
