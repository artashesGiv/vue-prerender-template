<template lang="pug">
    .b-picture
        picture
            source(
                type="image/webp"
                :width="width"
                :height="height"
                :data-srcset="`${src}.webp`"
            )
            source(
                :data-srcset="fallbackSrc"
                :width="width"
                :height="height"
                :type="`image/${fallbackExt}`"
            )
            img.lazyload(
                v-lazysizes
                :width="width"
                :height="height"
                :key="src"
                :data-src="fallbackSrc"
                :data-lowsrc="blur"
                :alt="alt"
            )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PictureLazy extends Vue {
    @Prop({ required: true }) readonly src!: string
    @Prop({ default: 'png' }) readonly fallbackExt!: string
    @Prop({ required: true }) readonly alt!: string
    @Prop({ default: '' }) readonly blur!: string
    @Prop() readonly width!: number
    @Prop() readonly height!: number

    get fallbackSrc(): string {
        return `${this.src}.${this.fallbackExt}`
    }
}
</script>
