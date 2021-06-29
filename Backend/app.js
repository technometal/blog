/** EXTERNAL DEPENDENCIES */
const { body, validationResult } = require('express-validator');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// import mongoose library
const mongoose = require('mongoose');


/*
DEPENDENCIES FOR LOWDB
*/
//const low = require("lowdb");
//const FileSync = require("lowdb/adapters/FileSync")


/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// import the posts' router
const postsRouter = require("./routes/posts")
const User = require('./models/User');
const userValidationRules = require('./lib/validation/userRules')

// IMPORT THE CONFIG FILE
const config = require("./config/configs");



/*
CORS Security for the clients website to disable same-origin-policy for only this website
*/
// import of the security middleware
const { setCors } = require("./middleware/security")
// import of the validator middleware
const {validateInputs} = require('./middleware/validator')
const postValidationRules = require('./lib/validation/postRules')


/** INIT */
const app = express();

/** LOGGING */
app.use(logger('dev'));


/**
 *  SET UP THE LOWDB DATABASE
 */
//initialize the adapter to mock db file
//const adapter = new FileSync("data/db.json");
// initialize mock db using lowdb
//const dbMock = low(adapter);
// add default entries to the database
// dbMock.defaults ({
//     posts: [],
//     users: []
// }).write();

/**SETTING UP MONGODB CONNECTION */
// mongodb+srv://Hertiberto:<password>@cluster0.rnomd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(config.db, 
{
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true
});


// CONNECT
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log("successfully connected to the database");
});


/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SET CORS TO OMIT SECURITY ERRORS
app.use(setCors);

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));


app.use(function clientErrorHandler(err, req, res, next) {
    if (err.status == 400) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
})


/** ROUTES */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/users',
  body('email').isEmail(), 
  body('firstName').isString(),
  body('lastName').isString(),
  /*TODO -> firstName, lastName, password should be a mimimum of 8 characters*/
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // THERE IS NO Mongo creation happening!
    res.json({ message: "it create a user" });
  });
// router path: "/posts"
app.use('/posts', postsRouter);


/*
ERROR HANDLING
*/
app.use((err, req, res, next) => {
  console.log(err);
    // respond to the requestor with the error message
    // set response status to 500
    res.status(500).send (
        {
            error:  {
                message: err.message
            }
        })
})


/** EXPORT PATH */
module.exports = app;
