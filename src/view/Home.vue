<template>
    <div>Home-{{count}}</div>
    <HelloWorld />
</template>

<script setup lang="ts">
import HelloWorld from "@/components/index.vue";

import { ref } from "vue";

const count = ref(0);
</script>

<style>
</style>