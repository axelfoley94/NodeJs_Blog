const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const methodOverride = require('method-override');

const articleRouter = require('./routes/articlesRoute')

mongoose.connect(process.env.DATABASE_SERVER,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'));


app.set('view engine','ejs');
// app.use((req,res,next) => {
//     console.log("mindig lefut");
//     next();
// });
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false})) //elérjük vele az input mezőket req.body.title igy hivatkozva

app.use('/v1/articles/',articleRouter);

app.listen(process.env.PORT, () => {
    console.log(`App is runnong on ${process.env.PORT} ...`);
})