<script setup lang="ts">
import type { Camera } from '~~/types/Camera'

const props = defineProps<{
    cameraData?: Camera[]
    selected: Set<Camera>
}>()

const { cameraData } = toRefs(props)

const inputRef = ref()
const search = ref('')
const activeIndex = ref(-1)

const filteredData = computed(() => {
    if (!search.value) return cameraData.value
    return cameraData.value?.filter(camera => backwardSearch(search.value, camera.name))
})

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
                    props.selected.has(item) ? props.selected.delete(item) : props.selected.add(item)
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
</script>

<template>
    <u-input ref="inputRef" v-model="search" autofocus color="gray" size="lg" placeholder="Search camera" class="mb-2 mt-1">
        <template #trailing>
            <u-kbd>/</u-kbd>
        </template>
    </u-input>

    <ul style="contain: strict;" class="h-full overflow-auto">
        <li
            v-for="(camera, index) in filteredData" :id="camera.name" :key="camera.name"
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
