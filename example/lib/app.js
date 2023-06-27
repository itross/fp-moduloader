'use strict'

const moduloader = require('../..')

async function app (fastify, opts) {
  fastify.register(moduloader, {
    ...opts
  })
}

module.exports = app
