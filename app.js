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

app.use('/v1/articles/',articleRouter);

module.exports = app;