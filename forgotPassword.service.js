const db = require("../../../database/connection");
const { AuthRepository } = require("../../../database");

const { APIError, STATUS_CODES } = require("../../../utils/app-errors");
const config = require("../../../config/auth.config");



var jwt = require("jsonwebtoken");


class AuthSignForgotPasswordService {


// If all is ok


//Send mail function 
static async sendMail({ to, subject, html, from = process.env.EMAIL_FROM}) {
  
   

    const transporter = nodeMailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: process.env.USER, // generated ethereal user
              pass: process.env.PASS // generated ethereal password
            }
    })
        
   
   await transporter.sendMail({ from, to, subject, html });
   
    console.log("email sent sucessfully");


}

	
static async sendPasswordResetEmail(email, origin) {

    db.users.findOne({
             where: {email},
                    }).then(user => {
                        if (!user) {
                            return res.status(404).send({ message: "User Not found." });
                          }
                        
            var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 20400 // 24 hours
                });

      let message;
       
      if (origin) {
          const resetUrl = `${origin}/apiRouter/resetPassword?token=${token} email=${email}`;
          message = `<p>Please click the below link to reset your password, the following link will be valid for only 1 hour:</p>
                     <p><a href="${resetUrl}">${resetUrl}</a></p>`;
      } else {
          message = `<p>Please use the below token to reset your password with the <code>/apiRouter/reset-password</code> api route:</p>
                     <p><code>${token}</code></p>`;
      }
   }); 
      await sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: ' Reset your Password',
          html: `<h4>Reset Password</h4>
                 ${message}`
      });
  }

}
module.exports = AuthSignForgotPasswordService