var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/', (req, res, next) => {
  res.render('users', { title: 'Chuyển Tiền' })
});
module.exports = router;
