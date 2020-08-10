const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'forum_comment',
  {
    comment_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment:{
        type: Sequelize.TEXT
    },
    comment_user_id:{
        type: Sequelize.INTEGER
    },
    post_id:{
      type: Sequelize.INTEGER
    },
    comment_posted: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  } ,
  comment_time: {
    type: Sequelize.TIME,
    defaultValue: Sequelize.NOW
  } 
 
},
{
    timestamps: false
}
)