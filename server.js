// variables
const express = require('express');
const path = require('path');
const helper = require('./public/assets/js/helper');
const db = require('./db/db.json');
const fs = require('fs');
const util = require('util');
const app = express();
const PORT = 3001;

// fs constants
// read
const readFromFile = util.promisify(fs.readFile);
// write
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
// append
  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Navigate to /notes'));

// Get route for homepage
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// );

// get route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Get route for retrieving notes
app.get('/api/notes', (req, res) => {

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  // res.json(`${req.method} request received to get notes`);
  console.info(`${req.method} request received to get notes`);
});

// Post route for notes
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add note`);

  const { title, note, } = req.body;

  if (req.body) {
    const newNote = {
      title,
      note,
      note_id: helper(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});


// Porting
app.listen(PORT, () =>
  console.log(`We are now live listening at http://localhost:${PORT}!`)
);

// Post route for notes old way
// app.post('/api/notes', (req, res) => {

//   console.info(`${req.method} request received to add note`);

//   const { title, note, } = req.body;

//   if (title && note) {

//     fs.readFile('./db/db.json', 'utf8', (error, data) => {

//       const parsedNotesArray = data ? JSON.parse(data) : [];
//       const notes = parsedNotesArray || [];

//       console.log(data);
  
//     const newNote = {
//       title,
//       note,
//       review_id: helper(),
//     };

//     notes.push(newNote);

//     const noteString = JSON.stringify(newNote);

//     fs.writeFile(`./db/db.json`, noteString, (err) =>
//       err
//         ? console.error(err)
//         : console.log(
//             `Review for ${newNote.title} has been written to JSON file`
//           )
//     );

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   });
  
//   } else {
//     res.status(500).json('Error in posting note');
//   }
// });

// app.post('/api/notes', (req, res) => {

//   console.info(`${req.method} Note posted`);

//   const { title, note } = req.body;

//   if (title && note) {
//     const newNote = {
//       titel,
//       note,
//       review_id: helper(),
//     };

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('There was an error posting your note');
//   }

// });
