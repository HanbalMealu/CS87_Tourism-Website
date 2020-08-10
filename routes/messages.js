const msg = require('../models/message')
const express = require('express')
const msgs = express.Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')

const con = require("../database/db");
let rec_id;
global.id;
msgs.post('/register', (req,res) => {
  
msgs.use(cors())
let e='"'+req.body.email+'"'
process.env.SECRET_KEY = 'secret'
var connection=con.getConnection();
let querry='select id from  users where email = '+ e
connection.query(querry, function (error, results, fields) {
  
  let result=JSON.stringify(results)
 
   rec_id=parseInt(result.split(':').pop().split('}')[0])

const {message,sender_id}  = req.body
const reciever_id=rec_id
const msgData ={
    message,
    sender_id,
    reciever_id,
  
  
}
if(result!='[]'){
  if (reciever_id!=sender_id){
console.log("body in uploads that came from react", msgData)


   
          msg.create(msgData)
            .then(message => {
            res.send('message sent!' )
            res.end();
            })
            .catch(err => {
              res.send('error: ' + err)
              res.end();
            })
          }
          else{console.log("sender and reciever cant be same")}
          
        }
          else
          console.log("recepient does not exist")
          })
        
        })


        msgs.post('/getid', (req,res) =>  {
          global.id=req.body.id
          console.log(global.id)
          res.end();
          })
          msgs.get('/inbox',(req,res)=>{
            e=global.id
            querry='select  first_name,last_name,email,message,messages.created,time from messages inner join users on messages.sender_id=users.id  where messages.reciever_id= ' +e+' order by messages.created desc'
            var connection=con.getConnection();
            console.log(global.id,querry)
            connection.query(querry, function (error, results, fields) {
              res.json(results)
              res.end();
            });
            });
            msgs.get('/sent',(req,res)=>{
              e=global.id
              querry='select  first_name,last_name,email,message,messages.created,time from messages inner join users on messages.reciever_id=users.id  where messages.sender_id= ' +e+' order by messages.created desc'
              var connection=con.getConnection();
              connection.query(querry, function (error, results, fields) {
                res.json(results)
                res.end();
              });
              });

          
        
          module.exports=msgs 