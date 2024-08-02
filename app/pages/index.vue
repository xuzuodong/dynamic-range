<script setup lang="ts">
import type { Camera } from '~~/types/Camera'

const { data: cameraData, execute } = useLazyFetch<Camera[]>('/api/data', {
    immediate: false,
    server: false,
})

const inputRef = ref()
const search = ref('')

const filteredData = computed(() => {
    if (!search.value) return cameraData.value
    return cameraData.value?.filter(camera => backwardSearch(search.value, camera.name))
})

const selected = reactive(new Set<Camera>())
const activeIndex = ref(-1)

watch(() => filteredData.value?.length, () => {
    activeIndex.value = -1
    if (filteredData.value?.length) {
        document.getElementById(filteredData.value[0]!.name)?.parentElement?.scrollTo(0, 0)
    }
})

function moveActiveIndex(direction: 'up' | 'down') {
    if (!filteredData.value?.length) return
    const next = filteredData.value[activeIndex.value + (direction === 'down' ? 1 : -1)]
    if (next) activeIndex.value += direction === 'down' ? 1 : -1
    else activeIndex.value = direction === 'down' ? 0 : filteredData.value.length - 1
    document.getElementById(filteredData.value[activeIndex.value]!.name)!.scrollIntoView({ block: 'nearest' })
}

const { device } = useUAParser()

defineShortcuts({
    'arrowdown': {
        usingInput: true,
        handler: () => {
            moveActiveIndex('down')
        },
    },
    'arrowup': {
        usingInput: true,
        handler: () => {
            moveActiveIndex('up')
        },
    },
    'ctrl_n': {
        usingInput: true,
        handler: () => {
            if (device.model === 'Macintosh')
                moveActiveIndex('down')
        },
    },
    'ctrl_p': {
        usingInput: true,
        handler: () => {
            if (device.model === 'Macintosh')
                moveActiveIndex('up')
        },
    },
    'enter': {
        usingInput: true,
        handler: () => {
            if (filteredData.value && activeIndex.value !== -1) {
                const item = filteredData.value[activeIndex.value]
                if (item) {
                    // eslint-disable-next-line ts/no-unused-expressions
                    selected.has(item) ? selected.delete(item) : selected.add(item)
                }
            }
        },
    },
    '/': {
        handler: () => {
            inputRef.value.$el.children[0].focus()
        },
    },
})

onMounted(execute)
</script>

<template>
    <div class="p-4 h-full flex space-x-4">
        <chart :data="Array.from(selected)" class="items-stretch flex-1" style="contain: strict;" />

        <div class="h-full w-[350px] shrink-0">
            <u-tabs
                :items="[{ label: 'List', slot: 'list' }, { label: 'Selected', slot: 'selected' }]"
                :ui="{ wrapper: 'h-full flex flex-col', container: 'flex-1', base: 'h-full flex flex-col' }"
            >
                <template #list>
                    <u-input ref="inputRef" v-model="search" autofocus color="gray" size="lg" placeholder="Search camera" class="mb-2 mt-1">
                        <template #trailing>
                            <u-kbd>/</u-kbd>
                        </template>
                    </u-input>

                    <ul style="contain: strict;" class="h-full overflow-auto">
                        <li
                            v-for="(camera, index) in filteredData" :id="camera.name" :key="camera.name"
                            class="listItem"
                            :class="{
                                'bg-gray-200 dark:bg-gray-700': selected.has(camera),
                                'bg-gray-100 dark:bg-gray-800': !selected.has(camera) && filteredData!.indexOf(camera) === activeIndex,
                                'bg-gray-300 dark:bg-gray-600': selected.has(camera) && filteredData!.indexOf(camera) === activeIndex,
                            }"
                            @mouseover="activeIndex = index"
                            @mouseout="activeIndex = -1"
                            @click="selected.has(camera) ? selected.delete(camera) : selected.add(camera)"
                        >
                            <span>{{ camera.name }}</span>
                        </li>
                    </ul>
                </template>

                <template #selected>
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
                                :key="camera.name" class="listItem"
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
            </u-tabs>
        </div>
    </div>
</template>

<style scoped>
.listItem {
    @apply my-1 px-3 py-1.5 rounded flex justify-between;
}
</style>
