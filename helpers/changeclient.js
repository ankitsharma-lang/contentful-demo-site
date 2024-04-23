var client = require('../services/contentfulClient')

function processClientAndQuery(myClient, query) {
    if (query && query.request) {
      var req = query.request
      if (req.cookies.sessionData ) {
        if (req.cookies.sessionData.sel_env) {
          myClient = client.getClient(req.cookies.sessionData.sel_env)
        } 
        if (req.cookies.sessionData.sel_locale) {
          query.locale = req?.query?.locale ?? req.cookies.sessionData.sel_locale
        }
      }
      delete query.request;
    } else {
      query = query || {}
    }
    return {
      myClient: myClient,
      query: query
    }
}

module.exports = {
    switchClient: processClientAndQuery
}