import type { CallbackDataParams } from 'echarts/types/dist/shared'

export const echartsBasicConfig: echarts.EChartsOption = {
    grid: {
        left: '50px',
        right: '100px',
        bottom: '105px',
    },
    xAxis: {
        type: 'value',
        name: 'ISO Setting',
        min: 2.5,
        max(value) {
            return Math.min(value.max + 0.5, 20.5)
        },
        axisLabel: {
            showMinLabel: false,
            showMaxLabel: false,
            formatter(value) {
                return String(Math.round(3.125 * 2 ** value))
            },
        },
        splitLine: {
            show: false,
        },
    },
    yAxis: {
        type: 'value',
        max: 13.5,
        min: 0,
        name: 'Dynamic Range\n(log2(EV))',
        interval: 2,
    },
    tooltip: {
        trigger: 'item',
        formatter(params) {
            const { data, seriesName } = params as CallbackDataParams
            const dr = (data as any).value[1]
            const iso = Math.round(3.125 * 2 ** (data as any).value[0])
            return `<strong>${seriesName}</strong><br>ISO Setting ${iso}<br>PDR ${dr}`
        },
    },
    dataZoom: {
        type: 'inside',
    },
    legend: {
        show: true,
        top: 'bottom',
    },
}
