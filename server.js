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

var connectionString = 'mongodb://127.0.0.1:27017/wamlocal';

if(process.env.WEB_CONCURRENCY ) {
    connectionString = process.env.MONGODB_URI;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

// require("./test/app.js")(app);
require("./assignment/app")(app);
require("./project/app")(app);

var port = process.env.PORT || 3000;

app.listen(port);
