var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt')
var flash = require('connect-flash')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Ngân hàng Timo' })
});
router.get('/users', (req, res) => {
  res.render('users', {title:'Home'})
});
router.get('/signup', (req, res) =>{
  res.render('signup', {title:'Đăng ký'})
});
router.post('/signup', (req, res) =>{
if (req.body.name &&
  req.body.phonenumber &&
  req.body.username &&
  req.body.password &&
  req.body.passwordConf) {
  var userData = {
    name: req.body.name,
    phonenumber: req.body.phonenumber,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }
  //use schema.create to insert data into the db
  User.create({name:userData.name, phonenumber:userData.phonenumber, username:userData.username, password:userData.password, passwordConf:userData.passwordConf}).
  then(user=>{
    console.log(user)
    res.redirect('/users')
  }).catch(err=>console.error(err))
}

});
router.get('/login',(req, res)=>{
  res.render('login', {title:'Đăng nhập'})
});

passport.serializeUser(function(user, done) {
  console.log("serial")
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  console.log("deserial")
  User.findById(id).then( (user) =>{
    done(null, user);
  }).catch(err=>{
    done(err)
  })
  
});
passport.use(new LocalStrategy({
  usernameField:'username',
  passwordField: 'password',
  passReqToCallback: true
},
  function(req, username, password, done) {
    User.findOne({where: {username: username}}).then(user=>{
      if (!user) { 
        return done(null, false, req.flash('error', 'Sai tên đăng nhập và mật khẩu')); }
      bcrypt.compare(password, user.get('password'), function(err, rs){
        if(err) return done(err)
        if(!rs) done(null, false, {message:'Sai tên đăng nhập và mật khẩu'})
        return done(null, user);
      })
      
    }).catch(e=>console.error(e));
  }
));
router.post('/login',   
  passport.authenticate('local', { failureRedirect: '/login' ,successRedirect:'/users'})
);
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});
module.exports = router;
