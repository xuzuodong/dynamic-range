<script setup lang="ts">
import { NavigatorModal } from '#components'

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

const modal = useModal()

function openNavigatorModal() {
    modal.open(NavigatorModal, {
        cameraData: cameraData.value,
        selected: selectedCameras,
    })
}

const toast = useToast()
function handleShare() {
    const url = new URL(location.href)
    navigator.clipboard.writeText(url.href)
    toast.add({
        id: 'copied',
        title: 'URL copied to clipboard',
        description: 'You can share this URL with others to view the selected cameras.',
        timeout: 5000,
    })
}
</script>

<template>
    <div class="px-4 lg:container py-4 h-full flex space-x-4">
        <div class="items-stretch flex-1 flex flex-col">
            <div class="relative flex justify-end items-center container pt-2 pb-1 space-x-3">
                <u-button
                    label="Search camera" color="gray" icon="i-heroicons-magnifying-glass-20-solid"
                    class="flex-1 lg:hidden"
                    :ui="{
                        icon: { base: 'text-gray-400 dark:text-gray-500' },
                        color: { gray: { solid: 'text-gray-400 dark:text-gray-500' } },
                    }"
                    @click="openNavigatorModal"
                />
                <u-button icon="ph:export-light" square color="gray" class="lg:absolute z-10 top-2" @click="handleShare" />
            </div>
            <chart
                :data="Array.from(selectedCameras)"
                :show-welcome="!selectedCamerasFromUrl?.length"
                class="w-full flex-1"
            />
        </div>

        <div class="hidden lg:block h-full w-[300px] xl:w-[350px] shrink-0">
            <navigator :selected="selectedCameras" :camera-data class="h-full" />
        </div>
    </div>
</template>
