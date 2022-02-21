<template>
    <h1>{{name}}</h1>
    <h1>{{age}}</h1>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";

export default defineComponent({
    setup(){
        const state = reactive({
            name: 1,
            age: 10
        })
        return state
    }
});
</script>

<style>
</style>