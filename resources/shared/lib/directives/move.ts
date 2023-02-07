import { DirectiveOptions } from 'vue'
import { Maybe } from '@/shared/types/helpers'
import isMobile from '@/shared/lib/utils/other/isMobile'

const TinyGesture = () =>
    // @ts-ignore
    import(/* webpackMode: "lazy", webpackPreload: true, webpackChunkName: "chunks/libs/tinygesture" */ 'tinygesture')

type TineGestureEvent = 'panstart' | 'panend' | 'panmove'
type TinyGesture = {
    destroy: () => void
    on: (name: TineGestureEvent, callback: (event: Event) => void) => void
    off: (name: TineGestureEvent, callback: (event: Event) => void) => void
    touchMoveY: number
    velocityY: number
}

let moveDirective: Maybe<Move> = null

class Move {
    private _startCoordinate: Maybe<number> = null
    private _isClosable = false
    private _closeTimeout
    private _scrolled: Maybe<number> = null
    private readonly _closeTime = 100
    private _isMovable = true
    private gesture: Maybe<TinyGesture> = null
    private readonly element: Maybe<HTMLElement> = null
    private onPanStartHandler = this.onPanStart.bind(this)
    private onPanEndHandler = this.onPanEnd.bind(this)
    private onPanMoveHandler = this.onPanMove.bind(this)
    private onCloseHandler: Maybe<() => void> = null
    private scrollableElement: Maybe<HTMLElement> = null

    constructor(el: HTMLElement, onClose?: () => void) {
        this.element = el
        TinyGesture().then(value => {
            const GestureConstructor = value.default
            this.gesture = new GestureConstructor(el)
            this.addEvents()
            if (onClose) {
                this.onCloseHandler = onClose.bind(this)
            }
        })
    }

    private onScroll = (event: Event) => {
        const scrollableElement = event.target as HTMLElement
        if (this.scrolled === null) {
            this.scrolled = scrollableElement.scrollTop
            this.isMovable = this.scrolled === 0
        }
    }

    private onPanStart(event: Event) {
        clearTimeout(this._closeTimeout)

        this.setScrollableElement((event as Event & { path: HTMLElement[] }).path)
        this.addScrollEvent()
        this.isMovable = !this.scrollableElement || (this.scrollableElement && this.scrollableElement.scrollTop === 0)
        this.startCoordinate = (event as TouchEvent).touches[0].clientY
        this.setElementStyle('transition', '')
    }

    private onPanEnd() {
        clearTimeout(this._closeTimeout)
        this.startCoordinate = null
        this.isMovable = true
        this.scrolled = null
        this.scrollableElement = null
        if (this.element) {
            this.setElementStyle('transform', this.isClosable ? `translate(0,calc(100% + 3rem))` : '')
            this.setElementStyle('transition', `transform ${this._closeTime}ms ease`)
            this._closeTimeout = setTimeout(() => {
                this.element!.style.transition = ''

                if (this.onCloseHandler && this.isClosable) {
                    this.onCloseHandler()
                    this.isClosable = false
                }
            }, this._closeTime)
        }

        this.removeScrollEvent()
    }

    private onPanMove(event) {
        if (this.isMovable && this.gesture && this.element) {
            const moved = this.gesture.touchMoveY
            const swipeForce = this.gesture.velocityY
            let closable = false

            if (event.touches.length === 1 && moved > 0) {
                this.setElementStyle('transform', `translate(0,${moved}px)`)
                closable = moved >= (window.innerHeight - this.startCoordinate!) / 2 || swipeForce >= 20
            }

            if (this.isClosable !== closable) {
                this.isClosable = closable
            }
        }
    }

    private addEvents() {
        this.gesture?.on('panstart', this.onPanStartHandler)
        this.gesture?.on('panend', this.onPanEndHandler)
        this.gesture?.on('panmove', this.onPanMoveHandler)
    }

    private removeEvents() {
        this.gesture?.off('panstart', this.onPanStartHandler)
        this.gesture?.off('panend', this.onPanEndHandler)
        this.gesture?.off('panmove', this.onPanMoveHandler)
    }

    private addScrollEvent() {
        this.scrollableElement?.addEventListener('scroll', this.onScroll, { passive: true })
    }

    private removeScrollEvent() {
        this.scrollableElement?.removeEventListener('scroll', this.onScroll)
    }

    private setElementStyle(styleName: string, value: string) {
        if (this.element) {
            this.element.style[styleName] = value
        }
    }

    private setScrollableElement(path: HTMLElement[]) {
        for (let i = 0; i < path.length; i++) {
            const element = path[i]
            const isScrollable = element.getAttribute('data-v-move-scrollable') !== null
            if (isScrollable) {
                this.scrollableElement = element
            }
            if (element === this.element || this.scrollableElement) {
                break
            }
        }
    }

    destroy() {
        this.removeEvents()
        this.removeScrollEvent()
        this.gesture?.destroy()
        clearTimeout(this._closeTimeout)
    }

    get startCoordinate() {
        return this._startCoordinate
    }

    set startCoordinate(value) {
        this._startCoordinate = value
    }

    get isClosable() {
        return this._isClosable
    }

    set isClosable(value) {
        this._isClosable = value
    }

    get isMovable() {
        return this._isMovable
    }

    set isMovable(value) {
        this._isMovable = value
    }

    get scrolled() {
        return this._scrolled
    }

    set scrolled(value) {
        this._scrolled = value
    }
}

export default {
    bind(el, binding) {
        const isInit = binding.value?.init !== false || typeof binding.value?.init === 'undefined'

        if (isMobile() && isInit) {
            moveDirective = new Move(el, binding.value?.onClose)
        }
    },
    unbind() {
        moveDirective?.destroy()
    },
} as DirectiveOptions
