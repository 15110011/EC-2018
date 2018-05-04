// var express = require('express');
// var router = express.Router();
// var User = require('../models/Users').User
// /* GET users listing. */
// router.get('/', (req, res) => {
//   res.render('users', { title: 'Home' })
// });
// // router.get('/', function(req, res, next) {
// //   res.redirect('/')
// // });
// router.post('/signup', (req, res) =>{
//   if (req.body.username &&
//     req.body.password &&
//     req.body.passwordConf) {
//     var userData = {
//       username: req.body.username,
//       password: req.body.password,
//       passwordConf: req.body.passwordConf,
//     }
//     //use schema.create to insert data into the db
//     User.create({username:userData.username,password:userData.password,passwordConf:userData.passwordConf}).
//     then(user=>{
//       console.log(user)
//       res.redirect('/users')
//     }).catch(err=>console.error(err))
//   }
// });

// // router.post('/login', function (req, res) {
// //   if (req.body.username &&
// //     req.body.password)
// //   // Users.findOne({'username' : username}, (err, user) => {
// //   //   if (err) return console.log(err)
// //   //   user.comparePassword(password, function(err, isMatch) {
// //   //     if (err) return console.log(err)
// //   //     if (isMatch) {
// //   //       req.session.user = user;
// //   //       console.log(req.session.user)
// //   //       res.redirect('/users')
// //   //     } else res.render('login',{ title: 'Login','error':'Mật khẩu không chính xác' })
// //   //   })
// //   // })
// //   res.render('users', { title: 'Home' })
// // })
// module.exports = router;
