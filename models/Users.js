var sequelize = require('./db').connection
var Sequelize = require('sequelize')
    // Schema = sequelize.Schema;
var bcrypt = require('bcrypt');

var User = sequelize.define('users',{
    name: {type: Sequelize.STRING, allowNull:false},
    phonenumber: {type: Sequelize.BIGINT, allowNull:false},
    username: {type: Sequelize.STRING, allowNull: false, unique : true},
    password: {type: Sequelize.STRING,allowNull: false},
    passwordConf: {type: Sequelize.STRING, allowNull: false},
    money: {type: Sequelize.STRING, allowNull:true}
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