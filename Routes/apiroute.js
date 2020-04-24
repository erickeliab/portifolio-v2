const express = require('express');
const router = express.Router();
const members = require('../Model');
const uuid = require('uuid');

//creating a member
router.post('/', (req,res) => {

   
const newMember = {
    id : uuid.v4(),
    name: req.body.name,
    phone: req.body.phone,
    place: req.body.place,
    position: req.body.position,
};

//validate the inputs for the name and phone
if(!newMember.name || !newMember.phone){
    res.status(400).json({msg:'hey you must include the name and phone'});
}
members.push(newMember);
res.json(members);
});

//getting all the members
router.get('/', (request,response) => {
    response.json(members);
    }); 
    
//getting the single member
 router.get('/:id', (req,res) => {
    let id = req.params.id;
    
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    
    }else {
        res.status(400).json({Message:'The request does not found'});
    }
    
    });

    //update the member
    router.put('/:id', (req,res) => {
        let id = req.params.id;
        
        const found = members.some(member => member.id === parseInt(req.params.id));
        
        if(found){
           const newUpdate = req.body;
         

            members.forEach(member => {
              if(member.id === parseInt(req.params.id)){
               
                  member.name = newUpdate.name ? newUpdate.name : member.name;
                  member.phone = newUpdate.phone ? newUpdate.phone : member.phone;
                  member.place = newUpdate.place ? newUpdate.place : member.place;
                  member.position = newUpdate.position ? newUpdate.position : member.position;

                  res.status(200).json({msg : 'you have successfully updated member', member});
                }
            });
        
        }else {
            res.status(400).json({Message:'The requested member was not found'});
        }
        
        });

           
//deleting the single member
 router.delete('/:id', (req,res) => {
    let id = req.params.id;
    
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
        res.json(members.filter(member => member.id !== parseInt(req.params.id)));
    
    }else {
        res.status(400).json({Message:'The request does not found'});
    }
    
    });

    module.exports = router;