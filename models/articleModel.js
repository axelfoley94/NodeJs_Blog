const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    markdown:{ 
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    }
})

articleSchema.post('validate',async function(next){

    if(this.title){
        this.slug = slugify(this.title,{lower:true, strict: true});
    }
    next();
})

const Article = mongoose.model('Article',articleSchema)
module.exports = Article;