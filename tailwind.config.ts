import { screens } from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    darkMode: 'class',
    theme: {
        screens: {
            xs: '475px',
            ...screens,
        },
        container: {
            center: true,
        },
    },
}
