// services/contentTypeResolver.js
const contentfulManagement = require('contentful-management');

let cache = null;
let cachedAt = 0;
const TTL_MS = 5 * 60 * 1000; // 5 minutes

function fetchTypes() {
  if (cache && Date.now() - cachedAt < TTL_MS) return Promise.resolve(cache);

  const client = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN // set in Vercel (server-side only)
  });

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const envId = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  return client.getSpace(spaceId)
    .then(space => space.getEnvironment(envId))
    .then(env => env.getContentTypes({ limit: 1000 }))
    .then(cts => {
      // Build a lookup map by API ID and by display name (both lowercased)
      const map = {};
      cts.items.forEach(ct => {
        if (ct && ct.sys && ct.sys.id) {
          const id = ct.sys.id;
          const name = (ct.name || '').toLowerCase();
          map[id.toLowerCase()] = id;
          if (name) map[name] = id; // allow resolving by human name too
        }
      });
      cache = map;
      cachedAt = Date.now();
      return map;
    });
}

/**
 * key can be either:
 *  - the API ID (e.g., "product", "catalogItem", "sFzTZbSuM8coEwygeUYes"), or
 *  - the display name (e.g., "Product", "Category", "Brand")
 */
function getTypeId(key) {
  if (!key) return Promise.resolve(undefined);
  return fetchTypes().then(map => map[key.toLowerCase()]);
}

module.exports = { getTypeId };
