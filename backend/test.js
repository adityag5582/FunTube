import jwt from 'jsonwebtoken';
import config from './config.js';

const getToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      config.JWT_SECRET,
      {
        expiresIn: '72h',
      }
    );
  };

  console.log(
      getToken({
        "_id":"60bc9c35ed0af35bc83faf84",
        "name":"Aditya",
        "email":"kumar.92@iitj.ac.in"
  }))