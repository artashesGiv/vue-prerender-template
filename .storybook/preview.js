import '../resources/app/styles/critical.scss'
import '../resources/app/styles/main.scss'
import '../resources/app/styles/utility/animations.scss'
import createRouter from '../resources/app/providers/router'
import { provideFunc } from './libs/stories-utils'

import Vue from 'vue'
import { IconBase } from '../resources/shared/lib/ui/IconBase'
import { ImageLazy } from '../resources/shared/lib/ui/ImageLazy'
import { PictureLazy } from '../resources/shared/lib/ui/PictureLazy'
import { TransitionFade } from '../resources/shared/lib/ui/TransitionFade'
import { TransitionExpand } from '../resources/shared/lib/ui/TransitionExpand'
import clickOutside from '../resources/shared/lib/directives/click-outside'
import lazysizes from '../resources/shared/lib/directives/lazysizes'

// VUE DIRECTIVES
Vue.directive('click-outside', clickOutside)
Vue.directive('lazysizes', lazysizes)

// VUE COMPONENTS
Vue.component('icon-base-component', IconBase)
Vue.component('image-lazy-component', ImageLazy)
Vue.component('picture-lazy-component', PictureLazy)
Vue.component('transition-fade-component', TransitionFade)
Vue.component('transition-expand-component', TransitionExpand)

export const decorators = [
    story => ({
        components: { story },
        router: createRouter(),
        ...provideFunc(),
        template: '<story />',
    }),
]

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    viewport: {
        viewports: {
            mobile: {
                name: 'Mobile 320px',
                type: 'mobile',
                styles: {
                    width: '320px',
                    height: '600px',
                },
            },
            tablet: {
                name: 'Tablet 650px',
                type: 'tablet',
                styles: {
                    width: '650px',
                    height: '600px',
                },
            },
            tabletLate: {
                name: 'Tablet Late 768px',
                type: 'tablet',
                styles: {
                    width: '768px',
                    height: '600px',
                },
            },
            desktop: {
                name: 'Desktop 1200px',
                type: 'desktop',
                styles: {
                    width: '1200px',
                    height: '600px',
                },
            },
        },
    },
}
