import { validator } from "../../Validators/users";
import { saveUser, getUser } from "./Handler";
import { tokenValidator } from "../../middlewares/jwtVerify";
const jwt  = require('jsonwebtoken');


export default router => {
  router.get("/home", tokenValidator, function(req, res, next) {
    if(req.authenticated){
      return res.status(200).json({
        success : true,
        message : "Valid user",
        user : req.decoded 
    })
    } else{
      return res.status(401).json({
        success : false,
        message : "Unauthorized user"
    })
  }
 
  });

  router.post("/register", function(req, res, next) {
    let user= {}
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone_no = req.body.phone_no;
    user.password = req.body.password;
    user.aadhar_no = req.body.aadhar_no;
    saveUser(user)
      .then(data => {
        return res.status(data.statusCode).json({
          success: true,
          message: data.message
        });
      })
      .catch(err => {
        return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          stacktrace: err
        });
      });
  });


  router.post("/login", function(req, res, next) {
    const user ={
      phone_no : req.body.phone_no,
      password : req.body.password
    }
    getUser(user)
      .then(data => {
        const token= jwt.sign(data,"SuperSecret")
        return res.status(201).json({
          success: true,
          message: data.message,
          token : token
        });

      })
      .catch(err => {
        return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
        });
      });
  });
};
