const isProduction = process.env.NODE_ENV === 'production'
const app = 'van Hellemondt | Home'
const title = app
const url = isProduction ? 'https://www.van-hellemondt.nl' : 'http://localhost:3000'
const image = `${url}/assets/images/ic-192x192.png`
const description = 'van Hellemondt | Family website'
const primaryColor = '#ff4200'

export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src/',
  css: [
    '@/assets/css/main.scss',
    '@unocss/reset/tailwind.css'
  ],
  unocss: {
    preflight: true
  },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/i18n'
  ],
  typescript: {
    strict: true
  },
  app: {
    head: {
      title,
      titleTemplate: `%s | ${title}`,
      htmlAttrs: {
        lang: 'nl'
      },
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'assets/site/favicon.ico?v=0.1.0'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'assets/site/apple-touch-icon.png?v=0.1.0'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: 'assets/site/favicon-32x32.png?v=0.1.0'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: 'assets/site/favicon-16x16.png?v=0.1.0'
        },
        {
          rel: 'manifest',
          href: 'assets/site/site.webmanifest?v=0.1.0'
        },
        {
          rel: 'mask-icon',
          href: 'assets/site/safari-pinned-tab.svg?v=0.1.0',
          color: primaryColor
        },
        {
          rel: 'shortcut icon',
          href: 'assets/site/favicon.ico?v=0.1.0'
        },
        {
          rel: 'canonical',
          href: url
        }
      ],
      meta: [
        { charset: 'utf-8' },
        {
          name: 'msapplication-TileColor',
          content: primaryColor
        },
        {
          name: 'theme-color',
          content: primaryColor
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no'
        },
        {
          name: 'format-detection',
          content: 'telephone=no'
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          property: 'og:site_name',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: image
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: url
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: image
        }
      ]
    }
  }
})
