const Article = require('../models/articleModel')

exports.findAllArticles =  async (req,res) => {
    const articles = await Article.find()
    res.render('articles/index',{articles : articles});
}

exports.newPage = (req,res) => {
    const article = new Article();
    res.render('articles/new',{article:article})
}

exports.newArticle = async (req,res) => {
    try{
        const article = await Article.create(
            req.body
            // {
            // title: req.body.title,
            // description: req.body.description,
            // markdown: req.body.markdown   
            // }
        )

        res.redirect(`/v1/articles/${article.slug}`);
        //res.redirect(`/v1/articles/`);

    }catch(e){
        console.log(e);
        //res.render('articles/new');
    }   
}