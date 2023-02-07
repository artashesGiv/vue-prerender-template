<script lang="ts">
import {Functional} from '@/shared/lib/utils/other/functional-component'
import {IconName} from '@/shared/types/helpers'


export type IconBaseProps = {
    name: IconName
}

export default Functional<IconBaseProps>((h, { props, data }) => h(
    'i',
    {
        class: ['icon-base', data.staticClass, data.class, `icon-base--${props.name || 'link'}`],
    },
))
</script>


