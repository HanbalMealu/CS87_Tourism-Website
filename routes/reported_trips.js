const express = require('express')
const reportedtrips = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const multer=require('multer')
const con = require("../database/db");
const bcrypt = require('bcrypt')
const reported_trip= require('../models/reported_trip')

reportedtrips.post('/register', (req, res) => {

    const {id,reporter_email,reason}  = req.body
    const reportedtripData={
       id,
    reporter_email,
    reason
  }
  console.log("body in uploads that came from react", reportedtripData)
  reported_trip.create(reportedtripData)
  .then(reported_trip => {
    res.json('Report Registered!' )
    res.end();
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})
reportedtrips.get('/tourlist', function (req, res) {
    var connection=con.getConnection();
connection.query('select report_id,reported_trips.id as id,trips.departure_date,reason,trips.departure_city,trips.arrival_city,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,reported_trips.reporter_email,users.id as user_id,users.first_name,status,users.last_name,users.email,users.contact,users.rating,users.dp from reported_trips inner join trips on reported_trips.id=trips.id inner join users on trips.touroperator_id=users.id', function (error, results, fields) {
      if (error) throw error;
      res.json(results)
      res.end();
  });
         });
         reportedtrips.post('/ignore', function (req, res) {
            var connection=con.getConnection();
        connection.query('delete from reported_trips where report_id ='+req.body.id, function (error, results, fields) {
              if (error) throw error;
              res.json(results)
              res.end();
          });
                 });

module.exports= reportedtrips