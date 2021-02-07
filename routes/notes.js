const express=require('express');
const router=express.Router();
const Note=require('../models/note.js');

router.get('/', async (req,res)=> {
  try{
    const notes=await Note.find();
    res.send(notes);
  }
  catch(err){
    res.status(500).json("Error");
  }

})

router.get('/:id', getNote,(req, res) => {
  res.json(res.note);
})


router.post('/', async (req, res) => {
    const note= new Note({
      noteTitle: req.body.noteTitle,
      noteDescription: req.body.noteDescription
    //   movieDate:req.body.movieDate
    });
  try{
      const newNote= await note.save();
      res.status(201).json(newNote);
  } catch (err){
    res.status(400).json({message:err.message})
  }
  
});


router.delete("/:id",getNote,async (req,res) =>{
  try{
    await res.note.remove();
    res.json({message:'Note Deleted'});
  }catch(err){
    res.status(500).json({message:"Could not find Note"});

  }
})

router.patch("/:id",getNote,async (req,res) =>{
  if(req.body.noteTitle !=null) {
    res.note.noteTitle=req.body.noteTitle;
  }
  if(req.body.noteDescription !=null){
    res.note.noteDescription=req.body.noteDescription;
  }
  try{
    const updatedNote=await res.note.save();
    res.json(updatedNote);
  }catch(err){
    res.status(500).json({message:"Not Updated"});    
  } 
})

async function getNote(req,res,next){
  let note;
  try{
    note = await Note.findById(req.params.id);
    if(note ==null){
      return res.status(404).json({message:"cannot find note"})
    }
  }
  catch(err){
    return res.status(500).json({message:"Id not found"})
  }
  res.note=note;
  next();
}


module.exports=router;
