<script setup lang="ts">
import { dataSeriesColors } from './option'

import type { Camera } from '~~/types/Camera'

const props = defineProps<{
    showWelcome?: boolean
    data: Camera[]
}>()

const gotIt = ref(false)
</script>

<template>
    <div class="relative">
        <div class="h-full flex flex-col">
            <chart-inner :data class="flex-1 w-full" style="contain: strict;" />

            <div class="h-px bg-gray-300 dark:bg-gray-700"></div>

            <div class="min-h-[108px]">
                <div class="p-4 flex flex-wrap justify-center lg:justify-start text-xs text-gray-500 dark:text-gray-300">
                    <div v-for="(item, i) in data" :key="item.name" class="flex items-center space-x-2 px-3 py-0.5">
                        <div class="w-4 h-3.5 rounded shrink-0" :style="{ backgroundColor: dataSeriesColors[i % dataSeriesColors.length] }"></div>
                        <div>{{ item.name }}</div>
                    </div>
                </div>

                <div class="p-4 pt-0 flex flex-wrap justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-300">
                    <p class="px-3 flex items-center space-x-2"><u-icon name="carbon:triangle-solid" /> <span>Scaling</span></p>
                    <p class="px-3 flex items-center space-x-2"><u-icon name="carbon:triangle-down-solid" /> <span>Noise reduction</span></p>
                    <p class="px-3 flex items-center space-x-2"><u-icon name="ic:outline-circle" /> <span>Extended ISO Setting</span></p>
                </div>
            </div>
        </div>
        <div
            v-if="!data.length && !gotIt && showWelcome"
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
