var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var app = express();
var secret = "This is a secret for local deployment";
if(process.env.WEB_CONCURRENCY ) {
    secret = process.env.SESSION_SECRET;
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: secret,
    saveUninitialized: true,
    resave: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

// require("./test/app.js")(app);
require("./assignment/app")(app);

var port = process.env.PORT || 3000;

app.listen(port);
