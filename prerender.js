const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = [
    new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: [ '/', '/about', '/contact' ],
        renderer: new Renderer({
            inject: {
                foo: 'bar'
            },
            headless: true,
            renderAfterDocumentEvent: 'render-event'
        }),
    })
]
