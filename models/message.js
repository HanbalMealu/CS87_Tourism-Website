const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'message',
  {
      
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      message:{
        type:Sequelize.STRING,
      },
      sender_id:{
          type: Sequelize.INTEGER
      },
      reciever_id:{
          type: Sequelize.INTEGER
      },
      created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
     },
      {
          timestamps: false
      }
      )