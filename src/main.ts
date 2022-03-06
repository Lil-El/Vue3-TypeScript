import { createApp } from "vue";
import ElementPlus from "element-plus";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "@/style/index.scss";
import installElementPlus, { Size } from "./plugin/element";
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";

createApp(App).use(store).use(router).use(installElementPlus).mount("#app");
// ElementPlus

// vue实例上挂载属性类型声明
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $message: typeof ElMessage;
        $notify: typeof ElNotification;
        $confirm: typeof ElMessageBox.confirm;
        $alert: typeof ElMessageBox.alert;
        $prompt: typeof ElMessageBox.prompt;
    }
}
// VueX d.ts 类型定义  vuex-shim.d.ts 
// import { Store } from 'vuex' 
// declare module '@vue/runtime-core' {
//     interface State {     
//         count: number   
//     }
//     interface ComponentCustomProperties {
//         $store: Store<State>   
//     }
// } 

// Vue-Router d.ts 类型定义
// declare module '@vue/runtime-core' {
//     export interface ComponentCustomOptions {
//       beforeRouteEnter?: any,
//       beforeRouteUpdate?: any,
//       beforeRouteLeave?: any,
//     }
//     export interface ComponentCustomProperties {
//       $route: any,
//       $router: any,
//     }
//   }