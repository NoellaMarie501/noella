const db = require("../../../database/connection");
const { AuthRepository } = require("../../../database");
const {
    
    GenerateSalt,
    HashPassword
  } = require("../../../utils");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");
const config = require("../../../config/auth.config");



class AuthResetPasswordService {


// If all is ok

static async ResetPassword(newPassword, email) {
        // verify user
    await AuthRepository.checkUser(email).then(user => {
                res.status(200).send({
                message: `moving to next!!!!`
          });
       
                });
    // hash the newPassword
    let salt = await GenerateSalt();
    let hashPassword = await HashPassword(newPassword, salt); 
    
    await db.users.update(
        {
          password: hashPassword
        },
        {
          where: {email},
        }
      );
      
     
   }; 
      
  }


module.exports = AuthResetPasswordService