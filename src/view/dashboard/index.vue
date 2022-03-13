<template>
    <div>
        <h1>Dashboard page</h1>
        测试：<input />
        <el-button @click="sayHello('Hello World')">Hello World!!!</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
export default defineComponent({
    name: "Dashboard",
    setup() {
        const instance = getCurrentInstance()!;
        const sayHello = (message: string) => {
            instance.proxy?.$message(message);
        };
        return {
            sayHello,
        };
    },
});
</script>
