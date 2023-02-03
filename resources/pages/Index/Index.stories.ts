import { Index, IndexProps } from './index'

export default {
    title: 'Index',
    component: Index,
    argTypes: {},
}

const Template = (args: IndexProps) => ({
    props: Object.keys(args),
    components: {Index},
    methods: {},
    template: '<Index v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
