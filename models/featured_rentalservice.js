const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'featured_rentalservice',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  until:{
    type: Sequelize.DATE
  }
},
{
    timestamps: false
}
)