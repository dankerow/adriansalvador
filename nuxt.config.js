import { get } from 'axios'
import shrinkRay from 'shrink-ray-current'

const hostname = process.env.NODE_ENV !== 'production' ? `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}` : process.env.BASE_URL
const image = `${hostname}/icon.png`
const description = '"Capturing the essence of people through a lens."'

export default {
	rootDir: './',
	srcDir: 'src',
	modern: process.env.NODE_ENV === 'production',
	server: {
		port: process.env.SERVER_PORT
	},
	publicRuntimeConfig: {
		cdnBaseURL: process.env.NODE_ENV === 'production' ? process.env.CDN_BASE_URL : process.env.CDN_BASE_URL_DEV
	},
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Adrian Salvador',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: description },
			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'google', content: 'notranslate' },
			{ name: 'robots', content: 'noydir,noodp,noarchive,nocache,notranslate,follow,imageindex,index' },
			{
				hid: 'twitter:card',
				name: 'twitter:card',
				content: 'summary'
			},
			{
				hid: 'twitter:site',
				name: 'twitter:site',
				content: 'Adrian Salvador'
			},
			{
				hid: 'twitter:creator',
				name: 'twitter:creator',
				content: '@dankerow'
			},
			{
				hid: 'twitter:title',
				name: 'twitter:title',
				content: 'salvadoradrian.com'
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
			},
			{
				hid: 'og:title',
				prefix: 'og: https://ogp.me/ns#',
				name: 'og:title',
				property: 'og:title',
				content: 'Adrian Salvador'
			},
			{
				hid: 'og:description',
				prefix: 'og: https://ogp.me/ns#',
				name: 'og:description',
				property: 'og:description',
				content: description
			},
			{
				hid: 'og:image',
				prefix: 'og: https://ogp.me/ns#',
				name: 'og:image',
				property: 'og:image',
				content: image
			}
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'preconnect', href: 'https://cdn.salvadoradrian.com' },
			{ rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' }
		],
		script: [
			{
				src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/js/bootstrap.bundle.min.js',
				type: 'text/javascript',
				crossOrigin: 'anonymous',
				defer: true
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/scss/bedrock'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/aos.client',
		'~/plugins/axios'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxtjs/color-mode',
		'@nuxtjs/device',
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		'@nuxtjs/google-fonts',
		'@nuxtjs/google-gtag',
		'@nuxtjs/svg',
		['nuxt-compress', {
			gzip: {
				threshold: 8192
			},
			brotli: {
				threshold: 8192
			}
		}]
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'nuxt-helmet',
		'@nuxt/image',
		'@nuxtjs/axios',
		'@nuxtjs/i18n',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		'@nuxtjs/sentry',
		'@nuxtjs/sitemap',
		'nuxt-purgecss'
	],

	proxy: {
		'/cdn': {
			target: process.env.NODE_ENV === 'production' ? process.env.CDN_BASE_URL : process.env.CDN_BASE_URL_DEV,
			pathRewrite: { '^/cdn/': '' },
			preserveHeaderKeyCase: true,
			headers: {
				'Accept': 'application/vnd.adriansalvador.json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST'
			}
		}
	},

	axios: {
		proxy: true,
		retry: { retries: 2 },
		credentials: true,
		headers: {
			common: {
				'Accept': 'application/vnd.adriansalvador.json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST'
			}
		}
	},

	colorMode: {
		preference: 'system',
		fallback: 'dark',
		hid: 'color-mode-script',
		globalName: '__COLOR_MODE__',
		storageKey: 'color-mode'
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

	'google-gtag': {
		id: process.env.GOOGLE_GTAG,
		config: {
			anonymize_ip: true
		}
	},

	helmet: {
		frameguard: false
	},

	i18n: {
		strategy: 'prefix_and_default',
		baseUrl: hostname,
		locales: [
			{ code: 'en', iso: 'en-US', name: 'English', file: 'en.js' },
			{ code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.js' }
		],
		defaultLocale: 'en',
		lazy: true,
		langDir: 'locales/',
		vueI18n: {
			fallbackLocale: 'en'
		}
	},

	image: {
		domains: [process.env.NODE_ENV === 'production' ? process.env.CDN_BASE_URL : process.env.CDN_BASE_URL_DEV]
	},

	purgeCSS: {
		variables: true,
		keyframes: true,
		whitelist: ['dark-mode', 'svg', 'aos-init', 'aos-animate', 'data-aos'],
		whitelistPatterns: [
			/pswp/
		]
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		icon: {
			fileName: 'icon.png'
		},
		meta: {
			mobileApp: true,
			name: 'Adrian Salvador',
			appleStatusBarStyle: '#1b1b1b'
		},
		manifest: {
			name: 'Adrian Salvador',
			// eslint-disable-next-line camelcase
			start_url: '/',
			// eslint-disable-next-line camelcase
			short_name: 'Adrian S',
			lang: 'en',
			display: 'fullscreen',
			// eslint-disable-next-line camelcase
			background_color: '#fff',
			// eslint-disable-next-line camelcase
			theme_color: '#1b1b1b'
		},
		workbox: {
			enabled: false
		}
	},

	render: {
		asyncScripts: true,
		compressor: shrinkRay({ brotli: { level: 9, threshold: 8192 } })
	},

	sentry: {
		dsn: process.env.SENTRY_DSN,
		config: {
			tracing: true
		}
	},

	sitemap: {
		hostname,
		gzip: true,
		i18n: true,
		routes: async () => {
			const apiURL = process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL : process.env.API_BASE_URL_DEV
			const { data } = await get(`${apiURL}/sitemap`)
			return data
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		devtools: true,
		transpile: ['photoswipe'],
		extractCSS: true,
		html: {
			minify: {
				collapseBooleanAttributes: true,
				decodeEntities: true,
				minifyCSS: true,
				minifyJS: true,
				processConditionalComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				trimCustomFragments: true,
				useShortDoctype: true,
				removeComments: true
			}
		},
		publicPath: '/_/',
		babel: {
			presets({ isServer }, [, options]) {
				options.corejs = {
					...options.corejs,
					version: 3
				}
			}
		}
	}
}
