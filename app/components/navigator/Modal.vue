<script lang="ts" setup>
import type { Camera } from '~~/types/Camera'

const props = defineProps<{
    cameraData?: Camera[]
    selected: Set<Camera>
}>()
</script>

<template>
    <u-modal>
        <navigator :selected :camera-data class="p-4 min-h-[66vh] h-0" />
    </u-modal>
</template>
