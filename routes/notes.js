// variables
const router = require('express').Router();
const { readFromFile, readAndAppend, deleteNote } = require('../db/helper');
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

  router.delete('/notes/:id', async (req, res) => {

      const notesArray = JSON.parse(readFromFile());
      
      for (let i = 0; i<notesArray.length; i++ ) {
        if(notesArray[i].id == req.params.id) {
          console.log('we found a match', i, notesArray[i])
          notesArray.splice(i, 1)
        }
      }    
      // console.log(notesArray)
    });

  module.exports = router;