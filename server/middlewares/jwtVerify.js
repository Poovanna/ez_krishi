const jwt  = require('jsonwebtoken');

const tokenValidator = (req, res, next) => {
    const token =req.headers["authorization"]
    if(!token){
        return res.status(400).json({
            success: false,
            message:"Token absent"
      })
    } else {
        jwt.verify(token, "SuperSecret", (err, decoded) => {
            if (err){
                console.log(err);
                req.authenticated = false;
                req.decoded = null;
                next();
            } else {
                req.decoded = decoded;
                req.authenticated = true;
                next();
            }
        })
    }  
  };
  module.exports = {
      tokenValidator
  }
