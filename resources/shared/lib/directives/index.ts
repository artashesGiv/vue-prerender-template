import Vue from 'vue'
import lazysizes from './lazysizes'
import clickOutside from './click-outside'
import move from './move'

Vue.directive('lazysizes', lazysizes)
Vue.directive('click-outside', clickOutside)
Vue.directive('move', move)
