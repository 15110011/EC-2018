var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login', { title: 'Đăng nhập' })
});
module.exports = router;