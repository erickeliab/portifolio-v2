const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
const methodOverride = require('method-override');
const multer = require('multer');
let upload = multer({dest : 'public/images/'});


const { ensureAuthenticated } = require('../../config/auth');
router.use(ensureAuthenticated);

//importing the model
let Service = require('../../Models/Service');
let Skill = require('../../Models/Skill');
router.use(methodOverride('_method'));
mongoose.set('useFindAndModify', false);
// mongoose.set( 'useUnifiedTopology', true );


//getting all the services
router.get('/', ensureAuthenticated , (req,res) => {
    //Querying through model

    Service.find({}, (err,services) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {
       
        res.render('auth/Services/allservices',{services});
    }
});
});

//get the page of adding the service

router.get('/add', (req,res) => {
    Skill.find( (err,skills) => {
        if (err) {
            console.log('some error occured during querrying the skills');
        }
        else {
            res.render('auth/Services/addservice', {skills});
        }
    });

});


//get a single service
router.get('/:s', (req,res) =>{

//finding thhe service according to the passed parameter


Service.findOne({'id' : req.params.s}, (err,service) => {
    if (err) {
        res.status(404,{msg: 'The services were not found'});
    }else {

       //res.send(req.params.s);
      
       res.render('auth/Services/singleservice',{service});

    }
});


});


//getting a delete confirmation

router.get('/delete/:s', (req,res) =>{

    //finding the service according to the passed parameter


    Service.findOne({'id' : req.params.s}, (err,service) => {
        if (err) {
            res.status(404,{msg: 'The services were not found'});
        }else {

           //res.send(req.params.s);
           
           res.render('auth/Services/deleteserv',{service});

        }
    });


    });


    // getting an update form

    router.get('/edit/:s', (req,res) =>{

        //finding thhe service according to the passed parameter

           Skill.find({}, (err,skills) => {

            if (err) throw err;

            if (skills) {

                Service.findOne({'id' : req.params.s}, (err,service) => {
                    if (err) {
                        res.status(404,{msg: 'The services were not found'});
                    }else {

                       //res.send(req.params.s);
                      
                       res.render('auth/Services/updateservice',{service,skills});

                    }
                });

            }
           })


        });

//creating the new service

router.post('/', upload.single('imgpath'), (req,res) => {


    var errors = [];
    const { s_name , head ,bodytext ,imgpath } = req.body;

    if (s_name  && head && bodytext && req.file.filename) {



    var keys = Object.keys(req.body);
    var tools = [];
    var service_id;

    Service.find({}, (err, projes) => {
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


    Skill.find({}, function(err,datas) {
        if (err) throw err;

        if (datas) {

            //will need to loop through the data


            datas.forEach((data) => {

                keys.forEach((key) => {
                    if (data.skillname === key){
                        tools.push(key)
                    }
                });
             });
        }



    var savedata = new Service(req.body);
    savedata.tools = tools;
    savedata.id = req.body.id;
    let path = `images/${req.file.filename}`;
    savedata.imgpath = path;


    savedata.save(function(err, result) {
        if (err) throw err;

        if(result) {
            res.redirect('servicez');
        }
    })
    })

} else{
    errors.push({msg : 'Fill in the form correcting, there are missing fields'});
    Skill.find( (err,skills) => {
        if (err) {
            console.log('some error occured during querrying the skills');
        }
        else {
            res.render('auth/Services/addservice', {skills,errors});
        }
    });


}

 } );

//updating the existing service

router.put('/:s', upload.single('imgpath'), (req,res) =>{


    //finding thhe service according to the passed parameter
    var errors = [];
    const { s_name , head ,bodytext ,imgpath } = req.body;

    if (s_name  && head && bodytext ) {
    const tools = [];
    const keys = Object.keys(req.body);


    Service.findOne({'id': req.params.s}, (err,newService) => {
        if (err) {
            res.status(404,{msg: 'The services were not found'});
        }else if (newService){
            //extracting the tools array
            Skill.find({}, (err, skillls ) =>
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

            if (req.file){
                let path = `images/${req.file.filename}`;
                newService.imgpath = path;
                newService.tools = tools;
                newService.s_name = s_name;
                newService.head = head;
                newService.bodytext = bodytext;
                newService.save();

            } else {

                newService.imgpath =  newService.imgpath;
                newService.tools = tools;
                newService.s_name = s_name;
                newService.head = head;
                newService.bodytext = bodytext;

                newService.save();

            }


            // return res.send(newService);

             res.redirect('/servicez');
        })
        }
    });
}else{
        errors.push({msg : 'Fill in the form correcting, there are missing fields'});
        Skill.find({}, (err,skills) => {

            if (err) throw err;

            if (skills) {

                Service.findOne({'id' : req.params.s}, (err,service) => {
                    if (err) {
                        res.status(404,{msg: 'The services were not found'});
                    }else {

                       //res.send(req.params.s);
                      
                       res.render('auth/Services/updateservice',{service,skills,errors});

                    }
                });

            }
           })


    }
});

router.delete('/:s', (req,res) =>{

    //finding thhe service according to the passed parameter

    Service.deleteOne({id : req.params.s}, (err,doc) => {
        if(err) throw err;
        else {
             res.redirect('/servicez');
        }
    });


    });


module.exports = router;
