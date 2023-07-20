'use strict'

const { resolve, join } = require('path')

const moduloader = async function (app, opts) {
  opts.dir ||= join(process.cwd(), 'lib', 'modules')
  if (!Array.isArray(opts.modules)) {
    throw new TypeError('\'modules\' opts property must be an array of modules configuration.')
  }

  const { dir, modules } = opts
  const _options = { ...opts.app }
  delete _options.modules

  for (const mo of modules) {
    await registerModule(mo)
  }

  async function registerModule ({ name, ...rest }) {
    if (!name) {
      throw new TypeError('missing \'name\' property in module configuration.')
    }

    const loaded = require(resolve(join(dir, name, `${name}.module.js`)))

    // mix module prefix with app prefix
    if (loaded.autoPrefix) {
      rest.prefix = loaded.autoPrefix
    }
    if (!rest.prefix) {
      rest.prefix = `/${name}`
    }
    rest.prefix = `${_options.prefix || ''}${rest.prefix}`

    // options as app-options + module-options
    const options = {
      ..._options,
      ...rest
    }

    return app.register(loaded, options)
  }
}

moduloader[Symbol.for('skip-override')] = true

module.exports = moduloader
module.exports.moduloader = moduloader
module.exports.default = moduloader
