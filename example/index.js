'use strict'

const Fastify = require('fastify')
const app = require('./lib/app.js')

const config = {
  server: {
    host: 'localhost',
    port: 3000
  },
  app: {
    timezone: 'Europe/Rome'
  },
  modules: [
    {
      name: 'first',
      prefix: '/first',
      db: 'FIRST-connection-string'
    },
    {
      name: 'second',
      db: 'SECOND-connection-string'
    }
  ]
}

const fastify = Fastify({
  logger: {
    level: 'info'
  }
})

async function start () {
  fastify.log.info('starting test server')
  try {
    await fastify.register(app, config)
    fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
