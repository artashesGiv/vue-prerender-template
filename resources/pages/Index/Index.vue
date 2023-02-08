<template lang="pug">
    .b-index
        button(
            @click="$setLanguage('ru')"
        ) RU
        button(
            @click="$setLanguage('en')"
        ) EN
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export type IndexProps = {}

@Component
export default class Index extends Vue {}
</script>
