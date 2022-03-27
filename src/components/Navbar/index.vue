<template>
    <div class="navbar">
        <hambuger @toggleClick="toggleSidebar" :is-active="sidebar.opened" />
        <breadcrumb />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hambuger from "@/components/Hambuger/index.vue";
import { useStore } from "@/store/index";

export default defineComponent({
    name: "Navbar",
    components: {
        Breadcrumb,
        Hambuger,
    },
    setup() {
        const store = useStore();

        const toggleSidebar = () => {
            store.dispatch("app/toggleSidebar");
        };

        // store.state.app.sidebar 会类型提示
        const sidebar = computed(() => store.getters.sidebar);

        return {
            toggleSidebar,
            sidebar,
        };
    },
});
</script>