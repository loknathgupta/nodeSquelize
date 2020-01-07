const Sequelize = require('sequelize');
const fs = require('fs');
var path      = require('path');
const UserModel = require('./user')

// Option 1: Passing parameters separately
const sequelize = new Sequelize('sequelizeTest', 'root', 'pass@123', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

// Option 2: Passing a connection URI
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

//INITIALIZING ALL MODELS*************************
let db = {}
fs.readdirSync(__dirname)
.filter(file => {
  return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js') && file !== path.basename(__filename);
})
.forEach(file => {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});


// sequelize.sync({ force: true }) //true to drop and recreate the tables
// .then(() => {
//   console.log(`Database & tables created!`)
// });
 
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//console.log(db);
// db.comments.sync()
// .then(data => console.log(data))
// .catch(err => console.log(err));

module.exports = db;