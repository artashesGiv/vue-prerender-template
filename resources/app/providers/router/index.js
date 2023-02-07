import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
Vue.use(Router);
var router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: function () { return ({ x: 0, y: 0, behavior: 'smooth' }); },
    routes: routes,
});
export default function createRouter() {
    return router;
}
