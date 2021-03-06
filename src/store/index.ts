import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import app, { IAppState } from "@/store/modules/app"; // 导入模块
import createPersistedState from "vuex-persistedstate";
import getters from "./getters"; // 导入getters

// 声明全局状态类型，主要就是我们定义的模块 这样store.state.app才会有类型提示
export interface IRootState {
    app: IAppState;
}

// 通过下面方式使用 TypeScript 定义 store 能在使用时正确地为 store 提供类型声明。
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<IRootState>> = Symbol();
// 这个key算是个密钥 入口main.ts需要用到 vue.use(store, key) 才能正常使用

// 对于getters在组件使用时没有类型提示
// 有人提交了pr #1896 为getters创建泛型 应该还未发布
// https://github.com/vuejs/vuex/pull/1896
// 代码pr内容详情
// https://github.com/vuejs/vuex/pull/1896/files#diff-093ad82a25aee498b11febf1cdcb6546e4d223ffcb49ed69cc275ac27ce0ccce

// vuex store持久化 默认使用localstorage持久化
const persisteAppState = createPersistedState({
    storage: window.sessionStorage, // 指定storage 也可自定义
    key: "vuex_app", // 存储名 默认都是vuex 多个模块需要指定 否则会覆盖
    // paths: ['app'] // 针对app这个模块持久化
    // 只针对app模块下sidebar.opened状态持久化
    paths: ["app.sidebar.opened"], // 通过点连接符指定state路径
});

export default createStore<IRootState>({
    plugins: [
        persisteAppState,
    ],
    getters,
    modules: {
        // 注册模块
        app,
    },
});

// 定义自己的 `useStore` 组合式函数
// https://next.vuex.vuejs.org/zh/guide/typescript-support.html#%E7%AE%80%E5%8C%96-usestore-%E7%94%A8%E6%B3%95
export function useStore() {
    return baseUseStore(key);
}
