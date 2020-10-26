var client = require('./contentfulClient').client
var helper = require('../helpers/changeclient')

function getCategory (id, query) {
  // little trick to get an entry with include
  // this way all linked items will be resolved for us
  let myClient = client;
  let config = helper.switchClient(myClient, query)
  config.query['content_type'] = 'category'
  config.query['sys.id'] = id
  return config.myClient.getEntries(config.query)
}

function getCategories (query) {
  let myClient = client;
  let config = helper.switchClient(myClient, query)
  config.query.content_type = 'category'
  return config.myClient.getEntries(config.query)
}
module.exports = {
  getCategory,
  getCategories
}
