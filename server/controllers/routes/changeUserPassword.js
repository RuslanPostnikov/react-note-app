const {Router} = require('express');
const User = require('../../models/user.model');
const logger = require('../../logger');
const router = Router();
const authJwt = require('../middleware/authJwt');
const bcrypt = require('bcrypt');

router.patch('/api/users/me', authJwt, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.password,
    );

    if (!passwordIsValid) {
      return res.status(400).send({
        message: 'Invalid Password!',
      });
    }

    await User.findByIdAndUpdate(req.userId, {
      password: bcrypt.hashSync(req.body.newPassword, 8),
    });


    logger.info('Password changed successfully');

    res.type('application/json').json({message: 'Password changed successfully'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
