import { App } from "vue";
import { ElButton, ElMessage, ElNotification, ElMessageBox, ElMenu, ElMenuItem, ElSubMenu, ElBreadcrumb, ElBreadcrumbItem } from "element-plus";
import "element-plus/dist/index.css";

export type Size = "default" | "medium" | "small" | "mini";

export default (app: App): void => {
    const components = [ElButton, ElMessage, ElNotification, ElMessageBox, ElMenu, ElMenuItem, ElSubMenu, ElBreadcrumb, ElBreadcrumbItem];
    components.forEach((component) => {
        app.component(component.name, component);
    });

    app.config.globalProperties.$message = ElMessage;
    app.config.globalProperties.$notify = ElNotification;
    app.config.globalProperties.$confirm = ElMessageBox.confirm;
    app.config.globalProperties.$alert = ElMessageBox.alert;
    app.config.globalProperties.$prompt = ElMessageBox.prompt;
};
