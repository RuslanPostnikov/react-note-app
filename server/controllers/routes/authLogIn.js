const {Router} = require('express');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const authJwt = require('../middleware/authJwt');

const router = Router();
const User = db.user;


router.post('/api/auth/login', async (req, res, next) => {
  try {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept',
    );

    User.findOne({username: req.body.username})
        .exec((err, user) => {
          if (err) {
            res.status(500).send({message: err});
            return;
          }
          if (!user) {
            return res.status(404).send({message: 'User Not found.'});
          }
          const passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password,
          );
          if (!passwordIsValid) {
            return res.status(400).send({
              message: 'Invalid Password!',
            });
          }
          const token = jwt.sign({id: user.id}, process.env.SECRET, {
            expiresIn: 86400, // 24 hours
          });

          res.status(200).send({
            message: 'Success',
            jwt_token: token,
          });
        });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
