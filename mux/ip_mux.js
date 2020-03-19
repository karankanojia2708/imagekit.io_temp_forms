const router = require('express').Router();
let ip_schema = require('../class/ip_class');
router.route('/:ip').get((req, res) => {
    console.log(req.params);
    const key = req.params.ip;
    ip_schema.find({ "ip": key })
        .then(query => { res.json(query) })
        .catch(err => res.status(400).json('err : ' + err));
});

router.route('/update/:ip').post((req, res) => {
    const d = new Date(), today = "" + d.getDay() + d.getMonth() + d.getFullYear();
    const key = req.params.ip;
    ip_schema.findOneAndUpdate({ "ip": key }, {useFindAndModify : false})
        .then(query => {
            if (query.timestamp != today) {
                query.timestamp = today;
                query.hit = 1;
                query.save()
                    .then(() => res.json(query))
                    .catch(err => res.status(400).json('err : ' + err));
            }
            else if(query.hit > 3){
                res.json('<b>Warning you have made more than 4 request using this ip ' + query.ip +' although you can still add new user but this is a system warning </b>'); 
            }else{
                query.hit = query.hit + 1;
                query.save()
                    .then(() => res.json(query))
                    .catch(err => res.status(400).json('err : ' + err));
            }

        }).catch(err => res.status(400).json('err : ' + err));
});


router.route('/').post((req, res) => {
    const ip = req.body.ip;
    const timestamp = req.body.timestamp;
    const hit = req.body.hit;
    const new_ip = ip_schema({ ip, timestamp, hit });
    const d = new Date(), today = "" + d.getDay() + d.getMonth() + d.getFullYear();
    const key = req.params.ip;
    new_ip.save()
        .then(() => res.json('New ip added !'))
        .catch(err => res.status(400).json('err : ' + err));
});

module.exports = router; 