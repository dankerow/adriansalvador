export default defineNuxtConfig({
  rootDir: './',
  srcDir: 'src',

  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: false
    }
  },

  experimental: {
    typedPages: true
  },

  css: [
    '@/assets/scss/bedrock.scss'
  ],

  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/critters',
    '@nuxtjs/device',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-icon'
  ],

  colorMode: {
    preference: 'dark',
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
    domains: [process.env.CDN_BASE_URL_DEV as string]
  },

  pwa: {
    meta: {
      mobileAppIOS: true,
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
    },
    workbox: {
      enabled: false
    }
  },

  $development: {
    debug: true,
    sourcemap: true,

    runtimeConfig: {
      public: {
        apiBaseUrl: process.env.API_BASE_URL_DEV,
        cdnBaseUrl: process.env.CDN_BASE_URL_DEV
      }
    },

    modules: [
      '@nuxt/devtools'
    ]
  },

  $production: {
    runtimeConfig: {
      public: {
        apiBaseUrl: process.env.API_BASE_URL,
        cdnBaseUrl: process.env.CDN_BASE_URL
      }
    },

    modules: [
      'nuxt-gtag',
      'nuxt-purgecss',
      'nuxt-security',
      'nuxt-simple-sitemap'
    ],

    gtag: {
      id: process.env.GTAG_ID ?? undefined,
    },

    image: {
      domains: [process.env.CDN_BASE_URL as string]
    },

    purgecss: {
      keyframes: true,
      safelist: ['dark-mode', /^pswp/, /^btn-/, /^dropdown/, /^masonry/, 'icon-link', 'svg']
    },

    security: {
      headers: false
    },

    sitemap: {
      site: {
        url: process.env.BASE_URL
      },
      urls: async () => {
        const apiURL = process.env.API_BASE_URL
        const data = await fetch(`${apiURL}/sitemap`).catch(() => {})
        if (!data?.ok) return []

        return data?.json()
      }
    }
  }
})
