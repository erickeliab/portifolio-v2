const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
const methodOverride = require('method-override');

const { ensureAuthenticated } = require('../../config/auth');



router.use(methodOverride('_method'));
router.use(ensureAuthenticated);

//importing the model
let Skill = require('../../Models/Skill');
// mongoose.set('useFindAndModify', false);
// mongoose.set( 'useUnifiedTopology', true );


//
// const tota = Skill.Collection.countDocuments({}, function(err,count){
        
//         return count;
//         console.log(count);
//     });
   





//GETTING ALL THE SKILLS
router.get('/',ensureAuthenticated, (req,res) => {
    //Querying through model

    Skill.find({}, (err,skills) => {
    if (err) {
       
        res.status(404,{msg: 'The services were not found'});
    }else {
      
        res.render('auth/Skills/allskills',{skills});
    }
   
})
    
  
});
//getting the form to addte skill
router.get('/add', (req,res) => {
    //Querying through model
    const CompLevel = [
        'Novice',
        'Advanced Beginner',
        'Competent',
        'Proficient',
        'Expert'
    ];
     
    Skill.find({}, (err,skills) => {
    if (err) {
       
        res.status(404,{msg: 'The services were not found'});
    }else {
       
        res.render('auth/Skills/addskill', {CompLevel});
    }
   
})
    
  
});

//ADDING NEW SKILL 
router.post('/', (req,res) => {
    //Querying through model
    Skill.countDocuments({}, function(err,count){
        county = count;
       req.body.id = county + 1;
        
        var errors = [];
        const CompLevel = [
            'Novice',
            'Advanced Beginner',
            'Competent',
            'Profficient',
            'Expert'
        ];
        const { experience , competence , skillname} = req.body;
        if (experience && competence && skillname){
           

            var newskill = new Skill(req.body);
           
                newskill.save( (err,result) => {
                    if (err) {
                        throw err;
                    }else {
                        req.flash(
                            'success_msg',
                            'You have added a new skill to your website'
                        );
                        res.redirect('/skills');
                    }
                });
           
        }else {
            
            errors.push({
                msg : 'fill all the required fields'
            });
            res.render('auth/Skills/addskill',{
                errors,
                CompLevel
            });
        }

       
       
    });
  

});

//GETTING A SINGLE SKILL
router.get('/:id', (req,res) => {

    Skill.find({'id' : req.params.id}, function(err,skill){
        if (err) throw err;

        if(skill){
            res.render('auth/Skills/singleskill');
        }
    });
    
});

//EDIT A SINGLE SKILL
router.get('/edit/:id', (req,res) => {
  const CompLevel = [
        'Novice',
        'Advanced Beginner',
        'Competent',
        'Profficient',
        'Expert'
    ];
 
    Skill.find({'id' : req.params.id}, function(err,skill){
        if (err) throw err;


        if(skill){
            res.render('auth/Skills/updateskill',{CompLevel, skill});
         
        }
    });
    
});

//UPDATING A SPECIFIED SKILL
router.put('/:id', (req,res) => {
 //Querying through model

    var errors = [];
    const CompLevel = [
        'Novice',
        'Advanced Beginner',
        'Competent',
        'Profficient',
        'Expert'
    ];


    const { id, experience , competence , skillname} = req.body;
   
    

      Skill.findOne({'id': id}, (err, origin) => {
            if (err) return err;

            if ( id != "" && experience != "" && competence != "" && skillname != ""){
               
                origin.skillname = skillname;
                origin.experience = experience;
                origin.competence = competence;
                origin.save();
                
                
                return res.redirect(`/skills/${id}`);
            }else {
                var skill = [];
                skill[0] = origin;
                errors.push({
                    msg : 'fill all the required fields'
                });
                res.render('auth/Skills/updateskill',{
                    errors,
                    CompLevel,
                    skill
                });
            }
            
      });
        
        
   

   
   


});

//DELETING A SINGLE SKILL
router.delete('/:id', (req,res) => {

    Skill.findOneAndDelete({'id' : req.params.id}, function(err,doc){
        if (err) throw err;

        if(doc){
             res.redirect('/skills');
        }
    });
    
    
});

module.exports = router;
