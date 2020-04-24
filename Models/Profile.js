var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema({


    firstname : {
      type :  String,
      required : true

    }, 
    middlename :   {
        type :  String,
        required : true
  
      }, 
    lastname :   {
        type :  String,
        required : true
  
      }, 
    Bithday : {
        type :  Date,
        required : true
  
      }, 
    Job :  {
        type :  Array,
        required : true
  
      }, 
    Nationality :  {
        type :  String,
        required : true
  
      }, 
    MaritalStatus :   {
        type :  String,
        required : true
  
      }, 
    Hobbies :  {
        type :  Array,
        required : true
  
      }, 

});

var Profile = module.exports = mongoose.model('Profile', ProfileSchema, 'profile');