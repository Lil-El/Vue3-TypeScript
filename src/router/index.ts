import * as vueRouter from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path: "/documentation",
        component: Layout, // 布局组件作为一级路由
        redirect: "/documentation/index",
        children: [
            {
                path: "index",
                name: "Documentation",
                component: () => import(/* webpackChunkName: "documentation" */ "@/view/documentation/index.vue"),
                meta: {
                    title: "Documentation",
                    icon: "documentation",
                },
            },
        ],
    },
    {
        path: "/guide",
        component: Layout,
        redirect: "/guide/index",
        children: [
            {
                path: "index",
                name: "Guide",
                component: () => import(/* webpackChunkName: "guide" */ "@/view/guide/index.vue"),
                meta: {
                    title: "Guide",
                    icon: "guide",
                },
            },
        ],
    },
    {
        path: "/system",
        component: Layout,
        redirect: "/system/user",
        meta: {
            title: "System",
            icon: "lock",
            alwaysShow: true,
        },
        children: [
            {
                path: "menu",
                component: () => import(/* webpackChunkName: "menu" */ "@/view/system/menu/index.vue"),
                meta: {
                    title: "Menu Management",
                    icon: "list",
                    hidden: true
                },
            },
            {
                path: "role",
                component: () => import(/* webpackChunkName: "role" */ "@/view/system/role/index.vue"),
                meta: {
                    title: "Role Management",
                    icon: "list",
                },
            },
            {
                path: "user",
                component: () => import(/* webpackChunkName: "user" */ "@/view/system/user/index.vue"),
                meta: {
                    title: "User Management",
                    icon: "list",
                    activeMenu: "/system/role" // NOTE: 某些场景下，点中某个菜单项时，让其他的菜单项高亮
                },
            },
        ],
    },
    {
        // 外链路由
        path: "/external-link",
        component: Layout,
        children: [
            {
                path: "https://www.baidu.com/",
                redirect: "/",
                meta: {
                    title: "External Link",
                    icon: "link",
                },
            },
        ],
    },
];

const constantRoutes: RouteRecordRaw[] = [
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
                    title: "Dashboard",
                },
            },
        ],
    },
];

export const routes = [...constantRoutes, ...asyncRoutes];

const router = vueRouter.createRouter({
    routes,
    history: vueRouter.createWebHashHistory(),
});

export default router;
