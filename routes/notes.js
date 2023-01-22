// variables
const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../db/helper');
const random = require('../db/random');

router.get('/notes', (req, res) => {
  const returnedJsonData = readFromFile();
	res.send(returnedJsonData);
  console.info(`${req.method} request received to add a note`);
  });
  
  // POST Route for new note
  router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, note, } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        note,
        id: random(),
      };
  
      readAndAppend(newNote, '../db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error adding note');
    }
  });

  // router.delete('/notes/:id', (req, res) => {
  //     deleteNote();
  //   });

  module.exports = router;