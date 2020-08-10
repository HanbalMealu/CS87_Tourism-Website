const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'reported_service',
  {
    report_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    id:{
      type:Sequelize.INTEGER
    },
  reporter_email:{
    type: Sequelize.TEXT
  },
  reason:{
    type:Sequelize.TEXT
  }
  
},
{
    timestamps: false
}
)