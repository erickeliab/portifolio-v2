const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
const methodOverride = require('method-override');

//importing the model
let Project = require('../../Models/Project');
let Skills = require('../../Models/Skill');


router.use(methodOverride('_method'));

mongoose.set('useFindAndModify', true);
// mongoose.set( 'useUnifiedTopology', true );

//GETTING ALL THE PROJECTS
router.get('/', (req,res) => {
    //Querying through model

    Project.find({}, (err,projects) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
       
        res.render('auth/Project/allproject',{projects});
    }
})
    
  
});

router.get('/add', (req,res) => {
    //Querying through model

    Skills.find({}, (err,skills) => {
    if (err) {
       
        res.status(404,{msg: 'The message were not found'});
    }else {
       
        res.render('auth/Project/addproject',{skills});
    }
   
})
    
  
});


//ADDING A NEW PROJECT
router.post('/', (req,res) => {


    const tools = [];
    // return res.send(req.body);
    Project.countDocuments({}, function(err,count){
        county = count;
       req.body.id = county + 1;
       
       //creating an array of tools
       
        //distructuring

        const { github, production, projectname, completed,budget,initiation,deadline,description } = req.body;


         //creating an array of tools
        

        const keys = Object.keys(req.body);
        

       

        
               
        Project.find({}, (err, projes) => {
            if (err) throw err;

            var temp = '';
            if (projes){
                projes.forEach((pro) => {
                   
                   
                    if ( pro.id > temp || temp == ''){

                        temp = pro.id;
                    }else {
                        temp = temp;
                    }

                    
                })
                // temp = temp.toInt();
                req.body.id = Number(temp) + 1;
                
            }
        });
       
        var newproject;  

        // check to see if the value is present and add it to an array
       
        Skills.find({}, (err, skillls ) => 
        {
            if (err) throw err;

            if(skillls) {
                skillls.forEach( function(skill) {

                    //iterate the second array
                    keys.forEach( function(key) {
                        //check if they match

                        if (skill.skillname === key){
                            
                            tools.push(key);
                            
                        }
                    });

                });
            }
           
        newproject = new Project({
        'tools': tools,
        'screenshorts': [ '' ],
        'Links': [ github, production ],
        'projectname': projectname,
        'completed': completed,
        'id': req.body.id,
        'budget': budget,
        'initialdate': initiation,
        'deadline': deadline,
        'description':description,

         });
         newproject.save( (err,doc) => {
            if (err) throw err;
    
            if(doc) {
                 return  res.redirect(`/projects/${req.body.id}`);
            }
        });

        })
        
        

  

    });
});

//GETTING A SINGLE PROJECT
router.get('/:id', function(req,res){

    Project.find({}, (err,projects) => 
    {
        if (err) {
             throw err;
             
        }
        else if (projects){
            let project = projects[req.params.id - 1];
            console.log(project);
            res.render('auth/Project/singleproject',{project});
        }
    });
});


//GETTING A SINGLE PROJECT FORM
router.get('/edit/:id', function(req,res){

   
    Skills.find({}, (err,skills) => {
    if (err) {
       
        res.status(404,{msg: 'The message were not found'});
    }else {
       Project.find({}, (err, projects) =>{
        if (err) {

            throw err;
        } else {
           
           let projectArry = projects.filter( (project) => project.id == req.params.id);

            project = projectArry[0];
            res.render('auth/Project/updateproject',{skills,project}); 
        }
     

        
        

       });
    }
   
});
    
});


//UPDATING A SPECIFIED PROJECT
router.put('/:id', (req,res) => {

    const tools = [];
    const { github, production, projectname, completed,budget,initiation,deadline,description } = req.body;
    const keys = Object.keys(req.body);

    Project.findOne({'id': req.params.id}, function(err,p){
        if (err) throw err;

       
        if ( p ){

            //extracting the tools array
            Skills.find({}, (err, skillls ) => 
        {
            if (err) throw err;

            if(skillls) {
                skillls.forEach( function(skill) {

                    //iterate the second array
                    keys.forEach( function(key) {
                        //check if they match

                        if (skill.skillname === key){
                            
                            tools.push(key);
                            
                        }
                    });

                })

            };

       
        
            p.tools = tools;
            p.description = description;
            p.budget = budget;
            p.screenshorts = [''];
            p.projectname = projectname;
            p.completed = completed;
            p.initialdate = initiation;
            p.deadline = deadline;
            p.Links =  [ github, production ];
            p.save();

            console.log(p);

             res.redirect('/projects');

            });
        }

        else {
            console.log('there is no project to update');
        }
    });
      
  


   
   
});

//DELETE THE SPECIFIED PROJECT
router.delete('/:id', (req,res) => {
    Project.findOneAndDelete({'id':req.params.id },(err,success) => {
        if (err) throw err;

        if (success) {
            res.send('successfuly deleted ');
        }
    });
})


module.exports = router;
