import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import createRouter from './providers/router'

Vue.use(VueRouter)

const router = createRouter()

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    mounted() {
        // You'll need this for renderAfterDocumentEvent.
        document.dispatchEvent(new Event('render-event'))
    },
})
