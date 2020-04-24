var mongoose = require('mongoose');

var ProjectSchema = mongoose.Schema({

    projectname : {
        type : String,
        required : true
    
    },
    tools : {
        type : Array,
        required : true
    },
    completed : {
        type : Number,
        required : true
    },
    id : {
        type : Number,
        required : true
    },
    budget : {
        type : String,
        required : false
    },
    deadline : {
        type : Date,
        required : false
    },
    initialdate : {
        type : Date,
        required : false
    },
    description : {
        type : String,
        required : true
    },
    screenshorts : {
        type : Array,
        required : true
    },
    Links : [String],
      
});

let Project = module.exports = mongoose.model('Project', ProjectSchema , 'projects');