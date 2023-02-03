<template lang="pug">
    .b-app#app App
        router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Root extends Vue {}
</script>

<style lang="scss">
@import './styles/critical';
@import './styles/main';
</style>
