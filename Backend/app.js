/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


/*
DEPENDENCIES FOR LOWDB
*/
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync")


/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// import the posts' router
const postsRouter = require("./routes/posts")



/*
CORS Security for the clients website to disable same-origin-policy for only this website
*/
// import of the security middleware
const { setCors } = require("./middleware/security")

/** INIT */
const app = express();

/** LOGGING */
app.use(logger('dev'));


/**
 *  SET UP THE LOWDB DATABASE
 */
//initialize the adapter to mock db file
const adapter = new FileSync("data/db.json");
// initialize mock db using lowdb
const db = low(adapter);
// add default entries to the database
db.defaults ({
    posts: [],
    users: []
}).write();

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SET CORS TO OMIT SECURITY ERRORS
app.use(setCors);

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));


app.use(function clientErrorHandler(err, req, res, next) {
    if (err.status == 400) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
})


/*
ERROR HANDLING
*/
app.use((err, req, res, next) => {
    // respond to the requestor with the error message
    // set response status to 500
    res.status(500).send (
        {
            error:  {
                message: err.message
            }
        })
})


/** ROUTES */
app.use('/', indexRouter);
app.use('/users', usersRouter);
// router path: "/posts"
app.use('/posts', postsRouter);


/** EXPORT PATH */
module.exports = app;
