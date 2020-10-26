var client = require('./contentfulClient').client
var helper = require('../helpers/changeclient')

var contentTypes = {}

function getContentTypes (query) {
  let myClient = client;
  let config = helper.switchClient(myClient, query)
  return config.myClient.getContentTypes().then(function (collection) {
    contentTypes = collection
  })
}

module.exports = {
  contentTypes: contentTypes,
  getContentTypes: getContentTypes
}
