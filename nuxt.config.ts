export default defineNuxtConfig({
  rootDir: './',
  srcDir: 'src',

  typescript: {
    strict: true,
  },

  nitro: {
    minify: true,
    experimental: {
      typescriptBundlerResolution: true
    },
    compressPublicAssets: {
      brotli: true,
      gzip: false
    },
    publicAssets: [
      {
        dir: 'public/js',
        maxAge: 24 * 60 * 60 * 365, // 1 year (versioned)
        baseURL: 'js'
      },
      {
        dir: 'public/covers',
        maxAge: 24 * 60 * 60 * 365, // 1 year (versioned)
        baseURL: 'covers'
      }
    ]
  },

  experimental: {
    typedPages: true,
    headNext: true
  },

  css: [
    '@/assets/scss/bedrock.scss'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en-US',
        dir: 'ltr'
      },
      meta: [
        { name: 'description', content: 'Capturing the essence of people through a lens.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://cdn.salvadoradrian.com' },
        { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com' },
        { rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' },
        { rel: 'dns-prefetch', href: 'https://cdn.salvadoradrian.com' }
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.3/js/bootstrap.bundle.min.js',
          type: 'text/javascript',
          defer: true
        }
      ]
    }
  },

  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/critters',
    '@nuxtjs/device',
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

  fonts: {
    experimental: {
      addPreloadLinks: true,
      processCSSVariables: true
    }
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

    image: {
      domains: [process.env.CDN_BASE_URL_DEV as string]
    }
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
      '@nuxtjs/sitemap'
    ],

    gtag: {
      id: process.env.GTAG_ID ?? undefined,
    },

    image: {
      domains: [process.env.CDN_BASE_URL as string]
    },

    purgecss: {
      keyframes: true,
      safelist: ['dark-mode', /^pswp/, /^btn-/, /^dropdown/, /^masonry/, 'icon-link', 'svg', 'img', 'show']
    },

    security: {
      headers: false
    },

    site: {
      url: process.env.BASE_URL
    },

    sitemap: {
      urls: async () => {
        const apiURL = process.env.API_BASE_URL
        const data = await fetch(`${apiURL}/sitemap`).catch(() => {})
        if (!data?.ok) return []

        return data?.json()
      },
      experimentalWarmUp: true,
      experimentalCompression: true
    }
  }
})
