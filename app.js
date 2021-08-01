const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const methodOverride = require('method-override');

const articleRouter = require('./routes/articlesRoute')

app.set('view engine','ejs');
// app.use((req,res,next) => {
//     console.log("mindig lefut");
//     next();
// });
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false})) //input field -> with req.body.title

//middleware test
// app.use(function (req, res, next) {
//     console.log('Time:', Date.now())
//     next()
//   })

app.use('/v1/articles/',articleRouter);

//error handling snippet
app.all('*',(req,res,next)=>{
    const err = new Error(`Cant find ${req.originalUrl} on this server`)
    err.status = 'fail'
    err.statusCode = 404
    next(err)
})

//Global Error Handler
app.use((err,req,res,next) =>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})

module.exports = app;