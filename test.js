'use strict'

const eosCamelApi = require('./index.js')
const prettyJson = require('prettyjson')
const chalk = require('chalk')

const run = async () => {
  const endpoints = [
    'https://api.eosio.cr',
    'http://bp.cryptolions.io:8888',
    'https://api.eosnewyork.io:443',
    'https://eos.greymass.com:443'
  ]

  const apis = endpoints.map(httpEndpoint => eosCamelApi.getInstance({httpEndpoint}))

  for (const api of apis) {
    const config = api.camel.getConfig({})
    console.log(chalk.grey(`====== ${config.httpEndpoint} ======`))
    const info = await api.getInfo({})
    console.log(prettyJson.render(info))
  }
}

run()