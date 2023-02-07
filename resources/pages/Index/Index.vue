<template lang="pug">
    .b-index
        h1 Index Page
        icon-base-component(
            name="plus"
        )
        img(
            src="/public/images/test/logo.svg"
        )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export type IndexProps = {}

@Component
export default class Index extends Vue {}
</script>
