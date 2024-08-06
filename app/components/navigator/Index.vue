<script setup lang="ts">
import type { Camera } from '~~/types/Camera'

const props = defineProps<{
    cameraData?: Camera[]
    selected: Set<Camera>
}>()
</script>

<template>
    <div class="flex items-start">
        <u-tabs
            :items="[{ label: 'List', slot: 'list' }, { label: 'Selected', slot: 'selected' }]"
            :ui="{
                wrapper: 'h-full flex flex-col',
                container: 'flex-1',
                base: 'h-full flex flex-col',
            }"
            class="flex-1"
        >
            <template #list>
                <navigator-list :selected :camera-data />
            </template>

            <template #selected>
                <navigator-selected :selected />
            </template>
        </u-tabs>
    </div>
</template>

<style scoped>
:deep(ul li) {
    @apply my-1 px-3 py-1.5 rounded flex justify-between;
}
</style>
