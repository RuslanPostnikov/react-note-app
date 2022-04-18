const {Router} = require('express');
const Note = require('../../models/note.model');
const logger = require('../../logger');
const router = Router();
const authJwt = require('../middleware/authJwt');

router.patch('/api/notes/:id', authJwt, async (req, res, next) => {
  try {
    const note = await Note.findOne({_id: req.params.id, userId: req.userId});
    if (!note) {
      return res.status(400).json({message: `No notes with requested id ${req.params.id}`});
    }

    const checkedNote = await Note.findByIdAndUpdate(req.params.id, {completed: !note.completed});

    res.type('application/json').json({'message': 'Success'});

    logger.info(checkedNote);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
