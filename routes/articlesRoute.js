const express = require('express');
const { findById } = require('../models/articleModel');
const router = express.Router();
const Article = require('../models/articleModel')



const ee = (req,res,next,val) => {
    console.log("middleware");
    next()
}

router.route('/new')
    .get( (req,res) => {
        const article = new Article();
        res.render('articles/new',{article:article})
    })
    .post(async (req,res) => {
        try{
            const article = await Article.create({
                title: req.body.title,
                description: req.body.description,
                markdown: req.body.markdown
            })
            res.redirect(`/v1/articles/${article.slug}`);
            
        }catch(e){
            console.log(e);
            res.render('articles/new');
        }
        
    })

router.get('/', async (req,res) => {
    const articles = await Article.find()

    res.render('articles/index',{articles : articles});
},ee);

router.post('/search_results',async (req,res) => {
    
    const articles = await Article.find({title: { $regex: '.*' + req.body.search + '.*' }});

    res.render('articles/index',{articles : articles});
})


router.route('/edit/:id')
    .get(async (req,res) => {
        const article = await Article.findById(req.params.id)
        
        res.render('articles/edit',{article : article});
    })
    .patch(async (req,res) => {
        let article = await Article.findById(req.params.id)
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        try{
            article = await article.save();
            res.redirect('/v1/articles');
        }catch(e){
            console.log(e);
        }
       
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
    //.patch()
router.delete('/:id', async (req,res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/v1/articles/");
})

module.exports = router;