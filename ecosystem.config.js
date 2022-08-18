module.exports = {
	apps: [
		{
			name: 'adriansalvador',
			exec_mode: 'cluster',
			instances: 'max',
			script: './node_modules/nuxt/bin/nuxt.js',
			args: 'start'
		}
	]
}
