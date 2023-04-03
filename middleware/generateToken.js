const jwt = require('jsonwebtoken');

const generateToken = (application_id) => {
  const token = jwt.sign({application_id} , process.env.TOKEN_SECRET, {
  });

  return token;
};

module.exports = generateToken;