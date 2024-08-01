// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Dynamic Range Explorer',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Dynamic Range Explorer for digital cameras' },
            ],
        },
    },

    modules: ['@nuxt/ui', '@vueuse/nuxt'],

    future: { compatibilityVersion: 4 },
    compatibilityDate: '2024-07-31',
    devtools: { enabled: false },
})
