import Vue from 'vue'
import Router, { Route } from 'vue-router'
import { Content, languages, StaticContent } from '@/app/providers/content'
import { BrowserDetect } from 'vue-browser-detect-plugin'
import { DeviceProviderValue } from '@/shared/lib/providers/device'
// import ModalsProvider from '@/widgets/modals/lib/providers/modals'

declare module '*.vue' {
    export default Vue
}

declare module 'vue/types/vue' {
    interface Vue {
        $router: Router
        $route: Route
        $content: Content
        $staticContent: StaticContent
        $device: DeviceProviderValue
        // $modals: ModalsProvider
        $languages: typeof languages
        $browserDetect: BrowserDetect
        $language: string
        $scrollLock: {
            disablePageScroll: () => void
            enablePageScroll: () => void
            addFillGapTarget: (element: HTMLElement) => void
            setFillGapMethod: (method: 'margin' | 'padding') => void
        }
    }
}
