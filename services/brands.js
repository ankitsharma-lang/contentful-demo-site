// services/brands.js
var client = require('./contentfulClient').client;
var helper = require('../helpers/changeclient');
var { getTypeId } = require('./contentTypeResolver');

const BRAND_KEY = process.env.BRAND_TYPE_KEY || 'brand';

function getBrands(query) {
  let myClient = client;
  let config = helper.switchClient(myClient, query);
  return getTypeId(BRAND_KEY).then(typeId => {
    config.query.content_type = typeId || BRAND_KEY;
    return config.myClient.getEntries(config.query);
  });
}

module.exports = { getBrands };
