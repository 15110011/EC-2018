var express = require('express');
var router = express.Router();
var User = require('../models/Users')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ngân hàng Timo' });
});
router.post('/signup', (req, res) =>{
 
if (req.body.username &&
  req.body.password &&
  req.body.passwordConf) {
  var userData = {
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }
  console.log('okok')
  //use schema.create to insert data into the db
  User.create({username:userData.username,password:userData.password,passwordConf:userData.passwordConf}).
  then(user=>{
    console.log(user)
    res.redirect('/users')
  }).catch(err=>console.error(err))
}
});
module.exports = router;
