const express = require('express');
const router = express.Router();
const path = require('path');
let mongoose = require('mongoose');
const methodOverride = require('method-override');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
  })
  
  var upload = multer({ storage: storage });


const { ensureAuthenticated } = require('../../config/auth');

//importing the model
let Profile = require('../../Models/Profile');
mongoose.set('useFindAndModify', false);
// mongoose.set( 'useUnifiedTopology', true );
router.use(methodOverride('_method'));
router.use(ensureAuthenticated);
//GETTING ALL DATA

router.get('/', (req,res) => {
    //Querying through model

    Profile.find({}, (err,profileA) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
        let profile = profileA[0];

        res.render('auth/Profile/viewprofile',{profile});
    }
});


});

//SINGLE DOC
router.get('/edit', (req,res) => {
    //Querying through model

    Profile.find({}, (err,profileA) => {
        if (err) {
            res.status(404,{msg: 'The services were not found'});
        }else {
            let profile = profileA[0];
            
            res.render('auth/Profile/updateprofile',{profile});
        }
    });


});

router.put('/:s',  upload.single('profileimg'), (req,res) => {
    //Querying through model
    var errors = [];
    var newprof = req.body;

    const { firstname, middlename, lastname, Birthday, Job, Nationality, MaritalStatus, Location, Note, JobTitle, Education, profileimg } = req.body;
    if (firstname && middlename && lastname && Birthday && Job && Nationality && MaritalStatus && Location && Note && JobTitle && Education  ) {


    if (req.file){

        newprof.profileimg =  "images/" + req.file.filename;
    }


    Profile.findOneAndUpdate({}, newprof, {upsert: true},(err,prof) => {
        if (err) {
            throw err;
        }else {
              res.redirect('/profile');
        }
    });

}else{
    errors.push({msg: 'Please fill all the required fields'});
    Profile.find({}, (err,profileA) => {
        if (err) {
            res.status(404,{msg: 'The services were not found'});
        }else {
            let profile = profileA[0];
          
            res.render('auth/Profile/updateprofile',{profile,errors});
        }
    });
}
});
module.exports = router;
