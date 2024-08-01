<script setup lang="ts">
import type { Camera, Coord } from '~~/types/Camera'

const props = defineProps<{
    data: Camera[]
}>()

const chartContainerEl = ref<HTMLDivElement>()
const chart = shallowRef<echarts.ECharts>()

const series = computed(() => {
    return props.data.map(item => ({
        name: item.name,
        data: item.data.map(p => ({
            coord: Array.isArray(p) ? p : [p.x, p.y] as Coord,
            symbol: Array.isArray(p) ? 'circle' : p.marker?.symbol || 'circle',
        })),
    }))
})

onMounted(async () => {
    const echarts = await import('echarts')
    chart.value = echarts.init(chartContainerEl.value!)
    chart.value.setOption(echartsBasicConfig)

    watchImmediate(series, () => {
        chart.value!.setOption({
            ...echartsBasicConfig,
            series: series.value.map(lineData => ({
                name: lineData.name,
                type: 'line',
                smooth: true,
                lineStyle: { width: 2 },
                symbolSize: 12,
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

    useResizeObserver(chartContainerEl, useDebounceFn(() => {
        chart.value?.resize()
    }, 100))
})
</script>

<template>
    <div ref="chartContainerEl"></div>
</template>
