const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
require('./passport.js')(passport);
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const noteRouter = require('./routes/note');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');


// Initiate app 
const app = express();

// express session
app.use(session(
  {
    secret: 'xqvVLGSYIFZvCBJO',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }
));

// Pssport Middleware
app.use(passport.initialize());
app.use(passport.session());

//var corsOptions = {
//  origin: "http://localhost:8081"
//};
//app.use(cors(corsOptions));

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


/**
 * define route handlers
 */


app.use('/user', userRouter);
app.use('/api/note', noteRouter);
app.use('/auth', authRouter);
//app.use('/user', userRouter);
//app.use('/api/fail', (req, res) => {
//  res.json({ message: "ummm /api/fail" });
//});


// simple route
app.get('/test', (req, res) => {
  console.log('here we are in /test!!!');
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
  //res.json({ message: "Welcome to b.a.n.a.n.a. (server.js)" });
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send(`404 - This is not the page you're looking for...`));


/**
 * express global error handler
 */
 app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});