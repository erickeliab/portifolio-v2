const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');

//importing the model
let Message = require('../../Models/Message');
mongoose.set('useFindAndModify', false);
// mongoose.set( 'useUnifiedTopology', true );

const { ensureAuthenticated } = require('../../config/auth');

//GETTING ALL THE MESSAGES
router.get('/',ensureAuthenticated, (req,res) => {
    //Querying through model

    Message.find({}, (err,messages) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
        let route = 'All'
        res.render('auth/Messages/allmessages',{messages,route});
    }
})
    
  
});


//GETTING INBOX/NEW MESSAGES
router.get('/inbox/',ensureAuthenticated, (req,res) => {
    //Querying through model

    Message.find({}, (err,message) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
        var messages = [];
        message.forEach(function (mess) {
            if (!mess.read){
                messages.push(mess);
            }
        })
        let route = 'Inbox'
        res.render('auth/Messages/inbox',{messages,route});
    }
})
    
  
});


//GETTING TEMPORARY DELETED  MESSAGES
router.get('/trash/',ensureAuthenticated, (req,res) => {
    //Querying through model

    Message.find({}, (err,message) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
        var messages = [];
        message.forEach(function (mess) {
            if (mess.deleted){
                messages.push(mess);
            }
        })
        let route = 'Trash'
        res.render('auth/Messages/trash',{messages,route});
    }
})
    
  
});


//getting the form to addte message
router.get('/add',ensureAuthenticated, (req,res) => {
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
router.get('/:id',ensureAuthenticated, (req,res) => {

    let newmsg = {};
    newmsg.read = true;

    Message.findOneAndUpdate({'id' : req.params.id}, newmsg, {upsert: true},(err,message) => {
        if (err) {
            throw err;
        }else {
            res.render('auth/Messages/singlemessage',{message});

        }
    });

   
});

// MARK UNREAD MESSAGE
router.get('/unread/:id',ensureAuthenticated, (req,res) => {

    let newmsg = {};
    newmsg.read = false;

    Message.findOneAndUpdate({'id' : req.params.id}, newmsg, {upsert: true},(err,message) => {
        if (err) {
            throw err;
        }else {
             res.redirect('/messages');

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
router.put('/:id',ensureAuthenticated, (req,res) => {

    let newmsg = req.body;

    Message.findOneAndUpdate({'id' : req.params.id}, newmsg, {upsert: true},(err,message) => {
        if (err) {
            throw err;
        }else {
            res.redirect('/messages');
        }
    });
});

// Deleting temporary A SPECIFIC MESSAGE
router.get('/del/:id',ensureAuthenticated, (req,res) => {

    let newmsg = {};
    newmsg.deleted = true;

    Message.findOneAndUpdate({'id' : req.params.id}, newmsg, {upsert: true},(err,message) => {
        if (err) {
            throw err;
        }else {
             res.redirect('/messages');
        }
    });
});


// reciver deleted A SPECIFIC MESSAGE
router.get('/recover/:id',ensureAuthenticated, (req,res) => {

    let newmsg = {};
    newmsg.deleted = false;

    Message.findOneAndUpdate({'id' : req.params.id}, newmsg, {upsert: true},(err,message) => {
        if (err) {
            throw err;
        }else {
            res.redirect('/messages');
        }
    });
});

//DELETING MESSAGE
router.delete('/:id',ensureAuthenticated, (req,res) => {

    

    Message.findOneAndDelete({'id' : req.params.id}, (err,message) => {
        if (err) {
            throw err;
        }else {
             res.json('deleted successful');
        }
    });
});

module.exports = router;
