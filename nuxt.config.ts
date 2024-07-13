export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

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
        { rel: 'preconnect', href: 'https://cdn.salvadoradrian.com' }
      ]
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/color-mode',
    '@nuxtjs/critters',
    '@nuxtjs/device',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-build-cache'
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
      processCSSVariables: true
    }
  },

  pwa: {
    manifest: {
      name: 'Adrian Salvador | Photographer',
      start_url: '/',
      short_name: 'Adrian Salvador',
      lang: 'en',
      display: 'fullscreen',
      background_color: '#fff',
      theme_color: '#1b1b1b'
    },
    pwaAssets: {
      image: '../public/icon.png',
    }
  },

  $development: {
    debug: true,
    sourcemap: true,

    runtimeConfig: {
      public: {
        cdnBaseUrl: process.env.CDN_BASE_URL_DEV
      }
    },

    image: {
      domains: [process.env.CDN_BASE_URL_DEV as string]
    }
  },

  $production: {
    runtimeConfig: {
      gtagId: process.env.GTAG_ID ?? undefined,
      public: {
        cdnBaseUrl: process.env.CDN_BASE_URL
      }
    },

    modules: [
      'nuxt-purgecss',
      'nuxt-security',
      '@nuxtjs/sitemap'
    ],

    image: {
      domains: [process.env.CDN_BASE_URL as string]
    },

    purgecss: {
      keyframes: true,
      safelist: ['dark-mode', /^pswp/, /^btn-/, /^dropdown/, /^masonry/, 'icon-link', 'svg', 'img', 'show']
    },

    security: {
      headers: false,
      rateLimiter: false
    },

    site: {
      url: process.env.BASE_URL
    },

    sitemap: {
      urls: async () => {
        const cdnURL = process.env.CDN_BASE_URL
        const data = await fetch(`${cdnURL}/sitemap`).catch(() => {})
        if (!data?.ok) return []

        return data?.json()
      },
      experimentalWarmUp: true,
      experimentalCompression: true
    }
  },

  compatibilityDate: '2024-07-03'
})
