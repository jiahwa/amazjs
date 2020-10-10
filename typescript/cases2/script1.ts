const debug = require('debug') as (debug.Debug & { debug: debug.Debug; default: debug.Debug; })

const logger = debug('vue:env')

console.log(logger)