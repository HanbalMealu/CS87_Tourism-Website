var express = require('express')
var cors = require('cors')
const con = require("./database/db");
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000
var fs=require('fs');

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})
app.use('/uploads', express.static('uploads'))

var Users = require('./routes/Users')

app.use('/users', Users)

var trips = require('./routes/trips')

app.use('/trips', trips)
var featuredtrips = require('./routes/featured_trips')

app.use('/featuredtrips', featuredtrips)
var reportedrips = require('./routes/reported_trips')

app.use('/reportedtrips', reportedrips)
var reportedservices = require('./routes/reported_services')

app.use('/reportedservices', reportedservices)
var ratings = require('./routes/ratings')

app.use('/ratings',ratings)
var forums = require('./routes/forums')

app.use('/forums',forums)
var messages=require('./routes/messages')

app.use('/messages',messages)
var hotels=require('./routes/hotels')

app.use('/hotels',hotels)

var rentalservices = require('./routes/rentalservices')

app.use('/rentalservices',rentalservices)
var featuredrentalservices = require('./routes/featured_rentalservices')

app.use('/featuredrentalservices',featuredrentalservices)
app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
