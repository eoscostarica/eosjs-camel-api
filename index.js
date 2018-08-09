'use strict'

const EOSAPI = require('eosjs-api')
const snakeCaseKeys = require('snakecase-keys')
const camelCaseKeys = require('camelcase-keys')

const isObject = param => typeof param === 'object'
const isString = param => typeof param === 'string'
const isFunction = param => typeof param === 'function'

const defaultOptions = {httpEndpoint: 'http://jungle.eosio.cr'}

const snakifyObjects = (argumentsObject) => {
  const snakifiedArgs = {}
    Object.keys(argumentsObject).forEach(argKey => {
      if (isObject(argumentsObject[argKey])) {
        snakifiedArgs[argKey] = snakeCaseKeys(argumentsObject[argKey])
      } else {
        snakifiedArgs[argKey] = argumentsObject[argKey]
      }
    })
    return snakifiedArgs
}

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