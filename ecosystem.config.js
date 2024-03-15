const env = require('dotenv').config()

module.exports = {
  apps: [
    {
      name: 'adriansalvador',
      env: {
        ...env.parsed
      },
      script: './.output/server/index.mjs'
    }
  ]
}
