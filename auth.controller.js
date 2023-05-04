const AuthSignUpService = require("../services/auth/signup.service");
const AuthSignInService = require("../services/auth/signin.service");
const AuthSignForgotPasswordService = require("../services/auth/forgotPassword.service");
const AuthResetPasswordService = require("../services/auth/resetPassword.service");
const AuthRepository = require("../../database/repositories/auth/auth.repository")
//const controller = require("./user.controller");
const { PREFIX_PATH } = require("../../config");


const nodemailer = require('nodemailer');
const { verify } = require("jsonwebtoken");


module.exports = (app) => {
  app.post(`/${PREFIX_PATH}/signup`, async (req, res, next) => {
    try {
      // recuperer les informations du corps de la requête
      const { name, last_name, email, password, phone } = req.body;

      // passe le traitementau service dédié
      const { data } = await AuthSignUpService.signUp({
        name,
        last_name,
        email,
        password,
        phone,
      });

      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({error : error});
    }
  });

  app.post(`/${PREFIX_PATH}/signin`, AuthSignInService.signin);
 
  app.get("/user", AuthRepository.FindUserByEmail);

  app.post('/forgotPassword',async (req, res, next) => {
    try {
      // recuperer les informations du corps de la requête
      const email = req.body.email;
      const origin  = req.headers.origin;

      // passe le traitementau service dédié
     
      await AuthSignForgotPasswordService.sendPasswordResetEmail(email,origin);

      res.json({ message: 'Please check your email for a new password' });

    } catch (error) {
      return res.status(500).json({error : error});
    }
  });
  app.post(`/resetPassword`, async (req, res, next) => {
    try {
      // recuperer les informations du corps de la requête
      const newPassword = req.body.password;
      const email = req.body.email;

      if  (!newPassword || !email) {
        return res.sendStatus(400);
       }
      // passe le traitementau service dédié
      await AuthResetPasswordService.ResetPassword(newPassword,email);
      res.json({ message: 'Password reset successful, you can now login with the new password' });
      

    } catch (error) {
      return res.status(500).json({error : error});
    }
  } );
 
};
