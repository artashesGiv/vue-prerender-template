<template lang="pug">
    .b-app#app
        router-view
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import MetaTitle from '@/shared/lib/mixins/utility/title'

@Component
export default class Root extends Mixins(MetaTitle) {}
</script>

<style lang="scss" src="./styles/critical.scss" />
<style lang="scss" src="./styles/main.scss" />
