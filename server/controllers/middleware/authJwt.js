const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(token);
  if (!token) {
    return res.status(403).send({message: 'No token provided!'});
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({message: 'Unauthorized!'});
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
