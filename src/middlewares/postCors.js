const cors = require('cors');
module.exports = function(req, res, next) {
   
    const corsOptions = {
      origin: "*", 
      methods: "GET", 
      preflightContinue: false,
      optionsSuccessStatus: 204
    };

    
    if (req.user && req.user.email === 'admin@admin.com') {
      corsOptions.methods = "GET,HEAD,PUT,PATCH,POST,DELETE";
    }

    cors(corsOptions)
    next()
}