// Importing router
const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    // Read the db.json file
    const notes = readNotes();
    // Return as JSON data
    res.json(notes);
});

router.post('/', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    saveNote(newNote);
    res.json({message: 'Note saved successfully!'});
});

router.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// Reads notes from db.json and parses JSON data
function readNotes() {
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    return JSON.parse(data);
}

// Saves a new note by reading the existing notes, adding the new note, and writing the updated array back to db.json
function saveNote(note) {
    const notes = readNotes();
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2));
}

module.exports = router;