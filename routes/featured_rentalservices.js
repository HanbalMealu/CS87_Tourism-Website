const express = require('express')
const featuredrentalservices = express.Router()
const cors = require('cors')
const multer=require('multer')
const con = require("../database/db");
const featured_rentalservice= require('../models/featured_rentalservice')
featuredrentalservices.post('/add', (req, res) => {
    const {id,until}  = req.body
    const featrentalserviceData ={
      id,
      until
       
    }
    console.log("body in uploads that came from react", featrentalserviceData)
    
   
    featured_rentalservice.create(featrentalserviceData)
      .then(featured_rentalservice=> {
        res.json('Service added to premium!' )
      })
      .catch(err => {
        res.send('error: ' + err)
      })
    })
    featuredrentalservices.get('/featservicecount', (req, res) => {
    var connection=con.getConnection();
    connection.query('select count(id) as featservices from featured_rentalservices where until>=date(now())', function (error, results, fields) {
        if (error) throw error;
        res.json(results)
        res.end(); 
    });
           });
    module.exports= featuredrentalservices