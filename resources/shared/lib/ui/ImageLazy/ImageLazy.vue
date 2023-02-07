<script lang="ts">
import { Functional } from '@/shared/lib/utils/other/functional-component'

export type ImageLazyProps = {
    src: string
    alt: string
    width: string
    height: string
}

export default Functional<ImageLazyProps>((h, { data, props }) => {
    const propsFormatted = {
        width: props.width,
        height: props.height,
        alt: props.alt || '',
    }

    return h('img', {
        class: ['lazyload', data.staticClass, data.class],
        attrs: {
            'data-src': props.src,
            ...propsFormatted,
        },
        directives: [
            {
                name: 'lazysizes',
            },
        ],
    })
})
</script>
