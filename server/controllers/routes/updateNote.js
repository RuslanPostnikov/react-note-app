const {Router} = require('express');
const Note = require('../../models/note.model');
const logger = require('../../logger');
const router = Router();
const authJwt = require('../middleware/authJwt');

router.put('/api/notes/:id', authJwt, async (req, res, next) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
        {_id: req.params.id, userId: req.userId},
        {text: req.body.text});
    if (!updatedNote) {
      return res.status(400).json({message: `No notes with requested id ${req.params.id}`});
    }

    res.type('application/json').json({'message': 'Success'});

    logger.info(updatedNote);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
