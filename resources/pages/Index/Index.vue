<template lang="pug">
    .b-index
        h1 Index Page
        button.__button(
            @click="$setLanguage('ru')"
        ) ru
        button.__button(
            @click="$setLanguage('en')"
        ) en
        image-lazy-component(
            src="/images/test/logo.svg"
        )
        img(
            src="/images/test/logo.svg"
        )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export type IndexProps = {}

@Component
export default class Index extends Vue {}
</script>
