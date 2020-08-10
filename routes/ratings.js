const ratingss = require('../models/rating')
const User = require('../models/User')
const express = require('express')
const ratings = express.Router()
const multer =require('multer')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const con = require("../database/db");
global.r_id;
ratings.post('/register', (req,res) => {
  
  ratings.use(cors())
 
User.findOne({
where: {

email: req.body.email
}
})
.then(user=>{
if(user){

  let e='"'+req.body.email+'"'
  process.env.SECRET_KEY = 'secret'
  var connection=con.getConnection();
  let querry='select id from  users where email = '+ e
  connection.query(querry, function (error, results, fields) {
    
    let result=JSON.stringify(results)
   
     rec_id=parseInt(result.split(':').pop().split('}')[0])
     global.r_id=rec_id
     console.log('this is global_id'+global.r_id)
     ratingss.findOne({
      where:{
        sender_id:req.body.sender_id,
        reciever_id:rec_id,
        title:req.body.title,
        post_time:req.body.post_time
      }
    })
    .then(rating=>{
      if(!rating){
        const {review,sender_id,rating,title,post_time}  = req.body
        const reciever_id=rec_id
        
        const ratingData ={
            review,
            rating,
            sender_id,
            reciever_id,
            title,
            post_time
            
          
          
        }
        console.log("body in uploads that came from react", ratingData)
  
  if(ratingData.sender_id!=ratingData.reciever_id){
     
        ratingss.create(ratingData)
           .then(rating => {
           res.send('reviews posted!' )
           })
           .catch(err => {
             res.send('error: ' + err)
           })
          }
          else{
          res.json({ error: 'cant rate to own self' })
          console.log('cant rate your own self')
      }
    }
      else  {
        res.json({ error: 'Already rated' })
        console.log('Already rated')
      }
    })
     
 
            })
          }
            else  {
              res.json({ error: 'User does not Exist' })
              console.log('User does not Exist') 
            }
            
})
})

           
            
            
          

////////////////////////////////////////////////////////////////////////
global.average;
ratings.post('/update', (req,res) => {
  ratings.use(cors())
                process.env.SECRET_KEY = 'secret'
                var connection=con.getConnection();
                let querry='update users set rating = (select avg(rating) from  ratings where reciever_id = '+req.body.id+'),total_tours= (select count(trips.id) from trips  where touroperator_id = '+req.body.id+'),total_services = (select count(rentalservices.id) from rentalservices  where touroperator_id = '+req.body.id+'),total_reviews = (select count(ratings.review_id) from ratings  where reciever_id = '+req.body.id+') where id= '+req.body.id
              connection.query(querry, function (error, results, fields) {
                if (error) throw error;  
                res.end();               
})
})
ratings.post('/delete',function(req,res){
  var connection=con.getConnection();
  delete_id=req.body.id
  connection.query('delete from ratings where review_id ='+delete_id,function(error,results,fields){
    if(error) throw error;
    res.json ('Your review has been deleted Successfully')
    res.end();
  })
})
ratings.post('/editreview',function(req,res){
  const storageTarget = multer.diskStorage({
    destination : "uploads",
        filename: (req,file,cb)=>{
            fileName = "a" + Date.now() + file.originalname
            cb(null, fileName)
           fileNames.push(fileName);
            
        }
})
const upload = multer({storage:storageTarget}).array('file')
upload(req,res,async ()=>{
  var connection=con.getConnection();
  edit_id=req.body.id
  edit_review=req.body.review
  edit_rating=req.body.rating
  querry='update ratings  set review="'+edit_review+'",rating='+edit_rating+' where review_id ='+edit_id
 connection.query(querry,function(error,results,fields){
  if(error) throw error;
 res.json ('Your review has been updated Successfully')
 res.end();
  })
  console.log(querry)
})
})


  module.exports=ratings