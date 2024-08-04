import tailwindColors from 'tailwindcss/colors'

import type { CallbackDataParams } from 'echarts/types/dist/shared'

/**
 * Copied from echarts default color palette
 * @see https://echarts.apache.org/en/option.html#color
 */
export const dataSeriesColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

/**
 * Basic option for chart, not including the series data and basic chart colors
 */
export const basicOption: echarts.EChartsOption = {
    color: dataSeriesColors,
    grid: {
        left: '50px',
        right: '16px',
        bottom: '50px',
    },
    xAxis: {
        type: 'value',
        name: 'ISO Setting',
        nameLocation: 'middle',
        nameGap: 25,
        nameTextStyle: {
            color: 'white',
        },
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
}

export const DarkTheme: echarts.EChartsOption = {
    xAxis: {
        axisLabel: { color: tailwindColors.gray[400] },
        nameTextStyle: { color: tailwindColors.gray[400] },
        axisLine: { lineStyle: { color: tailwindColors.gray[400] } },
    },
    yAxis: {
        axisLabel: { color: tailwindColors.gray[400] },
        nameTextStyle: { color: tailwindColors.gray[400] },
        axisLine: { lineStyle: { color: tailwindColors.gray[400] } },
        splitLine: { lineStyle: { color: tailwindColors.gray[600] } },
    },
}

export const LightTheme: echarts.EChartsOption = {
    xAxis: {
        axisLabel: { color: tailwindColors.gray[700] },
        nameTextStyle: { color: tailwindColors.gray[700] },
        axisLine: { lineStyle: { color: tailwindColors.gray[700] } },
    },
    yAxis: {
        axisLabel: { color: tailwindColors.gray[700] },
        nameTextStyle: { color: tailwindColors.gray[700] },
        axisLine: { lineStyle: { color: tailwindColors.gray[700] } },
        splitLine: { lineStyle: { color: tailwindColors.gray[300] } },
    },
}
