const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const multer=require('multer')
const con = require("../database/db");
const path = require("path")
const bcrypt = require('bcrypt')
const User = require('../models/User')

let fileName;
global.user='';
global.operator='';
users.post('/register', (req, res) => {

  const storageTarget = multer.diskStorage({
        destination : "uploads",
            filename: (req,file,cb)=>{
                fileName = "a" + Date.now() + file.originalname
                cb(null, fileName)
                
            }
    })
const upload = multer({storage:storageTarget}).single(`file`)

users.use(cors())
process.env.SECRET_KEY = 'secret'

upload(req,res,async ()=>{
  const {first_name, last_name, email, cnic, password, contact,rating, gender}  = req.body
  const userData ={
    first_name,
    last_name,
    email,
    cnic,
    password,
    contact,
    gender,
    created: new Date(),
    dp:fileName,
    rating,
  }
  console.log("body in uploads that came from react", userData)
   User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })

})
  
})  
users.post('/login', (req, res) => {
  

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
    
}) 

users.post('/getid', (req,res) =>  {
  global.user=req.body.id
  console.log('user id from login'+global.user)
  res.end();
  })
users.get('/profile', (req, res) => {
  id=global.user
  console.log('user'+global.user)
  var connection=con.getConnection();
  querry='select * from users where id='+id
connection.query(querry, function (error, results, fields) {
              if (error) throw error;
              res.json(results)
              res.end();
          });
});
users.post('/update',(req,res)=>{

  

  const storageTarget = multer.diskStorage({
        destination : "uploads",
            filename: (req,file,cb)=>{
                if(!file)
                fileName=req.body.dp
                else
                fileName = "a" + Date.now() + file.originalname
                cb(null, fileName)
                
            }
    })
const upload = multer({storage:storageTarget}).single(`file`)

users.use(cors())
process.env.SECRET_KEY = 'secret'

upload(req,res,async ()=>{
  const {first_name, last_name,cnic, password, contact, gender,id}  = req.body

  if(fileName=='' || fileName==undefined)
  userData ={
    first_name,
    last_name,
    cnic,
    password,
    contact,
    id,
    gender,
    dp:req.body.dp,
  
}
else
   userData ={
    first_name,
    last_name,
    cnic,
    password,
    contact,
    id,
    gender,
    dp:fileName,
  }

  
  console.log("body in uploads that came from react", userData)







var connection=con.getConnection();
if (userData.password!=''){
bcrypt.hash(userData.password, 10, (err, hash) => {

querry='update users set first_name='+'"'+userData.first_name+'"'+',last_name='+'"'+userData.last_name+'"'+',gender='+'"'+userData.gender+'"'+',contact='+'"'+userData.contact+'"'+',CNIC='+'"'+userData.cnic+'"'+',password='+'"'+hash+'"'+',dp='+'"'+userData.dp+'"'  +'where id='+userData.id+''
connection.query(querry, function (error, results, fields) {
          if (error) throw error;
          console.log(querry)
          res.end();
        });
})
}
else
{
querry='update users set first_name='+'"'+userData.first_name+'"'+',last_name='+'"'+userData.last_name+'"'+',gender='+'"'+userData.gender+'"'+',contact='+'"'+userData.contact+'"'+',CNIC='+'"'+userData.cnic+'"'+',dp='+'"'+userData.dp+'"'  +'where id='+userData.id+''
connection.query(querry, function (error, results, fields) {
          if (error) throw error;
            console.log(querry)
            res.end();
        });
}
})
})
users.get('/mytours', function (req, res) {
  var connection=con.getConnection();
  id=global.user
connection.query('SELECT trips.id,trips.departure_city,trips.departure_date,trips.arrival_city,trips.details,trips.return_date,trips.cost,trips.touroperator_id,trips.pic,trips.days,trips.posted,trips.time,users.first_name,users.first_name,users.last_name,users.email,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews FROM trips inner join users on trips.touroperator_id=users.id where touroperator_id='+id, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
    res.end();
});
       });
       users.get('/myservices', function (req, res) {
        var connection=con.getConnection();
        id=global.user
      connection.query('SELECT rentalservices.id,rentalservices.title,rentalservices.location,rentalservices.details,rentalservices.price,rentalservices.details,rentalservices.touroperator_id,rentalservices.pic,rentalservices.pic,rentalservices.pic1,rentalservices.pic2,rentalservices.pic3,rentalservices.pic4,rentalservices.posted,rentalservices.time,users.first_name,users.first_name,users.last_name,users.email,users.contact,users.gender,users.rating,users.created,users.dp,users.total_tours,users.total_services,users.total_reviews FROM rentalservices inner join users on rentalservices.touroperator_id=users.id where touroperator_id='+id, function (error, results, fields) {
          if (error) throw error;
          res.json(results)
          res.end();
      });
             });

             users.get('/myreviews', function (req, res) {
              var connection=con.getConnection();
              id=global.user
            connection.query('SELECT users.first_name,dp,users.last_name,ratings.review_id,ratings.review,ratings.rating,ratings.posted,ratings.title,ratings.post_time,ratings.time  FROM ratings inner join users on ratings.sender_id=users.id where reciever_id='+id, function (error, results, fields) {
                if (error) throw error;
                res.json(results)
                res.end();
            });
                   });
                   users.get('/sentreviews', function (req, res) {
                    var connection=con.getConnection();
                    id=global.user
                  connection.query('SELECT users.first_name,users.last_name,dp,ratings.review_id,ratings.review,ratings.rating,ratings.title,ratings.post_time,ratings.posted,ratings.time  FROM ratings inner join users on ratings.reciever_id=users.id where sender_id='+id, function (error, results, fields) {
                      if (error) throw error;
                      res.json(results)
                      res.end();
                  });
                         });
            
                         users.get('/userlist', function (req, res) {
                          var connection=con.getConnection();
                          id=global.user
                        connection.query('SELECT * from users where email not in("road2pakistan@support.com")', function (error, results, fields) {
                            if (error) throw error;
                            res.json(results)
                            res.end();
                        });
                               });

                               users.post('/admindelete', function (req, res) {
                                var connection=con.getConnection();
                                id=req.body.id
                              connection.query('Delete FROM users where id='+id, function (error, results, fields) {
                                  if (error) throw error;
                                  res.json(results)
                                  res.end();
                                  console.log('del'+req.body.id)
                              });
                            })
                            users.post('/getopid', (req,res) =>  {
                              global.operator=req.body.od
                              
                              
                              console.log('user id from details'+global.operator)
                              res.end();
                              })
                              users.get('/usertours', function (req, res) {
                                var connection=con.getConnection();
                                od=global.operator
                              connection.query('SELECT * FROM trips inner join users on trips.touroperator_id=users.id where touroperator_id='+od, function (error, results, fields) {
                                  if (error) throw error;
                                  res.json(results)
                                  
                              });
                                     });
                                     users.get('/userservices', function (req, res) {
                                      var connection=con.getConnection();
                                      od=global.operator
                                    connection.query('SELECT * FROM rentalservices inner join users on rentalservices.touroperator_id=users.id where touroperator_id='+od, function (error, results, fields) {
                                        if (error) throw error;
                                        res.json(results)
                                        res.end();
                                    });
                                           });
                                           users.get('/userreviews', function (req, res) {
                                            var connection=con.getConnection();
                                            od=global.operator
                                          connection.query('SELECT * FROM ratings inner join users on ratings.sender_id=users.id where reciever_id='+od, function (error, results, fields) {
                                              if (error) throw error;
                                              res.json(results)
                                              res.end();
                                          });
                                                 });
                                                 users.get('/usercount', function (req, res) {
                                                  var connection=con.getConnection();
                                                  id=global.user
                                                connection.query('SELECT count(id) as totalusers from users where email not in("road2pakistan@support.com")', function (error, results, fields) {
                                                    if (error) throw error;
                                                    res.json(results)
                                                    res.end();
                                                });
                                                
                                                       });


                        users.post('/verify', function (req, res) {
                          var connection=con.getConnection()
                            connection.query('UPDATE users SET status = ( CASE WHEN status=""	THEN "verified"	ELSE ""	END) WHERE id ='+req.body.id, function (error, results, fields) {
                                if (error) throw error;
                              res.json(results)
                                   res.end();
                                    });
                                  });
                                          
module.exports = users
