var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local'), Strategy;
var bcrypt = require('bcrypt');


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var dbRouter = require('./models/db');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// BodyParser Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/users', usersRouter);
// app.use('/signup', signupRouter);
// app.use('/login', loginRouter);
// app.use('/trans', transRouter);
// app.use('/save', saveRouter);

app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))

// Express Session
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// Connect Flash
app.use(flash());

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.loi = req.flash('error');
  res.locals.thanhcong = req.flash('success');
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use('/', indexRouter);
// app.use(function(req, res, next) {
//   next(createError(404));
// });

module.exports = app;
