const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/jwt')

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    //yung token kasi may intial "Bearer "+ token string pa kaya need split
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(403).send({ message: 'No token provided.' });
    }
  
    //check kung tama yung tokens 
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
      //decoded the jwt token data. Bale yung decoded data is row 1 as object
      req.user_role = decoded.user.user_role;
      console.log("Hi mom",req.user_role)
      next();
    });
  }
  
  module.exports = verifyToken;