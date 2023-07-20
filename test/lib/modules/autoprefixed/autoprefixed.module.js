'use strict'

module.exports = async function (app, opts) {
  app.get('/info', async () => {
    return {
      module: 'autoprefixed',
      description: 'simple autoPrefix module for fp-moduloader',
      timestamp: new Date().getTime()
    }
  })
}

// NOTE: autoPrefix export must be after the default export
module.exports.autoPrefix = '/an-awesome-prefix'
