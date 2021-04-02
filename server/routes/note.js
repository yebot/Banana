const express = require('express');

const noteController = require('../controllers/noteController');

const router = express.Router();

// @desc 
// @URL  
router.get('/',
  noteController.getNotes,
  (req, res) => res.status(200).json(res.locals)
);

// @desc    get all notes by author_id
// @url     GET /api/note/all/:author_id
router.get('/all/:author_id',
  noteController.getNotesByAuthor,
  (req, res) => res.status(200).json(res.locals)
);


// @desc    create a new note
// @url     POST /api/note
router.post('/',
  noteController.createNote,
  (req, res) => res.status(200).json(res.locals)
)

// @desc    update a note by its id
// @url     PATCH /api/note/:id
router.patch('/:id',
  noteController.updateNote,
  (req, res) => res.status(200).json(res.locals)
)

// @desc    delete a note by its id
// @url     DELETE /api/note/:id
router.delete('/:id',
  noteController.deleteNote,
  (req, res) => res.status(200).json(res.locals)
)

//// @desc    Delete all notes by author_id
//// @url     DELETE /api/note/all/:author_id
router.delete('/all/:author_id',
  noteController.deleteAllNotesByAuthor,
  (req, res) => res.status(200).json(res.locals)
)

module.exports = router;