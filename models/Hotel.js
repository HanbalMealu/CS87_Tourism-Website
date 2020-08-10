const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'hotel',
  {
    hotel_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type:Sequelize.STRING,
    },
    city:{
        type: Sequelize.STRING
    },
    price:{
        type: Sequelize.INTEGER
    },
    details:{
        type: Sequelize.STRING
    },
    contact:{
        type:Sequelize.TEXT
      },
    free_parking:{
        type:Sequelize.TEXT
      },
      internet:{
        type:Sequelize.TEXT
      }, 
      security:{
        type:Sequelize.TEXT
      },
      pool:{
        type:Sequelize.TEXT
      },
      children_activities:{
        type:Sequelize.TEXT
      }, 
      air_conditioning:{
        type:Sequelize.TEXT
      }, 
      room_service:{
        type:Sequelize.TEXT
      },
      fridge:{
        type:Sequelize.TEXT
      }, free_parking:{
        type:Sequelize.TEXT
      },
      tv:{
        type:Sequelize.TEXT
      },
      suites:{
        type:Sequelize.TEXT
      },
      single_bed:{
        type:Sequelize.TEXT
      },
      double_bed:{
        type:Sequelize.TEXT
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
},
{
    timestamps: false
}
)