const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
const passport = require('passport');
const {  ensureAuthenticated  } = require('../config/auth');

var Project = require('../Models/Project');
var Profile = require('../Models/Profile');
var Service = require('../Models/Service');
var Cv = require('../Models/Cv');
var Skill = require('../Models/Skill');
var Message = require('../Models/Message');







router.get('/', (request,response) => {
//projects
Project.find({}, (err,projects) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else{
        //services
        Service.find({}, (err,services) => {
            if (err) {
                res.status(404,{msg: 'The services were not found'});
            }else{
                //skills
                Skill.find({}, (err,skills) => {
                    if (err) {
                        res.status(404,{msg: 'The services were not found'});
                    }else{
                            //profile
                            Profile.find({}, (err,profile) => {
                                if (err) {
                                    res.status(404,{msg: 'The services were not found'});
                                }else{
                                    //cv
                                    Cv.find({}, (err,cv) => {
                                        if (err) {
                                            res.status(404,{msg: 'The services were not found'});
                                        }else{
                                            let data = {
                                                skills,
                                                projects,
                                                profile,
                                                cv,
                                                services
                                            }
                                            console.log(data.services[0]);
                                            response.render('index',{data});
                                                // response.json(data);        
                                        }

                                    });
                                }

                            });
                    }
                
                });
            }
        
        });
    }

});

  

    }); 

router.get('/about', function(req,res){

    //GENERATING DATA FROM THE MODELS
    //projects
Project.find({}, (err,projects) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else{
        //services
        Service.find({}, (err,services) => {
            if (err) {
                res.status(404,{msg: 'The services were not found'});
            }else{
                //skills
                Skill.find({}, (err,skills) => {
                    if (err) {
                        res.status(404,{msg: 'The services were not found'});
                    }else{
                            //profile
                            Profile.find({}, (err,profile) => {
                                if (err) {
                                    res.status(404,{msg: 'The services were not found'});
                                }else{
                                    //cv
                                    Cv.find({}, (err,cv) => {
                                        if (err) {
                                            res.status(404,{msg: 'The services were not found'});
                                        }else{
                                            let data = {
                                                skills,
                                                projects,
                                                profile,
                                                cv,
                                                services
                                            }
                                            console.log(data);
                                            res.render('about',{data});
                                                // response.json(data);        
                                        }

                                    });
                                }

                            });
                    }
                
                });
            }
        
        });
    }

});
 
});

router.get('/services', function(req,res){
    //generating services information from database through the model
    Service.find({},(err,services) => {
        console.log(services);
        res.render('services',{services});

    });
});



router.get('/contacts', function(req,res){
    Profile.find({}, function(err,profile){
        if (err) {
            res.status(404);
        } else 
        {
            Cv.find({}, function(err,cv){
                if (err) {
                    res.status(404);
                } else 
                {
                   
                    res.render('contacts',{profile , cv});
        
                }
            })
           

        }
    })
});

router.get('/dash', ensureAuthenticated , (req,res) => {
    //projects
 Project.find({}, (err,projects) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else{
        //services
        Service.find({}, (err,services) => {
            if (err) {
                res.status(404,{msg: 'The services were not found'});
            }else{
                //skills
                Skill.find({}, (err,skills) => {
                    if (err) {
                        res.status(404,{msg: 'The services were not found'});
                    }else{
                            //profile
                            Profile.find({}, (err,profile) => {
                                if (err) {
                                    res.status(404,{msg: 'The services were not found'});
                                }else{
                                    //cv
                                    Cv.find({}, (err,cv) => {
                                        if (err) {
                                            res.status(404,{msg: 'The services were not found'});
                                        }else{
 
                                         //getting number of all projects
                                         Project.count({},function(err,no_project){
                                               //getting number of all services
                                                  Service.count({},function(err,no_services){
                                               //getting number of all messages
                                                       Message.count({},function(err,no_messages){
                                                           //getting number of all skills
                                                           Skill.count({},function(err,no_skills){
                                               
                                                             let data = {
                                                                 skills,
                                                                 projects,
                                                                 profile,
                                                                 cv,
                                                                 services,
                                                                 no_project,
                                                                 no_services,
                                                                 no_messages,
                                                                 no_skills
 
                                                             }
                                                              
                                                            console.log(data);
                                                            res.render('auth/dash',{data});
                                                                // response.json(data);   
                                                       });
                                              
                                               
                                         });
                                              
                                         });
                                              
                                         });
                                              
                                        }
                                       
                                    });
                                }
 
                            });
                    }
                
                });
            }
        
        });
    }
 
 });
 
   
 });



module.exports = router;
