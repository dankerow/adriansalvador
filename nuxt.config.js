export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Adrian Salvador',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/scss/bedrock'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/aos.client',
		'~/plugins/axios',
		'~/plugins/vue-masonry'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		'@nuxtjs/google-fonts'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		'nuxt-purgecss'
	],

	proxy: {
		'/cdn': {
			target: 'http://localhost:8010',
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

	googleFonts: {
		families: {
			Archivo: {
				wght: [400, 500, 600, 700, 800, 900]
			}
		},
		display: 'swap'
	},

	purgeCSS: {
		variables: true
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
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

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		devtools: true,
		transpile: ['photoswipe'],
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
