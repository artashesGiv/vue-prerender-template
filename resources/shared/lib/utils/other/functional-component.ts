import { Vue } from 'vue-property-decorator'
import { CreateElement, RenderContext, VNode } from 'vue'
// @ts-ignore
const props = { functional: true } as Node
/* eslint-disable */
export const VueFunctional = Vue.extend(props)

export function Functional<Props>(renderFn: (h: CreateElement, context: RenderContext<Props>) => VNode, inject?: string[]): any {
    return {
        functional: true,
        inject: ['$device', ...(inject ?? [])],
        render(h: CreateElement, context: RenderContext<Props>) {
            return renderFn(h, context)
        },
    }
}
