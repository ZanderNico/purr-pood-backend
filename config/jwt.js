require('dotenv').config()

module.exports = {
    jwtSecret: process.env.SECRET_KEY,
    jwtExpiration: '1h', // Token expiration time (e.g., 1 hour)
  };