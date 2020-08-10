const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('nodejs_login1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  logging:false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

var mysql = require('mysql');
   
function getConnection() {
  var con = mysql.createConnection( {
    server: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_login1',
      
      });
    return con;
    }

module.exports.getConnection=getConnection;
