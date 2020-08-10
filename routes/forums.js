const forum_comment = require('../models/forum_comment')
const express = require('express')
const forums = express.Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const forum_post = require('../models/forum_post')
const con = require("../database/db");
forums.post('/post', (req,res) => {
const {post_user_id,query,description}=req.body
const postData={
    post_user_id,
    query,
    description
}
console.log("body in uploads that came from react", postData)
forum_post.create(postData)
    .then(forum_post => {
        res.json('Query Registered!' )
        res.end()
      })
      .catch(err => {
        res.send('error: ' + err)
        res.end()
      })
    })

    forums.get('/posts', function (req, res) {
        var connection=con.getConnection();
connection.query('select * from forum_posts inner join users on post_user_id=users.id', function (error, results, fields) {
          if (error) throw error;
          res.json(results)
          res.end();
          
      });
             });
             forums.post('/comm_id', function (req, res) {
                global.post_id=req.body.post_id
                  console.log('from post details:'+global.post_id)
              });


        forums.get('/comments', function (req, res) {
                var connection=con.getConnection();
        connection.query('select * from  forum_comments inner join users on comment_user_id=users.id where post_id='+global.post_id, function (error, results, fields) {
                  if (error) throw error;
                  res.json(results)
                  res.end();
                  
              });
                     });

             forums.post('/comment', (req,res) => {
                const {comment_user_id,comment,post_id}=req.body
                const commentData={
                    comment_user_id,
                    comment,
                    post_id
                }
                console.log("body in uploads that came from react", commentData)
                forum_comment.create(commentData)
                    .then(forum_comment => {
                        res.json('comment Registered!' )
                        res.end()
                      })
                      .catch(err => {
                        res.send('error: ' + err)
                        res.end()
                      })
                      
                    }) 
                    forums.post('/comment_count', function (req, res) {
                      var connection=con.getConnection();
              connection.query('update forum_posts set comments_count=(select count(comment_id) from forum_comments where post_id='+global.post_id+') where post_id='+global.post_id, function (error, results, fields) {
                        if (error) throw error;
                        res.json(results)
                        res.end();
                    });
                           });
module.exports=forums