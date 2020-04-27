let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CvSchema = new Schema({

    name : {
       type: String,
        required : true
    },
    Address : { 
       type : String,
       required : true
    },
    Telephone : {
        type : String,
        required : true
    }, 
    Email :  {
        type : String,
        required : true
    }, 
    Birthday :  {
        type : String,
        required : true
    }, 
    Nationality :  {
        type : String,
        required : true
    }, 
    Status :  {
        type : String,
        required : true
    }, 
    path :  {
        type : String,
        required : true
    },
    id :  {
        type : String,
        required : true
    }, 
    Education : [{
        start :  {
            type : String,
            required : true
        }, 
        end :  {
            type : String,
            required : true
        }, 
        INSTITUTION:  {
            type : String,
            required : true
        }, 
        award :  {
            type : String,
            required : true
        }
       
    }],
    Qualifications : [{
        Proficient : []
    } ]

});

let Cv = module.exports = mongoose.model('Cv', CvSchema, 'cv');