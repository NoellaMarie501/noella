const db = require("../../connection");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");
const nodeMailer = require("nodemailer");
const config = require("../../../config");

//Dealing with data base operations
class AuthRepository {
  static async CreateUser({
    name,
    last_name,
    email,
    password,
    phone,
    role,
    status,
  }) {
    try {
      const user = await db.users.create({
        name,
        last_name,
        email,
        password,
        phone,
        role,
        status,
      });

      return user;
    } catch (err) {
      throw new APIError(
        "Erreur de l'API",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible de créer l'utilisateur"
      );
    }
  }

  static async FindUserByEmail(req, res) {
    try {
      db.users.findOne({
        where: {
          email: req.body.email
        }
      });
      return res.status(200).send({
        message: "user found"
      });
    } catch (err) {
      throw new APIError(
        "Erreur de l'API",
        "Impossible de trouver l'utilisateur"
      );
    }
  }

  static async FindUserByPhone(req, res) {
    try {
      db.users.findOne({
        where: {
          phone: req.body.phone
        }
      }).then(user => {
        return res.status(200).send({
        message: "user found"
      });} )
      
    } catch (err) {
      throw new APIError(
        "Erreur de l'API",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible de trouver l'utilisateur"
      );
    }
  }
  // Update password
  

  // Verify user 

    static async checkUser(email) {

      // Verify if email entered are inputed
              if (!email)
                  throw new APIError(
                  "Please input Email"
              );
      
        db.users.findOne({
            where: {email},
                  })
      };


  // Verify Token
  static verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    }); 
  }
};

module.exports = AuthRepository;
