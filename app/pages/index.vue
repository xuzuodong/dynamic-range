<script setup lang="ts">
import type { Camera } from '~~/types/Camera'

const { data: cameraData, execute } = useLazyFetch<Camera[]>('/api/data', {
    immediate: false,
    server: false,
})

const selectedCameras = reactive(new Set<Camera>())

onMounted(execute)
</script>

<template>
    <div class="container py-4 h-full flex space-x-4">
        <chart :data="Array.from(selectedCameras)" class="items-stretch flex-1" style="contain: strict;" />

        <div class="sidebar h-full w-[350px] shrink-0">
            <u-tabs
                :items="[{ label: 'List', slot: 'list' }, { label: 'Selected', slot: 'selected' }]"
                :ui="{ wrapper: 'h-full flex flex-col', container: 'flex-1', base: 'h-full flex flex-col' }"
            >
                <template #list>
                    <list :selected="selectedCameras" :camera-data />
                </template>

                <template #selected>
                    <selected :selected="selectedCameras" />
                </template>
            </u-tabs>
        </div>
    </div>
</template>

<style>
.sidebar ul li {
    @apply my-1 px-3 py-1.5 rounded flex justify-between;
}
</style>
