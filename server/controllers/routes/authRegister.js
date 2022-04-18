const {Router} = require('express');
const db = require('../../models/index');
const bcrypt = require('bcryptjs');
const verifySignUp = require('../middleware/verifySignUp');
const logger = require('../../logger');

const router = Router();
const User = db.user;

router.post('/api/auth/register', verifySignUp, async (req, res, next) => {
  try {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept',
    );

    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      createdDate: new Date().toLocaleString(),
    });
    await user.save();

    logger.info(user);

    res.type('application/json').json({message: 'Success'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
