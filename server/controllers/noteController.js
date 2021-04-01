const { Note } = require('../models/bananaModels');

const noteController = {};

noteController.getNotes = (req, res, next) => {

  next();
}


noteController.getNotesByAuthor = (req, res, next) => {
  console.log('we are in noteController.getNotesByAuthor');
  console.log(req.params.author_id);
  const filter = { author_id: req.params.author_id };
  try {
    Note.find(filter, function (err, docs) {
      //res.status(200).json(docs);
      res.locals = docs;
      next();
    });
  } catch (err) {
    next({err: err});
  }
}

noteController.createNote = (req, res, next) => {
  const newNote = { 
    content: req.body.content, 
    title: req.body.title, 
    author_id: req.body.author_id, 
    tags: req.body.tags
  };
  const note = new Note(newNote);
  note.save()
    .then(data => {
      res.locals = data;
      next();
    })
    .catch(err => {
      console.log(err);
      next({
        log: `Unable to save new note - ${err}`,
        status: 500,
        message: { err: 'Unable to save new note' },
      });
    });
}

noteController.updateNote = (req, res, next) => {
  const noteId = req.params.id.toString();
  const updatedNote = { 
    content: req.body.content, 
    title: req.body.title, 
    author_id: req.body.author_id, 
    tags: req.body.tags
  };
  //console.log(updatedNote);
  Note.findByIdAndUpdate( noteId, updatedNote, (err, data) => {
    console.log(data);
    if (!err) {
      res.locals = data;
      next();
    } else {
      next({err});
    }
  });
}

noteController.deleteNote = (req, res, next) => {
  const noteId = req.params.id.toString();
  Note.deleteOne({ _id: noteId}, (err, result) => {
    console.log(result);
    if (!err && result.deletedCount === 1) {
      console.log(`deleted note _id=${noteId}`);
      next();
    } else {
      next({ log: err, message: { err: err } });
    }
  })
}

noteController.deleteAllNotesByAuthor = (req, res, next) => {
  const filter = { author_id: req.params.author_id };
  try {
    Note.deleteMany(filter, (err, result) => {
      console.log(result);
      res.locals = result;
      next();
    });
  } catch (err) {
    next({err: err});
  }
}

module.exports = noteController;