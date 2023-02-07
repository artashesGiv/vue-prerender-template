import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Resize extends Vue {
    resize = {
        prevWidth: null as number | null,
        currentWidth: null as number | null,
        callback: null as null | (() => void)
    }

    addResizeWidthEvent (callback: (e?) => void): void {
        this.getResizeWidth()
        this.resize.callback = callback
        window.addEventListener('resize', this.onWindowWidthResize)
    }

    removeResizeWidthEvent (): void {
        window.removeEventListener('resize', this.onWindowWidthResize)
    }

    onWindowWidthResize (): void {
        this.resize.prevWidth = this.resize.currentWidth
        this.resize.currentWidth = window.innerWidth

        if (this.resize.prevWidth !== this.resize.currentWidth && this.resize.callback) {
            this.resize.callback()
        }
    }

    getResizeWidth (): void {
        this.resize.currentWidth = window.innerWidth
        this.resize.prevWidth = window.innerWidth
    }
}
