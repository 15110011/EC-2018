const Sequelize = require('sequelize')
const sequelize = new Sequelize('ecbank', 'root', '1234', { 
  host: 'localhost',
  dialect: 'mysql',

  // To create a pool of connections
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
  
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully!!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  module.exports  = {
    connection : sequelize
  }