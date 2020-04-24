const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');

//importing the model
let Message = require('../../Models/Message');
mongoose.set('useFindAndModify', false);
// mongoose.set( 'useUnifiedTopology', true );


//GETTING ALL THE MESSAGES
router.get('/', (req,res) => {
    //Querying through model

    Message.find({}, (err,messages) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
       console.log(messages);
        res.render('auth/Messages/allmessages',{messages});
    }
})
    
  
});


//getting the form to addte message
router.get('/add', (req,res) => {
    //Querying through model

    Message.find({}, (err,skills) => {
    if (err) {
       
        res.status(404,{msg: 'The message were not found'});
    }else {
       
        res.render('auth/Message/addskill');
    }
   
})
    
  
});

// GETTING A SPECIFIC MESSAGE
router.get('/:id', (req,res) => {

    Message.find({'id' : req.params.id}, (err,messages) => {
        if (err) {
            res.status(404);
        }else {
            let message = messages[0];
            res.render('auth/Messages/singlemessage',{message});
            
        }
    });
});

// CREATING NEW MESSAGE
router.post('/', function(req,res){
    let msgbody = new Message(req.body);

    msgbody.save( function(err,rei){
        if (err) throw err;
        if (rei) {
            res.send('the message was successfull created');
        } 
    });

});

//UPDATING MESSAGE
router.put('/:id', (req,res) => {

    let newmsg = req.body;

    Message.findOneAndUpdate({'id' : req.params.id}, newmsg, {upsert: true},(err,message) => {
        if (err) {
            throw err;
        }else {
             res.send("you updated successful");
        }
    });
});


//DELETING MESSAGE
router.delete('/:id', (req,res) => {

    

    Message.findOneAndDelete({'id' : req.params.id}, (err,message) => {
        if (err) {
            throw err;
        }else {
             res.json('deleted successful');
        }
    });
});

module.exports = router;
