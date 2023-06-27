'use strict'

const moduloader = require('../..')

async function app (fastify, opts) {
  fastify.register(moduloader, {
    ...opts,
    dir: '/Users/joshuagame/oss/projects/itross/fp-moduloader/repo/fp-moduloader/example/lib/modules'
  })
}

module.exports = app
