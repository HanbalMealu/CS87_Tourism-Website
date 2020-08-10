const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'rating',
  {
      
   review_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      review:{
        type:Sequelize.STRING,
      },
      rating:{
        type: Sequelize.INTEGER
    },
    reciever_id:{
      type: Sequelize.INTEGER
  },
      sender_id:{
          type: Sequelize.INTEGER
      },
      title:{
        type:Sequelize.STRING,
      },      
      post_time:{
        type: Sequelize.DATE
      },
      posted: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
     },
      {
          timestamps: false
      }
      )