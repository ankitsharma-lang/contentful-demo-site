var client = require('./contentfulClient').client
var cmaclient = require('./contentfulClient').cmaclient
var config = require('./contentfulClient').config

function getSpace (query) {
  query = query || {}
  // query.content_type = 'product'
  return client.getSpace(query)
}

function getEnvironment (query) {
  query = query || {}
  return cmaclient.getSpace(config.space)
  .then((space) => space.getEnvironments())
}

function getLocales (query) {
  query = query || {}
  return client.getLocales(query)
}

module.exports = {
  getSpace,
  getEnvironment,
  getLocales
}
