'use strict'

async function testModule (app, opts) {
  app.get('/info', async () => {
    return {
      module: 'test',
      description: 'simple test module for fp-moduloader',
      timestamp: new Date().getTime()
    }
  })
}

module.exports = testModule
