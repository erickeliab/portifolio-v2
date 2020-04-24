var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({

    
    id :{
        type : String,
        required : true,
    },
        sendersname :{
            type : String,
            required : true,
        },
        lastname : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
        },
        phone : {
            type : String,
            required : true,
        },
        message : {
            type : String,
            required : true,
        },
    
      
});

let Message = module.exports = mongoose.model('Message', MessageSchema , 'messages');