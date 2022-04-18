const {Router} = require('express');
const Note = require('../../models/note.model');
const logger = require('../../logger');
const router = Router();
const authJwt = require('../middleware/authJwt');

router.post('/api/notes', authJwt, async (req, res, next) => {
  try {
    const note = new Note({
      text: req.body.text,
      completed: false,
      createdDate: new Date().toLocaleString(),
      userId: req.userId,
    });

    await note.save();
    res.type('application/json').end(JSON.stringify({message: 'File created successfully'}, null, 2));
    logger.info('File created successfully');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
