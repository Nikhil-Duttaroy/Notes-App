const mongoose=require('mongoose');

const noteSchema= new mongoose.Schema({
    noteTitle:{
        type:String,
        required:true
    },
    noteDescription:{
        type:String,
        required:true
    },
    noteDate:{
        type:Date,
        default:Date.now
    }
});


module.exports=mongoose.model('Note',noteSchema);