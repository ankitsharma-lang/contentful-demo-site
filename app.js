var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compression = require('compression')
var helmet = require('helmet')
var products = require('./routes/products')
var categories = require('./routes/categories')
var brands = require('./routes/brands')
var spaces = require('./services/spaces')

var config = require('./services/contentfulClient').config
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('view cache', true)
app.use(helmet()) // protect from well known vulnerabilities
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', products)
app.use('/products', products)
app.use('/categories', categories)
app.use('/brand', brands)

app.get('/get-session-data', function (req, res) {
  let cookie = req.cookies.sessionData;
  if (cookie === undefined) {
    cookie = {}
    let options = { maxAge: 1000*60*60, httpOnly: false }
    spaces.getEnvironment().then(function (envcollection) {
      cookie['env'] = envcollection.items
      return spaces.getLocales()
    })
    .then(function (locales) { 
      cookie['locales'] = locales.items
      cookie['sel_env'] = req.query.sel_env || 'master'
      cookie['sel_locale'] = req.query.sel_locale || 'en-US'
      res.cookie('sessionData',cookie,options)
      res.send(cookie)
    })
    .catch(function (err) {
      console.log('app.js - getEnvironment (line 48) error:', JSON.stringify(err,null,2))
    })
  } else {
    cookie['sel_env'] = req.query.sel_env || 'master'
    cookie['sel_locale'] = req.query.sel_locale || 'en-US'
    res.send(cookie)
  }
})

app.get('/set-session-data', function (req, res) {
  var cookie = req.cookies.sessionData
  let options = { maxAge: 1000*60*60, httpOnly: false }
  cookie['sel_env'] = req.query.sel_env
  cookie['sel_locale'] = req.query.sel_locale
  res.cookie('sessionData',cookie,options)
  res.send(cookie)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(logger('dev'))
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
