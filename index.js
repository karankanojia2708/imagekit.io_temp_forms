/*created via VIM*/
const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 
const app = express(); 
const PORT = process.env.PORT || 2708;
const uri = process.env.ATLAS_URI; 
app.use(cors()); 
app.use(express.json()); 

mongoose.connect(uri, {useCreateIndex:true, useNewUrlParser : true, useUnifiedTopology:true}); 
const connection = mongoose.connection; 
connection.once('open', ()=>{
    console.log("connected established ");
}); 

const monkey_mux = require('./mux/monkey_mux'); 
const ip_mux = require('./mux/ip_mux'); 
app.use('/monkey', monkey_mux);
app.use('/ip', ip_mux); 

app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html"); 
});
app.listen(PORT, ()=>{
    console.log("connected to : " + uri);
}); 
