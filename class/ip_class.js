/*created via VIM*/
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const ip_schema = new Schema({
    ip: {
        type : String, require : true, trim : true, unique : true
    },
    timestamp: {
        type : String, require : true, trim : true, minlength : 3 
    }, 
    hit : {
        type : Number, require : true, trim : true
    }
}); 

const ip = mongoose.model('ip', ip_schema); 
module.exports = ip; 