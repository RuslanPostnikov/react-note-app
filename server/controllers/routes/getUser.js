const {Router} = require('express');
const User = require('../../models/user.model');
const logger = require('../../logger');
const router = Router();
const authJwt = require('../middleware/authJwt');

router.get('/api/users/me', authJwt, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password -__v');

    logger.info(user);

    res.type('application/json').json({user});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
