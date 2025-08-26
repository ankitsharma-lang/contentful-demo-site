// services/spaces.js
const contentfulManagement = require('contentful-management');

const managementClient = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN   // set in Vercel
});

function getEnvironment() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  return managementClient.getSpace(spaceId).then(space => space.getEnvironments());
}

module.exports = { getEnvironment };
