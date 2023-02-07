import {Component, Provide, Vue} from 'vue-property-decorator'

export type ScrollPositionProviderValue = {
    position: number
}

@Component
export default class ProviderScrollPosition extends Vue {
    @Provide('$scroll') scroll: ScrollPositionProviderValue = {
        position: 0
    }

    onScroll() {
        this.scroll.position = window.scrollY
    }

    beforeMount() {
        window.addEventListener('scroll', this.onScroll, {passive: true})
    }

    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    }
}


