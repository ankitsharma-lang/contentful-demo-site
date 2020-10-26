var contentful = require('contentful')
var config = require('../package.json').config || {}
var cmacontentful = require('contentful-management')
var cmaclient = cmacontentful.createClient({
  accessToken: config.cmaToken
})

var client = contentful.createClient({
  accessToken: config.accessToken,
  space: config.space
})

function getClient(env=null) {
  if (env != null) {
    return contentful.createClient({
      accessToken: config.accessToken,
      environment: env,
      space: config.space
    })
  } else {
    return contentful.createClient({
      accessToken: config.accessToken,
      space: config.space
    })
  }
}

// exports.client = client
module.exports = {
  client: client,
  cmaclient: cmaclient,
  config: config,
  getClient: getClient
}
