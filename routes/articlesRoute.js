const express = require('express');
const { findById } = require('../models/articleModel');
const router = express.Router();
const {newPage,newArticle,findAllArticles} = require('../controller/articleController');
const Article = require('../models/articleModel');



const ee = (req,res,next,val) => {
    console.log(req)
    console.log("middleware");
    next()
}

router.route('/new')
    .get(newPage)
    .post(newArticle)

router.get('/', findAllArticles);

router.post('/search_results',async (req,res) => {
    
    const articles = await Article.find({title: { $regex: '.*' + req.body.search + '.*' }});

    res.render('articles/index',{articles : articles});
})

// router.param("id", (req, res, next, id) => {
//     console.log("This function will be called first");
//     next();
// });

router.route('/edit/:id')
    .get(async (req,res) => {
        const article = await Article.findById(req.params.id)
        
        res.render('articles/edit',{article : article});
    })
    .patch(async (req,res) => {
        let article = {
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        }

        Article.findByIdAndUpdate(req.params.id,article,(err,doc)=> res.redirect('/v1/articles'));
       
    })

router.route('/:slug')
    .get( async (req,res) => {
        try{
            const article = await Article.findOne({slug: req.params.slug});
            console.log(article);
            if(article == null) res.redirect('/v1/articles');
            res.render('articles/show',{article:article});
        }catch(e){
            console.log(e)
        }
        
    } )

router.delete('/:id', async (req,res) => {
    try{
        await Article.findByIdAndDelete(req.params.id);
        res.redirect("/v1/articles/"); 
    }catch{
        console.log("error")
    }
    
})

module.exports = router;