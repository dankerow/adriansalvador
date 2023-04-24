const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  rootDir: './',
  srcDir: 'src',

  debug: isDevelopment,
  sourcemap: isDevelopment,

  nitro: {
    compressPublicAssets: true
  },

  runtimeConfig: {
    public: {
      apiBaseURL: isProduction ? process.env.API_BASE_URL : process.env.API_BASE_URL_DEV,
      cdnBaseURL: isProduction ? process.env.CDN_BASE_URL : process.env.CDN_BASE_URL_DEV
    }
  },

  css: [
    '@/assets/scss/bedrock.scss'
  ],

  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/devtools',
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    '@nuxtjs/critters',
    '@nuxtjs/device',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-gtag',
    'nuxt-purgecss',
    'nuxt-security',
    'nuxt-simple-sitemap'
  ],

  colorMode: {
    preference: 'system',
    fallback: 'dark'
  },

  device: {
    refreshOnResize: true
  },

  googleFonts: {
    families: {
      Archivo: {
        wght: [400, 500, 600, 700, 800, 900]
      }
    },
    display: 'swap'
  },

  gtag: {
    id: isProduction && process.env.GTAG_ID ? process.env.GTAG_ID : undefined,
  },

  i18n: {
    strategy: 'no_prefix',
    baseUrl: process.env.BASE_URL,
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales'
  },

  image: {
    domains: [isProduction ? process.env.CDN_BASE_URL as string : process.env.CDN_BASE_URL_DEV as string]
  },

  purgecss: {
    keyframes: true,
    safelist: ['dark-mode', 'aos-init', 'aos-animate', 'data-aos', /^pswp/, /^btn-/, /^dropdown/, 'icon-link', 'svg']
  },

  pwa: {
    meta: {
      mobileApp: true,
      name: 'Adrian Salvador | Photographer',
      appleStatusBarStyle: 'black-translucent'
    },
    manifest: {
      name: 'Adrian Salvador | Photographer',
      start_url: '/',
      short_name: 'Adrian Salvador',
      lang: 'en',
      display: 'fullscreen',
      background_color: '#fff',
      theme_color: '#1b1b1b'
    },
    workbox: {
      enabled: false
    }
  },

  security: {
    enabled: !isDevelopment,
    headers: false
  },

  sitemap: {
    enabled: !isDevelopment,
    siteUrl: process.env.BASE_URL,
    urls: async () => {
      const apiURL = isProduction ? process.env.API_BASE_URL : process.env.API_BASE_URL_DEV
      const data = await fetch(`${apiURL}/sitemap`)
      if (!data.ok) return []

      return data.json()
    }
  }
})
