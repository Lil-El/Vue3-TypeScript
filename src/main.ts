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
