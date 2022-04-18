const {Router} = require('express');
const router = Router();
const Note = require('../../models/note.model');
const logger = require('../../logger');
const authJwt = require('../middleware/authJwt');

router.get('/api/notes', authJwt, async (req, res, next) => {
  try {
    const offset = +req.query.offset;
    const limit = +req.query.limit;

    const allNotes = await Note
        .find({userId: req.userId})
        .skip(offset)
        .limit(limit)
        .select('-__v');

    if (!allNotes) return res.status(400).json({message: `No notes in database`});

    const count = await Note.countDocuments({userId: req.userId});


    logger.info(allNotes);

    res.type('application/json').json({
      offset,
      limit,
      count,
      allNotes,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
