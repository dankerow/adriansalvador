const hostname = process.env.NODE_ENV !== 'production' ? `http://${process.env.HOST}:${process.env.PORT}` : process.env.BASE_URL

export default defineNuxtConfig({
  rootDir: './',
  srcDir: 'src',

  runtimeConfig: {
    public: {
      apiBaseURL: process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL : process.env.API_BASE_URL_DEV,
      cdnBaseURL: process.env.NODE_ENV === 'production' ? process.env.CDN_BASE_URL : process.env.CDN_BASE_URL_DEV
    }
  },

  css: [
    '@/assets/scss/bedrock.scss'
  ],

  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    'nuxt-icon',
    'nuxt-lazy-hydrate',
    'nuxt-security',
    'nuxt-purgecss'
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

  i18n: {
    strategy: 'prefix_and_default',
    baseUrl: hostname,
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales',
    vueI18n: {
      fallbackLocale: 'en'
    }
  },

  image: {
    domains: [process.env.NODE_ENV === 'production' ? process.env.CDN_BASE_URL : process.env.CDN_BASE_URL_DEV]
  },

  purgecss: {
    variables: true,
    keyframes: true,
    safelist: ['dark-mode', 'svg', 'aos-init', 'aos-animate', 'data-aos'],
    blocklist: [
      /pswp/,
      /btn/,
      /dropdown/
    ]
  },

  pwa: {
    scope: '/',
    srcDir: './scripts/service-worker',
    filename: 'sw.ts',
    strategies: 'injectManifest',
    injectRegister: false,
    includeManifestIcons: false,
    manifest: {
      name: 'Adrian Salvador',
      start_url: '/',
      short_name: 'Adrian S.',
      lang: 'en',
      display: 'fullscreen',
      background_color: '#fff',
      theme_color: '#1b1b1b'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },

  security: {
    hidePoweredBy: false,
    headers: false
  },

  build: {
    transpile: ['@yeger/vue-masonry-wall']
  }
})
