var express = require('express')
var router = express.Router()
var categories = require('../services/categories.js')
var products = require('../services/products')
/* router params */
router.param('id', function (req, res, next, id) {
  categories.getCategories({request: req}).then(function (categories) {
    req.categories = categories.items
    products.getProductsInCategory(id, {request: req}).then(function (productsCollection) {
      req.products = productsCollection.items
      next()
    }).catch(function (err) {
      console.log('categories.js - getProductsInCategory (line 9) error:', JSON.stringify(err,null,2))
      next()
    })
  }).catch(function (err) {
    console.log('categories.js - getCategories (line 7) error:', JSON.stringify(err,null,2))
    next()
  })
})

router.use(function (req, res, next) {
  categories.getCategories({request: req}).then(function (categoryCollection) {
    req.categories = categoryCollection.items
    products.getProducts({request: req}).then(function (productsCollection) {
      req.products = productsCollection.items
      next()
    }).catch(function (err) {
      console.log('categories.js - getProducts (line 25) error:', JSON.stringify(err,null,2))
      next()
    })
  }).catch(function (err) {
    console.log('categories.js - getCategories (line 23) error:', JSON.stringify(err,null,2))
    next()
  })
})

router.get('/:id', function (req, res, next) {
  res.render('categories', {title: 'Categories', categories: req.categories, products: req.products})
})
router.get('/', function (req, res, next) {
  res.render('categories', {title: 'Categories', categories: req.categories, products: req.products})
})
module.exports = router
