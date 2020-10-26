var client = require('./contentfulClient').client
var helper = require('../helpers/changeclient')

function getBrand (brandId, query) {
  let myClient = client;
  let config = helper.switchClient(myClient, query)
  config.query['sys.id'] = brandId
  return config.myClient.getEntries(config.query)
}

module.exports = {
  getBrand
}
