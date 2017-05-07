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
            return next(err);
        }
        res.json(pin);
    });
};

exports.fetchAllPins = function(req, res, next) {
    Pin.find({}, function(err, pins) {
        if(err) {
            return next(err);
        }
        res.json(pins.reverse());
    });
};

exports.deletePinById = function(req, res, next) {
    const imageId = req.params.imageId;
    Pin.find({_id:imageId}).remove(function(){
        res.json({"status":"success"});
    });
};

exports.savePin = function(req, res, next) {
    const imageId = req.body.imageId;
    const userName = req.body.userName;
    Pin.findOne({_id:imageId}, function(err, pin){
        if(err) {
           next(err);
        }
        const pinnedBy = pin.pinnedBy;
        pinnedBy = pinnedBy.push(userName);
        Pin.findOneAndUpdate({_id:imageId}, {pinnedBy}, function(err, data) {
            if(err) {
              next(err);
            } 
            res.json({status:"Updated"});
        });
    });
};

exports.unsavePin = function(req, res, next) {
    const imageId = req.body.imageId;
    const userName = req.body.userName;
    Pin.findOne({_id:imageId}, function(err, pin){
        if(err) {
           next(err);
        }
        var pinnedBy = pin.pinnedBy;
        pinnedBy = pinnedBy.filter((user) => {
            return user!==userName;
        });
        Pin.findOneAndUpdate({_id:imageId}, {pinnedBy}, function(err, data) {
            if(err) {
              next(err);
            } 
            res.json({status:"Updated"});
        });
    });
};