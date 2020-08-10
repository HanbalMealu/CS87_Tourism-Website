const express = require('express')
const trips = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const multer=require('multer')
const con = require("../database/db");
const bcrypt = require('bcrypt')
const trip= require('../models/trip')


let fileName;
global.departure_city='';
global.arrival_city='',
global.cost='',
global.sort=''
trips.post('/register', (req, res) => {

  const storageTarget = multer.diskStorage({
        destination : "uploads",
            filename: (req,file,cb)=>{
                fileName = "a" + Date.now() + file.originalname
                cb(null, fileName)
                
            }
    })
const upload = multer({storage:storageTarget}).single(`file`)
trips.use(cors())
process.env.SECRET_KEY = 'secret'
upload(req,res,async ()=>{
  const {departure_city,departure_date,arrival_city,return_date,cost,details,touroperator_id,days}  = req.body
  const tripData ={
    departure_city,
    arrival_city,
    departure_date,
    
    return_date,
    cost,
    details,
    touroperator_id,
    days,
    created: new Date(),
    pic:fileName
    
  }
  console.log("body in uploads that came from react", tripData)
    
   
          trip.create(tripData)
            .then(trip => {
              res.json('Trip Registered!' )
            })
            .catch(err => {
              res.send('error: ' + err)
            })
          })
        })

          
          trips.get('/tourlist', function (req, res) {
            var connection=con.getConnection();
  connection.query('select trips.id as id,trips.departure_date,trips.departure_city,trips.arrival_city,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,users.id as user_id,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from trips inner join users on trips.touroperator_id=users.id', function (error, results, fields) {
              if (error) throw error;
              res.json(results)
              
          });
                 });
          trips.post('/filter',function(req,res){
            global.departure_city=req.body.departure_city
            global.cost=req.body.cost
            global.arrival_city=req.body.arrival_city
            global.sort=req.body.sort
            console.log(global.departure_city,global.arrival_city,global.cost,global.sort)
          })  

          trips.get('/filteredtourlist', function (req, res) {
            if (global.sort=='')
            global.sort='trips.posted'
            var connection=con.getConnection();
            if(global.departure_city!=''&&global.arrival_city!=''&& cost!='')
            connection.query('select trips.id as id,status,gender,createdtrips.departure_date,trips.departure_city,trips.arrival_city,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,users.id as user_id,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from trips inner join users on trips.touroperator_id=users.id where departure_city = '+'"'+global.departure_city+'" and arrival_city ='+'"'+global.arrival_city+'" and cost <= '+global.cost +' order by '+global.sort, function (error, results, fields) {
              if (error) throw error;
              res.json(results)
              res.end();
          });
          else if(global.departure_city!=''&&global.arrival_city!=''&& cost=='')
          connection.query('select trips.id as id,trips.departure_date,trips.departure_city,trips.arrival_city,status,gender,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,users.id as user_id,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from trips inner join users on trips.touroperator_id=users.id where departure_city = '+'"'+global.departure_city+'" and arrival_city ='+'"'+global.arrival_city+'"'+' order by ' +global.sort, function (error, results, fields) {
            if (error) throw error;
            res.json(results)
            res.end();
            
        });
        else if(global.departure_city!=''&&global.arrival_city==''&& cost=='')
        connection.query('select trips.id as id,trips.departure_date,trips.departure_city,status,gender,created,trips.arrival_city,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,users.id as user_id,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from trips inner join users on trips.touroperator_id=users.id where departure_city = '+'"'+global.departure_city+' "'+' order by '+global.sort, function (error, results, fields) {
          if (error) throw error;
          res.json(results)
          res.end();
          
      });
      else if(global.departure_city==''&&global.arrival_city!=''&& cost=='')
      connection.query('select trips.id as id,trips.departure_date,trips.departure_city,status,gender,created,trips.arrival_city,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,users.id as user_id,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from trips inner join users on trips.touroperator_id=users.id where arrival_city ='+'"'+global.arrival_city+'"'+' order by '+global.sort, function (error, results, fields) {
        if (error) throw error;
        res.json(results)
        res.end();
        
    });
      else if(global.departure_city!=''&&global.arrival_city==''&& cost!='')
          connection.query('select trips.id as id,trips.departure_date,trips.departure_city,status,gender,created,trips.arrival_city,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,users.id as user_id,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from trips inner join users on trips.touroperator_id=users.id where departure_city = '+'"'+global.departure_city+'" and cost<='+global.cost+' order by '+global.sort, function (error, results, fields) {
            if (error) throw error;
            res.json(results)
            res.end();
            
        });
        else if(global.departure_city==''&&global.arrival_city!=''&& cost!='')
        connection.query('select trips.id as id,trips.departure_date,trips.departure_city,status,gender,created,trips.arrival_city,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,users.id as user_id,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from trips inner join users on trips.touroperator_id=users.id where arrival_city = '+'"'+global.arrival_city+'" and cost<='+global.cost+' order by '+global.sort, function (error, results, fields) {
          if (error) throw error;
          res.json(results)
          res.end();
          
      });
        else if(global.departure_city==''&&global.arrival_city==''&& cost!='')
        connection.query('select trips.id as id,trips.departure_date,trips.departure_city,status,gender,created,trips.arrival_city,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,users.id as user_id,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from trips inner join users on trips.touroperator_id=users.id where cost <= '+global.cost+' order by '+global.sort, function (error, results, fields) {
          if (error) throw error;
          res.json(results)
          res.end();
          
      });
      else if(global.departure_city==''&&global.arrival_city==''&& cost=='')
      connection.query('select trips.id as id,trips.departure_date,trips.departure_city,status,created,gender,trips.arrival_city,trips.return_date,trips.cost,trips.touroperator_id,trips.details,trips.pic,trips.days,trips.posted,trips.time,users.id as user_id,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from trips inner join users on trips.touroperator_id=users.id' +' order by '+global.sort, function (error, results, fields) {
        if (error) throw error;
        res.json(results)
        res.end();
        
    });
        });

        trips.post('/edittrip', function (req, res) {
          const storageTarget = multer.diskStorage({
            destination : "uploads",
                filename: (req,file,cb)=>{
                    fileName = "a" + Date.now() + file.originalname
                    cb(null, fileName)
                    
                }
        })
    const upload = multer({storage:storageTarget}).single(`file`)
    trips.use(cors())
    process.env.SECRET_KEY = 'secret'
    upload(req,res,async ()=>{
      const {departure_city,departure_date,arrival_city,return_date,cost,details,id,days}  = req.body
      if(fileName=='' || fileName==undefined)
      tripData ={
        departure_city,
        arrival_city,
        departure_date, 
        return_date,
        cost,
        details,
        id,
        days,
        pic:req.body.pic
       }
       else
       tripData ={
        departure_city,
        arrival_city,
        departure_date, 
        return_date,
        cost,
        details,
        id,
        days,
        pic:fileName
       }
      console.log("body in uploads that came from react", tripData)
        


          var connection=con.getConnection();
          querry='update trips set departure_city='+'"'+tripData.departure_city+'",'+'arrival_city='+'"'+tripData.arrival_city+'",'+'departure_date='+'"'+tripData.departure_date+'",'+'return_date='+'"'+tripData.return_date+'",'+'cost='+'"'+tripData.cost+'",'+'days='+'"'+tripData.days+'",'+'details='+'"'+tripData.details+'",'+'pic='+'"'+tripData.pic+'"'+'where id='+tripData.id

   connection.query(querry, function (error, results, fields) {
           if (error) throw error;
            res.json(results)
            res.end();
        });
      })
    })
    trips.post('/delete',function(req,res){
      var connection=con.getConnection();
      delete_id=req.body.id
      querry='delete from trips where id ='+delete_id
      connection.query(querry,function(error,results,fields){
        if(error) throw error;
        res.json ('trip deleted Successfully')
        console.log(querry)
        res.end();
      })
    })  
    trips.get('/featuredtourlist', function (req, res) {
      var connection=con.getConnection();
connection.query('select * from featured_trips inner join trips on featured_trips.id=trips.id inner join users on trips.touroperator_id=users.id where until>=date(now())', function (error, results, fields) {
        if (error) throw error;
        res.json(results)
        res.end();
        
    });
           });
           trips.get('/tripcount', function (req, res) {
            var connection=con.getConnection();
  connection.query('select count(id) as totaltrips from trips', function (error, results, fields) {
              if (error) throw error;
              res.json(results)
              res.end();
              
          });
                 });
module.exports= trips