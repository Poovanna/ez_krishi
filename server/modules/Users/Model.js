import mongoose from "mongoose";
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
name: {
  type : String,
  required : true
},
email: {
  type : String,
  required : true
},
phone_no: {
  type : String,
  required : true
},
password : {
  type : String,
  required: true
},
aadhar_no :{
  type : String,
  required : true
}
},{
collection: "ezk_users"
});

// pre

const userModel = mongoose.model("ezk_users", userSchema);

const createUser = user => {
return new Promise( (resolve, reject) => {
  bcrypt.hash(user.password, 10, function(err, hash) {
  user.password=hash;
  if(err){
    reject ({
      message : "Could not hash"
    })
  } else {
    user.save().then(doc => {
      if (doc) {
        resolve ({
          message : "Password hashed and user registered"
        });
      } else {
        reject ({
          message : "Could not save"
        })  
      }
    });
    
  }
})
})
}

const findUser = user =>  {
return new Promise((resolve, reject) => {
  userModel.findOne({ phone_no : user.phone_no}, (err, doc)=>{
    if(err|| !doc){
      return reject({
            status : "500",
            message : "user not found",
            err : err
          })
    }else{
       bcrypt.compare(user.password, doc.password, (err, res)=>{
        if (res){
          delete doc.password
          console.log(doc.password)
          return resolve({
            name: doc.name,
            phone_no: doc.phone_no,
            email: doc.email,
            aadhar_no: doc.aadhar_no
          })
        } else {
         return reject({
          status : "500",
          message : "password doesn't match",
          err : err
          })
          }
        })
      } 
    })
})
}


//const findAndDelete = name => userModel.findOneAndRemove({name: name})

module.exports = {
userModel,
createUser,
findUser
};
