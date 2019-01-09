import { createUser, userModel, findUser} from "./Model";

const saveUser = user => {
  const newUser = new userModel({
    name: user.name,
    email: user.email,
    phone_no: user.phone_no,
    password : user.password,
    aadhar_no : user.aadhar_no
  });

  return createUser(newUser)
    .then(doc => {
      if (doc) {
        return Promise.resolve({
          statusCode: 201,
          message: "Created"
        });
      } else {
        return Promise.reject({
          statusCode: 500,
          message: "Internel server error, while creating user"
        });
      }
    })
    .catch(err => {
      return Promise.reject({
        statusCode: 500,
        message: "Internel server error",
        error: err
      });
    });
};
 const getUser = user => {
   return findUser(user)
   .then(doc => {
     if (doc) {
       //console.log(doc)
       return Promise.resolve(
         doc 
       );
     } else {
       return Promise.reject({
         statusCode: 500,
         message: "Internel server error"
       });
     }
   })
   .catch(err => {
     return Promise.reject({
       statusCode: 500,
       message: err.message || "Handler Internel server error",
       error: err
     });
   });
};

module.exports = { saveUser, getUser};
