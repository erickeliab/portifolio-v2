const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');


const app = express();

// Passport Config
require('./config/passport')(passport);

// // DB Config
// const db = require('./config/keys').mongoURI;

// // Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/MyFullstack';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//SETING THE EJS AS OUR VIEW ENGINE
app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/messages',express.static(path.join(__dirname, 'public')));
app.use('/servicez',express.static(path.join(__dirname, 'public')));
app.use('/servicez/edit',express.static(path.join(__dirname, 'public')));
app.use('/servicez/delete',express.static(path.join(__dirname, 'public')));
app.use('/profile',express.static(path.join(__dirname, 'public')));
app.use('/skills',express.static(path.join(__dirname, 'public')));
app.use('/skills/edit',express.static(path.join(__dirname, 'public')));
app.use('/cv',express.static(path.join(__dirname, 'public')));
app.use('/projects',express.static(path.join(__dirname, 'public')));
app.use('/projects/edit',express.static(path.join(__dirname, 'public')));
app.use('/users',express.static(path.join(__dirname, 'public')));

// Routes

app.use('/users', require('./Routes/users.js'));

//ROUTING
//index routing

app.use('/', require('./Routes/indexroutes')); 
// app.use('/dashboard', require('./Routes/api/dashboardController')); 
app.use('/skills', require('./Routes/api/skillsController')); 
//API ROUTES
app.use('/servicez', require('./Routes/api/servicesController')); 
app.use('/cv', require('./Routes/api/cvController')); 
app.use('/projects', require('./Routes/api/projectsController')); 
app.use('/messages', require('./Routes/api/messagesController')); 
app.use('/profile', require('./Routes/api/profileController')); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
