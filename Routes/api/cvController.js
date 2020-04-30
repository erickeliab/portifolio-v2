const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
const methodOverride = require('method-override');
const multer = require('multer');

const { ensureAuthenticated } = require('../../config/auth');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/cv/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.pdf') //Appending .jpg
    }
  })
  
  var upload = multer({ storage: storage });

//importing the model
let Cv = require('../../Models/Cv');
mongoose.set('useFindAndModify', false);
router.use(methodOverride('_method'));
// mongoose.set( 'useUnifiedTopology', true );
router.use(ensureAuthenticated);

router.get('/', (req,res) => {
    //Querying through model

    Cv.find({}, (err,all) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
       pdf = all[0];
        res.render('auth/CV/viewCV',{pdf});
    }
});
    
  
});

router.get('/:id',  (req,res) => {

    Cv.findOne({'id' : req.params.id}, (err,cv) => {
        if (err) throw err;

        if (cv) {
            res.json(cv);
        }

    });
});

router.get('/edit/:id',  (req,res) => {

    Cv.findOne({'id' : req.params.id}, (err,cv) => {
        if (err) throw err;

        if (cv) {
            res.render('auth/CV/updateCV');
        }

    });
});


router.post('/', (req,res) => {
    
});

router.put('/:id',  upload.single('imgpath'),(req,res) => {
var errors = [];

if (req.file) {
    

    var updatedcv = {} ;
    updatedcv.path = `cv/${req.file.filename}`;

    Cv.findOneAndUpdate({'id' : req.params.id}, updatedcv, {upsert : true}, (err,cv) => {
        if (err) throw err;

        if (cv) {
             res.redirect('/cv');
        }

    });

}else {
    Cv.findOne({'id' : req.params.id}, (err,cv) => {
        if (err) throw err;
        errors.push({msg:'You didnt choose the pdf file'});
        if (cv) {
            res.render('auth/CV/updateCV',{errors});
        }

    });
}
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
