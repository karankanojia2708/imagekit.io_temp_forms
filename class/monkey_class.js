/*created via VIM*/
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const monkey_schema = new Schema({
    name: {
        type : String, require : true, trim : true 
    },
    email: {
        type : String, require : true, trim : true, minlength : 3, unique : true 
    }, 
    pwd : {
        type : String, require : true, trim : true, minlength : 3 
    }
}); 

const monkey = mongoose.model('monkey', monkey_schema); 
module.exports = monkey; 