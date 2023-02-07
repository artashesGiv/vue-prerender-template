export function getDeviceBreakpoints(){
    const width = window.innerWidth

    const breakpoints = {
        tablet: 650,
        tabletLate: 768,
        desktop: 1200
    }

    return {
        maxMobile: width < breakpoints.tablet,
        maxMobileLate: width < breakpoints.tabletLate,
        maxTablet:width < breakpoints.desktop,
        tablet: width >= breakpoints.tablet,
        tabletLate: width >= breakpoints.tabletLate,
        desktop: width >= breakpoints.desktop,
    }
}
