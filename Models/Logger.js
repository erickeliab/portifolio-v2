var mongoose = require('mongoose');

var LoggerSchema = mongoose.Schema({


    date :{
        type : String,

    }


});

let Logger = module.exports = mongoose.model('Logger', LoggerSchema , 'logs');
