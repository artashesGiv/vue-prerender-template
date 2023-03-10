import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'lazysizes'
import createRouter from './providers/router'
import { content, languages, staticContent } from './providers/content'
import { providers } from '../shared/lib'
import browserDetect from 'vue-browser-detect-plugin'
import { IconBase } from '../shared/lib/ui/IconBase'
import { ImageLazy } from '../shared/lib/ui/ImageLazy'
import { PictureLazy } from '../shared/lib/ui/PictureLazy'
import { TransitionFade } from '../shared/lib/ui/TransitionFade'
import { TransitionExpand } from '../shared/lib/ui/TransitionExpand'

Vue.use(browserDetect)
Vue.use(VueRouter)

// VUE COMPONENTS
Vue.component('icon-base-component', IconBase)
Vue.component('image-lazy-component', ImageLazy)
Vue.component('picture-lazy-component', PictureLazy)
Vue.component('transition-fade-component', TransitionFade)
Vue.component('transition-expand-component', TransitionExpand)

const router = createRouter()

Vue.mixin({
    methods: {
        async $setLanguage(lang) {
            await this.$router.replace(`/${lang}`)
        },
    },
    computed: {
        $languages() {
            return languages
        },
        $language() {
            return this.$route.params.lang
        },
        $content() {
            return content?.[this.$route?.params?.lang]
        },
        $staticContent() {
            return staticContent
        },
    },
})

new Vue({
    el: '#app',
    router,
    mixins: [providers.DeviceProvider, providers.ScrollPositionProvider],
    render: h => h(App),
    mounted() {
        // You'll need this for renderAfterDocumentEvent.
        document.dispatchEvent(new Event('render-event'))
    },
})
