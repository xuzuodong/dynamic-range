<script setup lang="ts">
</script>

<template>
    <div class="container h-16 flex items-center">
        <div class="mr-2 md:mr-3">
            <icon class="hidden md:block" size="32px" name="noto:camera" />
            <icon class="md:hidden" size="19px" name="noto:camera" />
        </div>
        <h1 class="text-[15px] md:text-lg font-semibold">Dynamic Range Explorer</h1>
        <div class="flex-1"></div>
        <div class="space-x-1">
            <switch-theme />
            <u-button variant="ghost" icon="bi:github" size="lg" to="https://github.com/xuzuodong/dynamic-range" target="_blank" />
        </div>
    </div>
    <div class="h-px bg-gray-300 dark:bg-gray-700"></div>
    <div class="min-h-[calc(100vh-65px)] h-0">
        <slot></slot>
    </div>
</template>
