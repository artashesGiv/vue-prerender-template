import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router: Router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ x: 0, y: 0, behavior: 'smooth' }),
    routes,
})

export default function createRouter(): Router {
    return router
}
