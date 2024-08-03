<script setup lang="ts">
import type { Camera } from '~~/types/Camera'

const { data: cameraData, execute } = useLazyFetch<Camera[]>('/api/data', {
    immediate: false,
    server: false,
})
onMounted(execute)

const selectedCamerasFromUrl = useRouteQuery('item')

const selectedCameras = reactive(new Set<Camera>())

// setup `selectedCameras` from url query when `cameraData` is loaded
whenever(cameraData, (val) => {
    selectedCameras.clear()
    if (selectedCamerasFromUrl.value) {
        if (Array.isArray(selectedCamerasFromUrl.value)) {
            selectedCamerasFromUrl.value.forEach((str) => {
                const camera = val.find(cam => cam.name === str)
                if (camera) selectedCameras.add(camera)
            })
        } else {
            const camera = val.find(cam => cam.name === selectedCamerasFromUrl.value)
            if (camera) selectedCameras.add(camera)
        }
    }
})

// update url query when `selectedCameras` changes
watch(selectedCameras, () => {
    selectedCamerasFromUrl.value = Array.from(selectedCameras).map(camera => camera.name)
})
</script>

<template>
    <div class="container py-4 h-full flex space-x-4">
        <chart
            :data="Array.from(selectedCameras)"
            :show-welcome="!selectedCamerasFromUrl?.length"
            class="items-stretch flex-1"
        />

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
