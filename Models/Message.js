var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({


    id :{
        type : String,

    },
        sendersname :{
            type : String,
            required : true,
        },
        lastname : {
            type : String,

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
        read : {
            type : Boolean,

        },
        deleted : {
            type : Boolean
        }


});

let Message = module.exports = mongoose.model('Message', MessageSchema , 'messages');
