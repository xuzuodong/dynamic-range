<script setup lang="ts">
import { DarkTheme, LightTheme, basicOption } from './option'

import type { Camera, Coord, Marker } from '~~/types/Camera'

const props = defineProps<{
    data: Camera[]
}>()

const chartContainerEl = ref<HTMLDivElement>()
const chart = shallowRef<echarts.ECharts>()

function getSymbol(marker?: Marker) {
    if (!marker?.symbol && marker?.fillColor === 'white') return 'emptyCircle'
    if (marker?.symbol === 'triangle-down') return 'path://M1 3h22L12 22'
    return marker?.symbol || 'circle'
}

const series = computed(() => {
    return props.data.map(item => ({
        name: item.name,
        data: item.data.map(p => ({
            coord: Array.isArray(p) ? p : [p.x, p.y] as Coord,
            symbol: Array.isArray(p) ? 'circle' : getSymbol(p.marker),
        })),
    }))
})

onMounted(async () => {
    const echarts = await import('echarts')
    chart.value = echarts.init(chartContainerEl.value!)
    chart.value.setOption(basicOption)

    watchImmediate(series, () => {
        chart.value!.setOption({
            ...basicOption,
            series: series.value.map(lineData => ({
                name: lineData.name,
                type: 'line',
                smooth: true,
                lineStyle: { width: 1.5 },
                symbolSize: 10,
                symbol: 'circle',
                data: lineData.data.map(p => ({
                    value: p.coord,
                    symbol: p.symbol === 'triangle-down'
                        ? 'path://M1 3h22L12 22'
                        : p.symbol,
                })),
            })),
        }, true)
    })

    const colorMode = useColorMode()
    watchImmediate(() => colorMode.value, (val) => {
        chart.value?.setOption(val === 'dark' ? DarkTheme : LightTheme)
    })
})

useResizeObserver(chartContainerEl, useDebounceFn(() => {
    chart.value?.resize()
}, 100))
</script>

<template>
    <div ref="chartContainerEl"></div>
</template>
