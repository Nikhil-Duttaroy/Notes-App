const express=require("express");
const mongoose=require('mongoose')
const notesRouter=require('./routes/notes.js');

const app=express();
const PORT=process.env.PORT || 3000;
const DATABASE_URL=process.env.DATABASE_URL ||'mongodb://localhost/notesapp';

mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error',error=>console.error(error));
db.once('open',()=>console.log("Connected To Database"))

app.use(express.static('public'));

app.use(express.json());
app.use('/notes',notesRouter);



app.listen(PORT,()=> console.log(`Listening on PORT number : ${PORT}`));