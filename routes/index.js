var express = require('express')
var router = express.Router()
var products = require('../services/products')

/* GET home page. */
router.use(function (req, res, next) {
  var request = {request: req};
  if (res.locals.context == '1') {
    request = req.query;
    delete req.query.context;
  }

  products.getProducts(request).then(function (productCollection) {
    req.products = productCollection
    next()
  }).catch(function (err) {
    console.log('index.js - getProducts (line 7) error:', JSON.stringify(err,null,2))
    next()
  })
})

router.get('/', function (req, res, next) {
  res.render('products', {
    'title': 'Products',
    'products': req.products
  })
})

module.exports = router
