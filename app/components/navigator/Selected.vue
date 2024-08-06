<script setup lang="ts">
import type { Camera } from '~~/types/Camera'

const props = defineProps<{
    filteredData?: Camera[]
    selected: Set<Camera>
}>()
</script>

<template>
    <template v-if="selected.size">
        <u-popover overlay>
            <u-button class="mb-2 mt-1" size="lg" block icon="material-symbols-light:delete-sharp">Clear all</u-button>

            <template #panel="{ close }">
                <div class="p-4 space-y-4">
                    <div>
                        Are you sure you want to clear all selected cameras?
                    </div>
                    <div class="flex justify-end space-x-3">
                        <u-button variant="ghost" class="float-end" @click="close">No</u-button>
                        <u-button
                            class="float-end" @click="() => {
                                selected.clear()
                                close()
                            }"
                        >
                            Clear
                        </u-button>
                    </div>
                </div>
            </template>
        </u-popover>

        <ul style="contain: strict;" class="h-full overflow-auto">
            <li
                v-for="camera in Array.from(selected)"
                :key="camera.name"
            >
                <span>{{ camera.name }}</span>
                <u-button variant="ghost" size="xs" square icon="ic:sharp-close" @click="selected.delete(camera)" />
            </li>
        </ul>
    </template>
    <div v-else class="h-full flex items-center justify-center text-gray-400">
        No selected cameras
    </div>
</template>
