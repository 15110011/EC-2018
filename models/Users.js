var sequelize = require('./db').connection
var Sequelize = require('sequelize')
    // Schema = sequelize.Schema;
var bcrypt = require('bcrypt');

var User = sequelize.define('user',{
    username: {type: Sequelize.STRING, allowNull: false, unique : true},
    password: {type: Sequelize.STRING,allowNull: false},
    passwordConf: {type: Sequelize.STRING, allowNull: false}
});
User.sync()

//Mã hóa mật khẩu
User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            user.passwordConf = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});
module.exports = User