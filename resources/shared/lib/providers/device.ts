import { Component, Mixins, Provide } from 'vue-property-decorator'
import Resize from '@/shared/lib/mixins/utility/resize'
import { getDeviceBreakpoints } from '@/shared/lib/utils/other/getDeviceBreakpoints'
import { Maybe } from '@/shared/types/helpers'

export type DeviceProviderValue = {
    width: Maybe<number>
    size: {
        maxMobile: boolean
        maxMobileLate: boolean
        maxTablet: boolean
        tablet: boolean
        tabletLate: boolean
        desktop: boolean
    }
    type: {
        desktop: boolean
        mobile: boolean
    }
}

@Component
export default class DeviceProvider extends Mixins(Resize) {
    @Provide('$device') device: DeviceProviderValue = {
        width: null,
        size: {
            maxMobile: false,
            maxMobileLate: false,
            maxTablet: false,
            tablet: false,
            tabletLate: false,
            desktop: false,
        },
        type: {
            desktop: false,
            mobile: false,
        },
    }

    isMobile(): boolean {
        return Boolean(navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i))
    }

    mounted(): void {
        this.setSize()
        this.setType()
        this.setWidth()
        this.addResizeWidthEvent(this.onResizeDeviceProvider)
    }

    beforeDestroy(): void {
        this.removeResizeWidthEvent()
    }

    setWidth() {
        this.device.width = window.innerWidth
    }

    setSize(): void {
        this.device.size = getDeviceBreakpoints()
    }

    setType(): void {
        this.device.type.desktop = !this.isMobile()
        this.device.type.mobile = this.isMobile()
    }

    onResizeDeviceProvider() {
        this.setWidth()
        this.setSize()
    }
}
