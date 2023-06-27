'use strict'

async function firstModule (app, opts) {
  app.log.info(`loading First Module - opts: ${JSON.stringify(opts, null, 2)}`)

  app.log.info('First Module loaded')
}

module.exports = firstModule
