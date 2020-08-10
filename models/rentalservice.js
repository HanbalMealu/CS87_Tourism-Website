const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'rentalservice',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category:{
      type:Sequelize.STRING,
    },
    title:{
        type: Sequelize.STRING
    },
    location:{
        type: Sequelize.STRING
    },
    details:{
        type: Sequelize.STRING
    },
    price:{
      type:Sequelize.INTEGER
  },
  pic:{
    type:Sequelize.TEXT
  },
  pic1:{
    type:Sequelize.TEXT
  },
  pic2:{
    type:Sequelize.TEXT
  },
  pic3:{
    type:Sequelize.TEXT
  },
  pic4:{
    type:Sequelize.TEXT
  },
  posted: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  } ,
  time: {
    type: Sequelize.TIME,
    defaultValue: Sequelize.NOW
  } ,
  touroperator_id:{
    type: Sequelize.INTEGER
}
},
{
    timestamps: false
}
)