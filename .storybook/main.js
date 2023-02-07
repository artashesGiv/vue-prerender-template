const path = require('path')
module.exports = {
    stories: ['../resources/**/*.stories.ts'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: '@storybook/vue',
    webpackFinal: async config => {
        config.resolve.alias['@'] = path.resolve(__dirname, '../resources/')
        config.resolve.extensions = [...config.resolve.extensions, '.ts', '.js']
        config.module.rules.push({
            test: /\.pug$/,
            use: [
                {
                    loader: 'pug-bem-plain-loader',
                    options: {
                        b: true, // default 'b-'
                        e: '__',
                        m: '--',
                    },
                },
            ],
        })
        config.module.rules.push({
            test: /\.scss$/,
            sideEffects: true,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        data: '@import "~@/app/styles/utility/utils-storybook.scss";',
                    },
                },
            ],
        })

        console.log(config.resolve.alias)

        return config
    },
}
