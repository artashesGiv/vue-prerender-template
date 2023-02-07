import { Component, Vue } from 'vue-property-decorator'
import { TCoords } from 'animated-scroll-to'
import { Maybe } from '@/shared/types/helpers'

const animateScrollTo = () =>
    import(
        /* webpackMode: "lazy", webpackPreload: true, webpackChunkName: "chunks/libs/animated-scroll-to" */
        'animated-scroll-to'
    )

@Component
export default class scrollToSection extends Vue {
    scrollToSection({
        target,
        speed = 500,
        offset = 0,
        elementToScroll = window,
        direction = 'vertical',
    }: {
        target?: string | number | HTMLElement
        speed?: number
        offset?: number
        elementToScroll?: HTMLElement | Window
        direction?: 'vertical' | 'horizontal'
    }): Promise<boolean> {
        let scroll: TCoords = [0, 0]
        let x: Maybe<number> = null
        let y: Maybe<number> = null
        let element: Maybe<string | HTMLElement> = null

        if (typeof target === 'string') {
            element = document.getElementById(target)
        }

        if (typeof target === 'object') {
            element = target
        }

        if (element) {
            if (direction === 'vertical') {
                y = element.getBoundingClientRect().top + window.pageYOffset
            } else {
                x = element.offsetLeft
            }
        }

        scroll = [x, y]

        return animateScrollTo().then(value =>
            value.default(scroll, {
                speed,
                [`${direction}Offset`]: offset,
                elementToScroll,
            })
        )
    }
}
