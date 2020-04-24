let mongoose = require('mongoose');

let ServiceSchema = mongoose.Schema({

    id : {
        type : String,
        required : true
    },
        s_name : {
            type : String,
            required : true
        },
        imgpath : {
            type : String,
            required : false
        },
        head : {
            type : String,
            required : true
        },
        bodytext : {
            type : String,
            required : true
        },
        tools :{
            type : Array,
        required : false
        }
    

});

let Service = module.exports = mongoose.model('Sevice',ServiceSchema , 'services');