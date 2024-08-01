<script setup lang="ts">
</script>

<template>
    <div class="container h-16 flex items-center space-x-4">
        <div>
            <icon size="32px" name="noto:camera" />
        </div>
        <h1 class="text-lg font-semibold">Dynamic Range Explorer</h1>
    </div>
    <div class="min-h-[calc(100vh-64px)] h-0">
        <slot></slot>
    </div>
</template>
