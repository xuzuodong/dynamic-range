<script setup lang="ts">
import type { Camera } from '~~/types/Camera'

const props = defineProps<{
    data: Camera[]
}>()

const gotIt = ref(false)
</script>

<template>
    <div class="relative">
        <chart-inner :data class="w-full h-full" style="contain: strict;" />
        <div
            v-if="!data.length && !gotIt"
            class="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm"
        >
            <div class="text-center">
                <h1 class="pb-3 text-2xl">
                    <span class="mr-2">👋</span>
                    <span class="font-semibold font-serif italic">Hi there!</span>
                </h1>
                <p class="text-gray-500 dark:text-gray-400">Select a camera from the list to view the data.</p>
                <div class="h-6"></div>
                <u-button size="lg" @click="gotIt = true">Got it</u-button>
                <div class="h-12"></div>
            </div>
        </div>
    </div>
</template>
