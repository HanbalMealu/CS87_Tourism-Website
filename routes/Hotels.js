const express = require('express')
const hotels = express.Router()

const cors = require('cors')
const multer=require('multer')
const con = require("../database/db");
const hotel= require('../models/Hotel')
hotels.use(cors())
let fileName; 
let fileNames=[];
global.hotellocation='';
global.hotelcost='';
hotels.post('/register', (req, res) => {

    const storageTarget = multer.diskStorage({
      destination : "uploads",
          filename: (req,file,cb)=>{
              fileName = "a" + Date.now() + file.originalname
              cb(null, fileName)
             fileNames.push(fileName);
              
          }
  })
  const upload = multer({storage:storageTarget}).array('file')
  
  process.env.SECRET_KEY = 'secret'
  upload(req,res,async ()=>{
    const {name,city,price,details,contact,free_parking,internet,security,pool,children_activities,air_conditioning,room_service,fridge,tv,suites,single_bed,double_bed}  = req.body
    const hotelData ={
      name,
      city,
      price,
      details,
      contact,
      free_parking,
      internet,
      security,
      pool,
      children_activities,
      air_conditioning,
      room_service,
      fridge,
      tv,
      suites,
      single_bed,
      double_bed,
      pic:fileNames[0],
      pic1:fileNames[1],
      pic2:fileNames[2],
      pic3:fileNames[3],
      pic4:fileNames[4],
      
  
    }
    fileNames=[];
    console.log("body in uploads that came from react", hotelData)
  hotel.create(hotelData)
    .then(hotel => {
      res.json(  'Registered!' )
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
})

hotels.get('/hotellist', function (req, res) {
  var connection=con.getConnection();
connection.query('select * from hotels', function (error, results, fields) {
    if (error) throw error;
    res.json(results)
    res.end();
    
});
       });
       hotels.post('/hoteldelete', function (req, res) {
        var connection=con.getConnection();
      connection.query('delete from hotels where hotel_id='+req.body.hotel_id, function (error, results, fields) {
          if (error) throw error;
          res.json(results)
          res.end();
          
      });
             });
          
             hotels.post('/hoteledit', (req, res) => {

              const storageTarget = multer.diskStorage({
                destination : "uploads",
                    filename: (req,file,cb)=>{
                        fileName = "a" + Date.now() + file.originalname
                        cb(null, fileName)
                       fileNames.push(fileName);
                        
                    }
            })
            const upload = multer({storage:storageTarget}).array('file')
            
            
            
            
           
            process.env.SECRET_KEY = 'secret'
            upload(req,res,async ()=>{
              const {name, city,price,details,contact,hotel_id}  = req.body
              
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
             
            
              const newhotelData ={
                
                name,
                city,
                price,
                details,
                contact,
                pic:fileNames[0],
                pic1:fileNames[1],
                pic2:fileNames[2],
                pic3:fileNames[3],
                pic4:fileNames[4],   
            hotel_id,
              }
              fileNames=[]
              console.log("body in uploads that came from react", newhotelData)
                var connection=con.getConnection();
                querry='update hotels set name="'+newhotelData.name+'",price='+newhotelData.price+',details="'+newhotelData.details+'",city="'+newhotelData.city+'",pic="'+newhotelData.pic+'",pic1="'+newhotelData.pic1+'",pic2="'+newhotelData.pic2+'",pic3="'+newhotelData.pic3+'",pic4="'+newhotelData.pic4+'" where hotel_id = '+newhotelData.hotel_id
               
                connection.query(querry, function (error, results, fields) {
                  if (error) throw error;
                   res.json(results)
               });
            })
            })

            hotels.post('/filter',function(req,res){
              global.hotellocation=req.body.location
              global.hotelcost=req.body.cost
              console.log(global.hotellocation,global.hotelcost)
            })  
            hotels.get('/filteredhotellist', function (req, res) {
              var connection=con.getConnection();
              if(global.hotelcost===''&&global.hotellocation===''){
            connection.query('select * from hotels', function (error, results, fields) {
                if (error) throw error;
                res.json(results)
                res.end();
             });
          }
          else if(global.hotelcost===''&&global.hotellocation!==''){
            connection.query('select * from hotels where city ="'+global.hotellocation+'"', function (error, results, fields) {
                if (error) throw error;
                res.json(results)
                res.end();
             });
          }
          else if(global.hotelcost!==''&&global.hotellocation===''){
            connection.query('select * from hotels where price <='+global.hotelcost, function (error, results, fields) {
                if (error) throw error;
                res.json(results)
                res.end();
             });
          }
          else if(global.hotelcost!==''&&global.hotellocation!==''){
            connection.query('select * from hotels where city ="'+global.hotellocation+'" and price <='+global.hotelcost, function (error, results, fields) {
                if (error) throw error;
                res.json(results)
                res.end();
             });
          }
          })

module.exports=hotels