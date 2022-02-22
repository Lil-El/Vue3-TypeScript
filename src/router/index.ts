import * as vueRouter from "vue-router";
import Layout from "@/layout/index.vue";

const router = vueRouter.createRouter({
    routes: [
        {
            path: "/",
            name: "home",
            component: Layout,
            redirect: "/dashboard",
            children: [
                {
                    path: "dashboard",
                    component: () => import("@/view/dashboard/index.vue"),
                    meta: {
                        title: "Dashboard"
                    }
                },
            ],
        },
    ],
    history: vueRouter.createWebHashHistory(),
});

export default router;
