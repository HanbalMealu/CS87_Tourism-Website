const express = require('express')
const featuredtrips = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const multer=require('multer')
const con = require("../database/db");
const bcrypt = require('bcrypt')
const featured_trip= require('../models/featured_trip')

featuredtrips.post('/add', (req, res) => {

    const {id,until}  = req.body
    const featuredtripData={
    id,
    until
  }
  console.log("body in uploads that came from react", featuredtripData)
  featured_trip.create(featuredtripData)
  .then(featured_trip => {
    res.json('Trip Registered!' )
    
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})
featuredtrips.get('/feattourcount', function (req, res) {
  var connection=con.getConnection();
connection.query('select count(id) as feattours from featured_trips where until>=date(now())', function (error, results, fields) {
    if (error) throw error;
    res.json(results)
    res.end(); 
});
       });
module.exports= featuredtrips

