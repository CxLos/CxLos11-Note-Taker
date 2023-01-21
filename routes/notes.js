// variables
const express = require('express');
const app = express();
const router = express.Router();
const { readFromFile, readAndAppend } = require('../public/assets/js/helper');
const random = require('../public/assets/js/random');

router.get('/', (req, res) => {
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
    console.info(`${req.method} request received to add note`);
    
  });
  
  // POST Route for new note
  router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, note } = req.body;
  
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

  module.exports = router;