const Pin = require("../models/pin");

exports.addPin = function(req, res, next) {
    const imageUrl = req.body.imageUrl;
    const createdBy = req.body.createdBy;
    const pinnedBy = req.body.pinnedBy;
    
    const pin = new Pin({
        imageUrl,
        createdBy,
        pinnedBy
    });
    pin.save(function(err){
        if(err) {
            console.log(err);
            return next(err);
        }
        res.json(pin);
    });
};