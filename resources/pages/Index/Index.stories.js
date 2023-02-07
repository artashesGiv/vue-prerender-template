import { Index } from './index';
export default {
    title: 'Index',
    component: Index,
    argTypes: {},
};
var Template = function (args) { return ({
    props: Object.keys(args),
    components: { Index: Index },
    methods: {},
    template: '<Index v-bind="$props"/>',
}); };
export var Default = Template.bind({});
// @ts-ignore
Default.args = {};
