<template lang="pug">
    transition(
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
    )
        slot
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'

export type TransitionExpandProps = {}

@Component
export default class TransitionExpand extends Vue {

    enter(element: HTMLElement) {
        const {width} = getComputedStyle(element)

        element.style.width = width
        element.style.position = 'absolute'
        element.style.visibility = 'hidden'
        element.style.height = 'auto'

        const {height} = getComputedStyle(element)

        element.style.width = ''
        element.style.position = ''
        element.style.visibility = ''
        element.style.height = ''

        getComputedStyle(element).height

        requestAnimationFrame(() => {
            element.style.height = height
        })
    }

    afterEnter(element) {
        element.style.height = 'auto'
    }

    leave(element) {
        const {height} = getComputedStyle(element)

        element.style.height = height

        getComputedStyle(element).height

        requestAnimationFrame(() => {
            element.style.height = 0
        })
    }
}
</script>
