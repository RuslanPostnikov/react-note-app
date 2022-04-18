const {Router} = require('express');
const User = require('../../models/user.model');
const logger = require('../../logger');
const router = Router();
const authJwt = require('../middleware/authJwt');
const Note = require('../../models/note.model');

router.delete('/api/users/me', authJwt, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    const notes = await Note.deleteMany({userId: req.userId});

    logger.info({user, notes});

    res.type('application/json').json({message: 'Success'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
