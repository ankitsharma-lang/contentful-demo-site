var client = require('./contentfulClient').client
var helper = require('../helpers/changeclient')

function getProduct (slug, query) {
  // little trick to get an entry with include
  // this way all linked items will be resolved for us
  let myClient = client;
  let config = helper.switchClient(myClient, query)
  config.query.content_type = 'product'
  config.query['fields.slug'] = slug
  console.log(config.query)
  return config.myClient.getEntries(config.query)
}

function getProducts (query) {
  let myClient = client;
  let config = helper.switchClient(myClient, query)
  config.query.content_type = 'product'
  return config.myClient.getEntries(config.query)
}

function getProductsInCategory (id) {
  return getProducts({'fields.categories.sys.id[in]': id})
}

module.exports = {
  getProduct,
  getProducts,
  getProductsInCategory
}
