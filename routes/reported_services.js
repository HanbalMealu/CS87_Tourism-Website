const express = require('express')
const reportedservices = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const multer=require('multer')
const con = require("../database/db");
const bcrypt = require('bcrypt')
const reported_service= require('../models/reported_service')

reportedservices.post('/register', (req, res) => {

    const {id,reporter_email,reason}  = req.body
    const reportedserviceData={
       id,
   
    reporter_email,
    reason
  }
  console.log("body in uploads that came from react", reportedserviceData)
  reported_service.create(reportedserviceData)
  .then(reported_service => {
    res.json('Report Registered!' )
    res.end();
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})
reportedservices.get('/servicelist', function (req, res) {
    var connection=con.getConnection();
connection.query('select report_id,reporter_email,reported_services.id as id,rentalservices.category,status,rentalservices.title,rentalservices.location,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from reported_services inner join rentalservices on reported_services.id=rentalservices.id inner join users on rentalservices.touroperator_id=users.id', function (error, results, fields) {
      if (error) throw error;
      res.json(results)
      res.end();
  });
         });
         reportedservices.post('/ignore', function (req, res) {
            var connection=con.getConnection();
            console.log(req.body.id)
        connection.query('delete from reported_services where report_id ='+req.body.id, function (error, results, fields) {
              if (error) throw error;
              res.json(results)
              res.end();
          });
                 });

module.exports= reportedservices