const express = require('express')
const rentalservices = express.Router()

const cors = require('cors')
const multer=require('multer')
const con = require("../database/db");
const rentalservice= require('../models/rentalservice')
rentalservices.use(cors())
process.env.SECRET_KEY = 'secret'
let fileName; 
let fileNames=[];
global.keyword='';
global.location='';
global.cost='';
global.rentalsort='';

rentalservices.post('/register', (req, res) => {

  const storageTarget = multer.diskStorage({
    destination : "uploads",
        filename: (req,file,cb)=>{
            fileName = "a" + Date.now() + file.originalname
            cb(null, fileName)
           fileNames.push(fileName);
            
        }
})
const upload = multer({storage:storageTarget}).array('file')




rentalservices.use(cors())
process.env.SECRET_KEY = 'secret'
upload(req,res,async ()=>{
  const {category,title, location,price,details, touroperator_id,}  = req.body
  const rentalserviceData ={
    category,
    title,
    location,
    price,
    details,
    touroperator_id,
    created: new Date(),
    pic:fileNames[0],
    pic1:fileNames[1],
    pic2:fileNames[2],
    pic3:fileNames[3],
    pic4:fileNames[4],
    

  }
  fileNames=[];
  console.log("body in uploads that came from react", rentalserviceData)
    
   
          rentalservice.create(rentalserviceData)
            .then(rentalservice=> {
              res.json('Service registered!' )
            })
            .catch(err => {
              res.send('error: ' + err)
            })
          })
})
      
          rentalservices.get('/toollist', function (req, res) {
            var connection=con.getConnection();
            connection.query('select * from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="tool"', function (error, results, fields) {
            if (error) throw error;
              res.json(results)
          });
          });
          rentalservices.get('/accomodationlist', function (req, res) {
            var connection=con.getConnection();
            connection.query('select * from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="accomodation"', function (error, results, fields) {
            if (error) throw error;
              res.json(results)
          });
          });
          rentalservices.get('/guidelist', function (req, res) {
            var connection=con.getConnection();
            connection.query('select * from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="guide"', function (error, results, fields) {
            if (error) throw error;
              res.json(results)
          });
          });
          rentalservices.get('/vehiclelist', function (req, res) {
            var connection=con.getConnection();
            connection.query('select * from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="vehicle"', function (error, results, fields) {
            if (error) throw error;
              res.json(results)
          });
          });
          rentalservices.get('/cameramanlist', function (req, res) {
            var connection=con.getConnection();
            connection.query('select * from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="cameraman"', function (error, results, fields) {
            if (error) throw error;
              res.json(results)
          });
          });
          rentalservices.get('/serviceslist', function (req, res) {
            var connection=con.getConnection();
            connection.query('select * from rentalservices inner join users on rentalservices.touroperator_id=users.id', function (error, results, fields) {
            if (error) throw error;
              res.json(results)
          });
          });

          rentalservices.post('/filter',function(req,res){
            global.location=req.body.location
            global.cost=req.body.cost
            global.keyword=req.body.keyword
            global.rentalsort=req.body.sort
            console.log(global.keyword,global.location,global.cost,global.rentalsort)
            res.end();
          })  
      
          rentalservices.get('/filteredaccomodationlist', function (req, res) {
            var connection=con.getConnection();
            if (global.rentalsort==''||global.rentalsort==undefined)
            global.rentalsort='rentalservices.posted desc'
            if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& global.cost!=''&& global.cost!=undefined)
            connection.query('select rentalservices.id as s_id,status,rentalservices.category,created,gender,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="accomodation" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
              if (error) throw error;
              res.json(results)
              console.log(global.keyword,global.location,global.cost,global.rentalsort)
              res.end();
          });
          else if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& (global.cost==''||global.cost==undefined))
          connection.query('select rentalservices.id as s_id,status,rentalservices.category,created,gender,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="accomodation" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
            if (error) throw error;
            res.json(results)
            res.end();
            console.log(global.keyword,global.location,global.cost,global.rentalsort)
        });
        else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
        connection.query('select rentalservices.id as s_id,status,rentalservices.category,created,gender,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="accomodation" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%"'+' order by '+global.rentalsort, function (error, results, fields) {
          if (error) throw error;
          res.json(results)
          res.end();
          console.log(global.keyword,global.location,global.cost,global.rentalsort) 
      });
      else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&& (global.cost==''||global.cost==undefined))
      connection.query('select rentalservices.id as s_id,status,rentalservices.category,created,gender,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="accomodation" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
        if (error) throw error;
        res.json(results)
        res.end();
        console.log(global.keyword,global.location,global.cost,global.rentalsort)
    });
      else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
          connection.query('select rentalservices.id as s_id,status,rentalservices.category,created,gender,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="accomodation" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
            if (error) throw error;
            res.json(results)
            res.end();
            console.log(global.keyword,global.location,global.cost,global.rentalsort)
        });
        else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&&global.location!=undefined&& global.cost!=''&&global.cost!=undefined)
        connection.query('select rentalservices.id as s_id,status,rentalservices.category,created,gender,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="accomodation" and location = '+'"'+global.location+'" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
          if (error) throw error;
          res.json(results)
          res.end();
          console.log(global.keyword,global.location,global.cost,global.rentalsort)
      });
        else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
        connection.query('select rentalservices.id as s_id,status,rentalservices.category,created,gender,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="accomodation" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
          if (error) throw error;
          res.json(results)
          res.end();
          console.log(global.keyword,global.location,global.cost,global.rentalsort)
      });
      else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
      connection.query('select rentalservices.id as s_id,status,rentalservices.category,created,gender,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="accomodation"  ' +' order by '+global.rentalsort, function (error, results, fields) {
        if (error) throw error;
        res.json(results)
        res.end();
        console.log(global.keyword,global.location,global.cost,global.rentalsort)
    });
        });


  //--------------------------------------------------

  rentalservices.get('/filteredtoollist', function (req, res) {
    var connection=con.getConnection();
    if (global.rentalsort==''||global.rentalsort==undefined)
    global.rentalsort='rentalservices.posted desc'
    if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& global.cost!=''&& global.cost!=undefined)
    connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="tool" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
      res.end();
      console.log(global.keyword,global.location,global.cost,global.rentalsort)
      
  });
  else if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& (global.cost==''||global.cost==undefined))
  connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="tool" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
    res.end();
    console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="tool" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%"'+' order by '+global.rentalsort, function (error, results, fields) {
  if (error) throw error;
  res.json(results)
  res.end();
  console.log(global.keyword,global.location,global.cost,global.rentalsort) 
});
else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="tool" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
  connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="tool" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
    res.end();
    console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&&global.location!=undefined&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="tool" and location = '+'"'+global.location+'" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
  if (error) throw error;
  res.json(results)
  res.end();
  console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="tool" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
  if (error) throw error;
  res.json(results)
  res.end();
  console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="tool"  ' +' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
});

