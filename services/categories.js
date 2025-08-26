// services/categories.js
var client = require('./contentfulClient').client;
var helper = require('../helpers/changeclient');
var { getTypeId } = require('./contentTypeResolver');

const CATEGORY_KEY = process.env.CATEGORY_TYPE_KEY || 'category';

function getCategories(query) {
  let myClient = client;
  let config = helper.switchClient(myClient, query);
  return getTypeId(CATEGORY_KEY).then(typeId => {
    config.query.content_type = typeId || CATEGORY_KEY;
    return config.myClient.getEntries(config.query);
  });
}

module.exports = { getCategories };
