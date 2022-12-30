const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();

//#region Middleware
if(process.env.NODE_ENV === 'development'){
    //Third-Party Middleware
    app.use(morgan('dev'));

}

//Adding middleware from express 
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Adding custom middleware
//Depending when we call this function will determine its execution.
//Each route handler ends the execution stack so if this is after them it will not be called!
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
})

//Adding timestamp to middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})
//#endregion Middleware

//#region Routes

/* 
* We recieve the request from one of these routes, we then look into the corresponding router from 
* here and look up the correct route based on the request URL.
* These are kept in the Routes folder
*/

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//exports this file so we can now retrieve it in the serve.js file
module.exports = app;