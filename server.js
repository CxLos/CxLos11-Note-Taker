// variables
const express = require('express');
const path = require('path');
const routes = require('./routes/notes');

//
const app = express();
const PORT = 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', routes);

// Get route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// get route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Porting
app.listen(PORT, () =>
  console.log(`We are now live listening at http://localhost:${PORT}!`)
);