import * as vueRouter from "vue-router";

const router = vueRouter.createRouter({
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../view/Home.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../view/Login.vue"),
        },
    ],
    history: vueRouter.createWebHashHistory(),
});

export default router;