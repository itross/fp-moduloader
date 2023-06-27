'use strict'

async function secondModule (app, opts) {
  app.log.info(`loading Second Module - opts: ${JSON.stringify(opts, null, 2)}`)

  app.get('/health', async () => {
    return {
      module: 'second',
      timestamp: new Date().getTime()
    }
  })

  app.log.info('Second Module loaded')
}

module.exports = secondModule
