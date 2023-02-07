<template lang="pug">
    .b-app#app {{content.title}}
        button.__button(
            @click="$setLanguage('ru')"
        ) ru
        button.__button(
            @click="$setLanguage('en')"
        ) en
        router-view
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import MetaTitle from '@/shared/lib/mixins/utility/title'

@Component
export default class Root extends Mixins(MetaTitle) {
    get content() {
        return this.$content.meta
    }
}
</script>

<style lang="scss" src="./styles/critical.scss" />
<style lang="scss" src="./styles/main.scss" />
