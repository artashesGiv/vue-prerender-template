import { Component, Vue, Watch } from 'vue-property-decorator'

export type Meta = {
    title: string
    description: string
    shareImage: string
    domain: string
}

@Component
export default class MetaTitle extends Vue {
    get meta(): Meta {
        return {
            title: this.$content.meta.title,
            description: this.$content.meta.description,
            shareImage: '/public/images/utility/share.jpg',
            domain: this.$staticContent.meta.domain,
        }
    }

    setTitle(): void {
        const { title, description, shareImage, domain } = this.meta

        const html = document.querySelector('html') as HTMLHtmlElement

        const titleElement = document.querySelector('meta[property="og:title"]') as HTMLMetaElement
        const titleTwitterElement = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement

        const descriptionNameElement = document.querySelector('meta[name="description"]') as HTMLMetaElement
        const descriptionPropertyElement = document.querySelector('meta[property="og:description"]') as HTMLMetaElement
        const descriptionTwitterElement = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement

        const domainElement = document.querySelector('meta[property="author"]') as HTMLMetaElement
        const domainUrlElement = document.querySelector('meta[property="og:url"]') as HTMLMetaElement
        const domainTwitterElement = document.querySelector('meta[name="twitter:domain"]') as HTMLMetaElement
        const domainFacebookElement = document.querySelector(
            'meta[name="facebook-domain-verification"]'
        ) as HTMLMetaElement

        const imageLinkElement = document.querySelector('link[rel="image_src"]') as HTMLLinkElement
        const imagePropertyElement = document.querySelector('meta[property="og:image"]') as HTMLMetaElement
        const imageTwitterElement = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement
        const imageTwitterSrcElement = document.querySelector('meta[name="twitter:image:src"]') as HTMLMetaElement

        if (document) {
            if (html) {
                const htmlClasses: string[] = []

                if (!this.$browserDetect.isIOS || !this.$browserDetect.isChromeIOS) {
                    htmlClasses.push('custom-scroll-bar')
                }

                if (this.$browserDetect.isIE) {
                    htmlClasses.push('browser-ie')
                }

                if (this.$browserDetect.isSafari || this.$browserDetect.isIE) {
                    htmlClasses.push('animation-disabled')
                }

                html.lang = this.$language

                if (htmlClasses.length) {
                    html.className = htmlClasses.join(' ')
                }
            }

            if (title && titleElement && titleTwitterElement) {
                document.title = `${title}`
                titleElement.content = `${title}`
                titleTwitterElement.content = `${title}`
            }

            if (description && descriptionNameElement && descriptionPropertyElement && descriptionTwitterElement) {
                descriptionNameElement.content = `${description}`
                descriptionPropertyElement.content = `${description}`
                descriptionTwitterElement.content = `${description}`
            }

            if (domain && domainElement && domainUrlElement && domainTwitterElement && domainFacebookElement) {
                domainElement.content = `${domain}`
                domainUrlElement.content = `https://${domain}`
                domainTwitterElement.content = `${domain}`
                domainFacebookElement.content = `${domain}`
            }

            if (
                shareImage &&
                imageLinkElement &&
                imagePropertyElement &&
                imageTwitterElement &&
                imageTwitterSrcElement
            ) {
                imageLinkElement.href = `${shareImage}`
                imagePropertyElement.content = `${shareImage}`
                imageTwitterElement.content = `${shareImage}`
                imageTwitterSrcElement.content = `${shareImage}`
            }
        }
    }

    @Watch('$route')
    onChangeRoute(): void {
        this.setTitle()
    }

    created(): void {
        this.setTitle()
    }
}
