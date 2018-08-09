'use strict'

const EOSAPI = require('eosjs-api')
const snakeCaseKeys = require('snakecase-keys')
const camelCaseKeys = require('camelcase-keys')

const isObject = param => typeof param === 'object'
const isString = param => typeof param === 'string'
const isFunction = param => typeof param === 'function'

const defaultOptions = {httpEndpoint: 'http://jungle.eosio.cr'}

const snakifyObjects = (argumentsObject) => 
  Object
    .entries(argumentsObject)
    .reduce((prev, [ key, value ]) => ({
      ...prev,
      [key]: isObject(value) ? snakeCaseKeys(value) : value
    }), {})

const camelizeResponse = (response) => {
  if (isObject(response)) {
    return camelCaseKeys(response)
  } else if (isString(response)) {
    try {
      return camelCaseKeys(JSON.parse(response))
    } catch (error) {
      return response
    }
  }
  return response
}

const getInstance = options => {
  const eosApi = new EOSAPI(Object.assign({}, defaultOptions, options))
  const camelApi = {}

  Object.keys(eosApi).forEach(key => {
    if (isObject(eosApi[key])) {
      camelApi[key] = eosApi[key]
    } else if (isFunction(eosApi[key])) {
      camelApi[key] = async function () {
        const snakedArgs = Object.values(snakifyObjects(arguments))
        return eosApi[key].apply(null, snakedArgs).then(camelizeResponse)
      }
    }
  })
  
  //add custom utility function in camel namespace
  camelApi.camel = {
    getConfig: () => options // the initial options object
  }

  return camelApi
}

module.exports = {
  getInstance
}