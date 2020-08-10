const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'forum_post',
  {
    post_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    query:{
        type: Sequelize.TEXT
    },
    description:{
      type: Sequelize.TEXT
  },
    post_user_id:{
        type: Sequelize.INTEGER
    },
    post_posted: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  } ,
  post_time: {
    type: Sequelize.TIME,
    defaultValue: Sequelize.NOW
  } 
 
},
{
    timestamps: false
}
)