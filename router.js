const passportService = require("./services/passport");
const passport = require("passport");
const TwitterController = require("./controllers/twitter_controller");
const PinItController = require("./controllers/pinit_controller");


module.exports = function(app) {
    app.get('/',function(req,res){
       res.end("Server started successfully :)");
    });
    
    //twitter handlers
    app.get('/generate-token',TwitterController.generateToken);
    app.get('/get-access-token-callback', TwitterController.getAccessTokenCallback);
    app.get('/get-oauth-token', TwitterController.getOAuthToken);
    app.get('/test-authorization', passport.authenticate('twitter-token',{session:false}), TwitterController.testAuthorization);
    
    //pinit handlers
    app.post('/add-pin', PinItController.addPin);
};