const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');

//importing the model
let Cv = require('../../Models/Cv');
mongoose.set('useFindAndModify', false);
// mongoose.set( 'useUnifiedTopology', true );


router.get('/', (req,res) => {
    //Querying through model

    Cv.find({}, (err,all) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
       
        res.json(all);
    }
});
    
  
});

router.get('/:id', (req,res) => {

    Cv.findOne({'_id' : req.params.id}, (err,cv) => {
        if (err) throw err;

        if (cv) {
            res.json(cv);
        }

    });
});


router.post('/', (req,res) => {

    var newcv = new Cv(req.body);

    newcv.save( function(err,good){
        if (err) throw err;

        if(good){

            res.send('the new cv was added successfull');
        }
    });
});

router.put('/:id', (req,res) => {

    var updatedcv = req.body;

    Cv.findOneAndUpdate({'_id' : req.params.id}, updatedcv, {upsert : true}, (err,cv) => {
        if (err) throw err;

        if (cv) {
            res.send('successfully updated');
        }

    });
});


router.delete('/:id', (req,res) => {

   

    Cv.findOneAndDelete({'_id' : req.params.id}, function(err,del){
        if (err) throw err;

        if (del) 
        {
            res.send('successfull deleted the cv');
        }
    });
});

module.exports = router;