//----------------------------------------------
rentalservices.get('/filteredvehiclelist', function (req, res) {
  var connection=con.getConnection();
  if (global.rentalsort==''||global.rentalsort==undefined)
  global.rentalsort='rentalservices.posted desc'
  if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& global.cost!=''&& global.cost!=undefined)
  connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="vehicle" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
    res.end();
    console.log(global.keyword,global.location,global.cost,global.rentalsort)
    
});
else if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="vehicle" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
  if (error) throw error;
  res.json(results)
  res.end();
  console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="vehicle" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%"'+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort) 
});
else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="vehicle" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="vehicle" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
  if (error) throw error;
  res.json(results)
  res.end();
  console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&&global.location!=undefined&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="vehicle" and location = '+'"'+global.location+'" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="vehicle" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="vehicle"  ' +' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
});

//-------------------------------------------------------
rentalservices.get('/filteredguidelist', function (req, res) {
  var connection=con.getConnection();
  if (global.rentalsort==''||global.rentalsort==undefined)
  global.rentalsort='rentalservices.posted desc'
  if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& global.cost!=''&& global.cost!=undefined)
  connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="guide" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
    res.end();
    console.log(global.keyword,global.location,global.cost,global.rentalsort)
    
});
else if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="guide" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
  if (error) throw error;
  res.json(results)
  res.end();
  console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="guide" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%"'+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort) 
});
else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="guide" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="guide" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
  if (error) throw error;
  res.json(results)
  res.end();
  console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&&global.location!=undefined&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="guide" and location = '+'"'+global.location+'" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="guide" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="guide"  ' +' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
});
//------------------------------------------------------------------------------
rentalservices.get('/filteredcameramanlist', function (req, res) {
  var connection=con.getConnection();
  if (global.rentalsort==''||global.rentalsort==undefined)
  global.rentalsort='rentalservices.posted desc'
  if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& global.cost!=''&& global.cost!=undefined)
  connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="cameraman" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
    res.end();
    console.log(global.keyword,global.location,global.cost,global.rentalsort)
    
});
else if(global.keyword!=''&&global.keyword!=undefined&&global.location!=''&&global.location!=undefined&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="cameraman" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
  if (error) throw error;
  res.json(results)
  res.end();
  console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="cameraman" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%"'+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort) 
});
else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviewsfrom rentalservices inner join users on rentalservices.touroperator_id=users.id where category="cameraman" and location ='+'"'+global.location+'"'+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if(global.keyword!=''&&global.keyword!=undefined&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="cameraman" and title like '+'"%'+global.keyword+'%" or details like '+'"%'+global.keyword+'%" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
  if (error) throw error;
  res.json(results)
  res.end();
  console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&global.location!=''&&global.location!=undefined&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="cameraman" and location = '+'"'+global.location+'" and price<='+global.cost+' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& global.cost!=''&&global.cost!=undefined)
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="cameraman" and price <= '+global.cost +' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
else if((global.keyword==''||global.keyword==undefined)&&(global.location==''||global.location==undefined)&& (global.cost==''||global.cost==undefined))
connection.query('select rentalservices.id as s_id,status,rentalservices.category,rentalservices.title,rentalservices.location,users.id,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.id as user_id,users.first_name,users.last_name,users.email,users.CNIC,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews from rentalservices inner join users on rentalservices.touroperator_id=users.id where category="cameraman"  ' +' order by '+global.rentalsort, function (error, results, fields) {
if (error) throw error;
res.json(results)
res.end();
console.log(global.keyword,global.location,global.cost,global.rentalsort)
});
});
//--------------------------------------------------------------------
rentalservices.post('/update', (req, res) => {

  const storageTarget = multer.diskStorage({
    destination : "uploads",
        filename: (req,file,cb)=>{
            fileName = "a" + Date.now() + file.originalname
            cb(null, fileName)
           fileNames.push(fileName);
            
        }
})
const upload = multer({storage:storageTarget}).array('file')




rentalservices.use(cors())
process.env.SECRET_KEY = 'secret'
upload(req,res,async ()=>{
  const {title, location,price,details,id}  = req.body
  
 if(fileNames[0]=='' || fileNames[0]==undefined)
    fileNames[0]=req.body.pic

  if(fileNames[1]=='' || fileNames[1]==undefined)
    fileNames[1]=req.body.pic1
  

    if(fileNames[2]=='' || fileNames[2]==undefined)
    fileNames[2]=req.body.pic2
 
    if(fileNames[3]=='' || fileNames[3]==undefined)
    fileNames[3]=req.body.pic3
  
    if(fileNames[4]=='' || fileNames[4]==undefined)
    fileNames[4]=req.body.pic4
 

  const newrentalserviceData ={
    
    title,
    location,
    price,
    details,
    id,
    pic:fileNames[0],
    pic1:fileNames[1],
    pic2:fileNames[2],
    pic3:fileNames[3],
    pic4:fileNames[4],   

  }
  fileNames=[]
  console.log("body in uploads that came from react", newrentalserviceData)
    var connection=con.getConnection();
    querry='update rentalservices set title="'+newrentalserviceData.title+'",price='+newrentalserviceData.price+',details="'+newrentalserviceData.details+'",location="'+newrentalserviceData.location+'",pic="'+newrentalserviceData.pic+'",pic1="'+newrentalserviceData.pic1+'",pic2="'+newrentalserviceData.pic2+'",pic3="'+newrentalserviceData.pic3+'",pic4="'+newrentalserviceData.pic4+'" where id = '+newrentalserviceData.id
   
    connection.query(querry, function (error, results, fields) {
      if (error) throw error;
       res.json(results)
   });
})
})

