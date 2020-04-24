let mongoose =  require('mongoose');

let Schema = mongoose.Schema;

let SkillSchema = new Schema({

    skillname : {
        type : String,
        required : true
    },
    competence : {
        type : String,
        required : true
    },
    experience : {
        type : String,
        required : true
    },
    id : {
        type : String,
        required : true
    }
      

    
});

let Skill = module.exports = mongoose.model('Skill',SkillSchema,'skills');
