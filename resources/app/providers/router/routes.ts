import { Route, RouteConfig } from 'vue-router'

import Index from '@/pages/Index/Index.vue'
import { content } from '@/app/providers/content'

const redirect = (to: Route) => {
    const { lang } = to.params
    return `/${lang /* ?? currentLang*/ ?? 'ru'}`
}

const mainPathLanguages = Object.keys(content).join('|')

const routes: RouteConfig[] = [
    {
        path: `/:lang(${mainPathLanguages})`,
        name: 'main',
        component: Index,
    },
    {
        path: '*',
        redirect,
    },
]

export default routes
