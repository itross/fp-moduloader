/* Copyright (c) 2023 IT Resources S.r.l.
 * Code licensed under the MIT license.
 * See license in LICENSE file here in the project or at
 * https://github.com/itross/fp-objection/blob/main/LICENSE
 */

'use strict'

const { test } = require('tap')
const build = require('./build')
const moduloader = require('..')
const { join } = require('node:path')

const opts = {
  app: {
    timezone: 'Europe/Rome'
  },
  modules: [{
    name: 'test',
    prefix: '/test'
  }]
}

test('Should load module from ./modules path', async t => {
  t.plan(1)

  const app = await build(t)
  await app.register(moduloader, { ...opts, dir: join(process.cwd(), 'test', 'lib', 'modules') })

  t.ok(app)
})

test('Should reject if "opts.modules" is not an Array', async t => {
  t.plan(1)

  const app = await build(t)
  t.rejects(
    app.register(moduloader, { modules: 'malformed-modules-configurations' }),
    TypeError('\'modules\' opts property must be an array of modules configuration.')
  )
})

test('Should reject for massing "name" property in a module configuration', async t => {
  t.plan(1)

  const app = await build(t)
  t.rejects(
    app.register(moduloader, {
      app: {
        timezone: 'Europe/Rome'
      },
      dir: join(process.cwd(), 'test', 'lib', 'modules'),
      modules: [
        {
          name: 'test',
          prefix: '/test'
        },
        {
          prefix: '/this-should-fail!!!'
        }
      ]
    }),
    TypeError('missing \'name\' property in module configuration.')
  )
})

test('Should load module even without no "opts.prefix" configuration', async t => {
  t.plan(1)

  const app = await build(t)
  await app.register(moduloader, {
    dir: join(process.cwd(), 'test', 'lib', 'modules'),
    modules: [{
      name: 'test',
      key1: 'val1',
      keyN: 'valN',
      otherOptions: {
        key1: 'val1',
        key2: 'val2'
      }
    }]
  })

  t.ok(app)
})

test('Should load module and override prefix with module autoPrefix', async t => {
  t.plan(1)

  const app = await build(t)
  await app.register(moduloader, {
    dir: join(process.cwd(), 'test', 'lib', 'modules'),
    modules: [{
      name: 'autoprefixed',
      prefix: '/this-will-be-overwritten!!!'
    }]
  })

  t.ok(app)
})
