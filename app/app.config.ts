export default defineAppConfig({
    ui: {
        primary: 'slate',
        gray: 'neutral',
        notifications: {
            position: 'top-0 bottom-auto left-[50vw] -translate-x-1/2',
            width: 'w-96',
        },
        notification: {
            transition: {
                enterFromClass: '-translate-y-2 opacity-0 sm:-translate-y-2 sm:translate-x-0',
                enterToClass: 'translate-y-0 opacity-100 sm:translate-y-0 sm:translate-x-0',
            },
        },
    },
    umami: {
        version: 2,
    },
})
