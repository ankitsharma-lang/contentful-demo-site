// services/products.js
var client = require('./contentfulClient').client;
var helper = require('../helpers/changeclient');
var { getTypeId } = require('./contentTypeResolver');

// You can choose to resolve by API ID or by display name.
// These env vars are optional; fall back to common names.
const PRODUCT_KEY = process.env.PRODUCT_TYPE_KEY || 'product';

function getProduct(slug, query) {
  let myClient = client;
  let config = helper.switchClient(myClient, query);

  return getTypeId(PRODUCT_KEY).then(typeId => {
    config.query.content_type = typeId || PRODUCT_KEY; // fallback if not found
    config.query['fields.slug'] = slug;
    return config.myClient.getEntries(config.query);
  });
}

function getProducts(query) {
  let myClient = client;
  let config = helper.switchClient(myClient, query);

  return getTypeId(PRODUCT_KEY).then(typeId => {
    config.query.content_type = typeId || PRODUCT_KEY;
    return config.myClient.getEntries(config.query);
  });
}

function getProductsInCategory(id) {
  return getProducts({ 'fields.categories.sys.id[in]': id });
}

module.exports = { getProduct, getProducts, getProductsInCategory };
