let mangoose = require('mongoose');

let Schema = mangoose.Schema;

articleSchema = new Schema({

   
    name : {
       type: String,
       required: true
    },
    body : {
        type: String,
        required: true
    },
    published : {
        type: Boolean,
        required: true
    }



});
articleSchema.set('collection', 'Article');

let Article = module.exports = mangoose.model('Article', articleSchema);