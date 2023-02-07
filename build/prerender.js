const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = [
    new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, '../dist'),
        outputDir: path.join(__dirname, '../dist/pages'),
        routes: ['/ru', '/en'],
        renderer: new Renderer({
            headless: true,
            renderAfterDocumentEvent: 'render-event',
        }),
    }),
]
