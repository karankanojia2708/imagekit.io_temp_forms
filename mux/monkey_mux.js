const router = require('express').Router(); 
let monkey_schema = require('../class/monkey_class');
router.route('/').get((req,res)=>{
    monkey_schema.find()
    .then(monkey =>{res.json(monkey)})
    .catch(err=>res.status(400).json('err : ' + err)); 
}); 
router.route('/').post((req,res)=>{
    const name = req.body.name; 
    const email = req.body.email; 
    const pwd = req.body.pwd; 
    const new_monkey = monkey_schema({name,email,pwd}); 
    new_monkey.save()
    .then(() => res.json('New monkey added !'))
    .catch(err=>res.status(400).json('err : ' + err)); 
}); 

module.exports = router; 