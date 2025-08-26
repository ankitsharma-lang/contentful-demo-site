// services/contentfulClient.js
const contentful = require('contentful');

const config = {
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com'
};

const client = contentful.createClient({
  space: config.space,
  accessToken: config.accessToken,
  environment: config.environment,
  host: config.host
});

module.exports = { config, client };
