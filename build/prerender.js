const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = [
    new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, '../dist'),
        routes: ['/ru', '/en'],
        renderer: new Renderer({
            headless: true,
            renderAfterDocumentEvent: 'render-event',
        }),
    }),
]
