const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const validator = require('validator')
 
const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
       //validate: [validator.isAlpha,'must be only contains characters']
    },
    description:{
        type: String,
        required: true
    },
    markdown:{ 
        type: String,
        required: true,
        //maxlength: [40, 'must be between 10 and 40 character'],
        //minlength: [10, 'must be between 10 and 40 character']
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    slug:{
        type: String,
        // unique: true
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

articleSchema.virtual('descriptionLength').get(function(){
    return this.description.length;
})
//document middleware this refers to the document
articleSchema.pre('save',function(){

    if(this.title){
        this.slug = slugify(this.title,{lower:true, strict: true});
    }
})

articleSchema.pre('aggregate',function(){
    console.log(this)
})

//query middleware functions, this refers to the query
articleSchema.pre('find',function(){
    let d = Date.now()
    this.date = new Date(d).toString()
    
    // console.log(this.date + " find query at this time")
})


const Article = mongoose.model('Article',articleSchema)
module.exports = Article;