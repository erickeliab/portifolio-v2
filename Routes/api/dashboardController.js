const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
const { ensureAuthenticated } = require('../../config/auth');

//importing the model


var Project = require('../../Models/Project');
var Profile = require('../../Models/Profile');
var Service = require('../../Models/Service');
var Message = require('../../Models/Message');
var Cv = require('../../Models/Cv');
var Skill = require('../../Models/Skill');


mongoose.set('useFindAndModify', false);
// mongoose.set( 'useUnifiedTopology', true );


router.get('/', ensureAuthenticated, (req,res) => {
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
                                        Project.Collection.countDocuments({},function(err,no_project){
                                              //getting number of all services
                                                 Service.Collection.countDocuments({},function(err,no_services){
                                              //getting number of all messages
                                                      Message.Collection.countDocuments({},function(err,no_messages){
                                                          //getting number of all skills
                                                          Skill.Collection.countDocuments({},function(err,no_skills){
                                              
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