rentalservices.post('/delete',function(req,res){
  var connection=con.getConnection();
  delete_id=req.body.id
  querry='delete from rentalservices where id ='+delete_id
  connection.query(querry,function(error,results,fields){
    if(error) throw error;
    res.json ('service deleted Successfully')
    console.log(querry)
    res.end();
  })
})

rentalservices.get('/allserviceslist', function (req, res) {
  var connection=con.getConnection();
  connection.query('select rentalservices.id,rentalservices.category,rentalservices.title,rentalservices.location,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.first_name,users.last_name,users.email,users.contact,users.rating,users.dp from rentalservices inner join users on rentalservices.touroperator_id=users.id', function (error, results, fields) {
  if (error) throw error;
    res.json(results)
    res.end();
});
});


rentalservices.get('/featuredtoollist', function (req, res) {
  var connection=con.getConnection();
  connection.query('select * from featured_rentalservices inner join rentalservices on featured_rentalservices.id=rentalservices.id inner join users on rentalservices.touroperator_id=users.id where category="tool" and until>=date(now())', function (error, results, fields) {
  if (error) throw error;
    res.json(results)
    res.end();
});
});
rentalservices.get('/featuredaccomodationlist', function (req, res) {
  var connection=con.getConnection();
  connection.query('select * from featured_rentalservices inner join rentalservices on featured_rentalservices.id=rentalservices.id inner join users on rentalservices.touroperator_id=users.id where category="accomodation" and until>=date(now())', function (error, results, fields) {
  if (error) throw error;
    res.json(results)
    res.end();
});
});
rentalservices.get('/featuredguidelist', function (req, res) {
  var connection=con.getConnection();
  connection.query('select * from featured_rentalservices inner join rentalservices on featured_rentalservices.id=rentalservices.id inner join users on rentalservices.touroperator_id=users.id  where category="guide" and until>=date(now())', function (error, results, fields) {
  if (error) throw error;
    res.json(results)
    res.end();
});
});
rentalservices.get('/featuredvehiclelist', function (req, res) {
  var connection=con.getConnection();
  connection.query('select * from featured_rentalservices inner join rentalservices on featured_rentalservices.id=rentalservices.id inner join users on rentalservices.touroperator_id=users.id  where category="vehicle" and until>=date(now())', function (error, results, fields) {
  if (error) throw error;
    res.json(results)
    res.end();
});
});
rentalservices.get('/featuredcameramanlist', function (req, res) {
  var connection=con.getConnection();
  connection.query('select * from featured_rentalservices inner join rentalservices on featured_rentalservices.id=rentalservices.id inner join users on rentalservices.touroperator_id=users.id  where category="cameraman" and until>=date(now())', function (error, results, fields) {
  if (error) throw error;
    res.json(results)
    res.end();
});
});
rentalservices.get('/servicescount', function (req, res) {
  var connection=con.getConnection();
  connection.query('select count(id) as totalservices from rentalservices', function (error, results, fields) {
  if (error) throw error;
    res.json(results)
    res.end();
});
});

module.exports= rentalservices