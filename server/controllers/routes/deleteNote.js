const {Router} = require('express');
const Note = require('../../models/note.model');
const logger = require('../../logger');
const router = Router();
const authJwt = require('../middleware/authJwt');

router.delete('/api/notes/:id', authJwt, async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({_id: req.params.id, userId: req.userId});
    logger.info(note);

    if (!note) {
      return res.status(400).json({message: `No notes with requested id ${req.params.id}`});
    }

    res.type('application/json').json({'message': 'Success'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
