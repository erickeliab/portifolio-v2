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
var Logger = require('../Models/Logger');




router.get('/logs',ensureAuthenticated,(req,res) => {

    Logger.find({},(err,logs)=> {
        return res.send(logs);
    });
});


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
                                            var route = 'index';
                                            response.render('index',{data,route});
                                            
                                                // response.json(data);



                                                var log = new Logger();
                                                    var today = new Date();
                                                    log.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+ '::' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                                    log.save();
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
                                            var route = 'about';
                                            res.render('about',{data,route});
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



router.get('/projectz', function(req,res){

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
                                            var route = 'projects';
                                            res.render('projects',{data,route});
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





router.get('/projectz/:id', function(req,res){

    //GENERATING DATA FROM THE MODELS
    //projects
Project.find({id : req.params.id}, (err,projects) => {
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
                                            var project = projects[0];
                                            var route = 'projects';
                                           
                                            res.render('projectssingle',{data,project,route});
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


router.get('/skillz', function(req,res){

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
                                            var route = 'skills';
                                            res.render('skills',{data,route});
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
        Cv.find({}, (err,cv) => {
            if (err) {
                res.status(404,{msg: 'The services were not found'});
            }else{
        let data = {
            cv
        }
        var route = 'services';
        res.render('services',{services,route,data});
    }
    });
    });
});



router.get('/services/:id', function(req,res){
    //generating services information from database through the model
    Service.find({id : req.params.id},(err,services) => {
        var service = services[0];
        var route = 'services';
        Cv.find({}, (err,cv) => {
            if (err) {
                res.status(404,{msg: 'The services were not found'});
            }else{
        let data = {
            cv
        }
        res.render('servicesingle',{service,route,data});
    }
    });
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
                    let data = {
                        cv
                    }
                    var route = 'contacts';
                    res.render('contacts',{profile , cv,route,data});

                }
            })


        }
    })
});

router.get('/dash', ensureAuthenticated , (req,res) => {
    //logs
    Logger.count({},(err,logs)=> {
    
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
                                                                 no_skills,
                                                                 logs

                                                             }

                                                           
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

 });



module.exports = router;
