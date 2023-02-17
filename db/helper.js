const fs = require('fs');
const util = require('util');

const readFromFile = () => {
  var jsonTxt= fs.readFileSync('db/db.json', 'utf8');
  return jsonTxt;
}

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile('db/db.json', parsedData);
    }
  });
};

const deleteNote = (id) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const deletedNote = parsedData.filter(note => note.id != id);
      parsedData.push(deletedNote);
      writeToFile('db/db.json', parsedData);
    }
  });
}

module.exports = { readFromFile, writeToFile, readAndAppend, deleteNote };