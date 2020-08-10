const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'trip',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    departure_city:{
        type: Sequelize.STRING
    },
    departure_date:{
        type: Sequelize.DATE
    },
    arrival_city:{
        type: Sequelize.STRING
    },
    return_date:{
        type: Sequelize.DATE
    },
    cost:{
      type: Sequelize.INTEGER
  },
    details:{
      type: Sequelize.STRING
  },
  touroperator_id:{
    type: Sequelize.INTEGER
},
pic:{
  type:Sequelize.STRING
},
days:{
  type: Sequelize.STRING
},
  },
{
    timestamps: false
})