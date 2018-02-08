console.log('starting notes.js');
const fs = require('fs');

/**
 * [fetchNotes fetches all the notes saved in the file]
 * @return {[array]} [List of all notes saved in the notes-data.json]
 */
const fetchNotes = () => {
  try {
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch(e) {
    return [];
  }
};

/**
 * [saveNotes prints a list of notes to file]
 * @param  {[array]} notes [list of notes to save to file]
 * @return {[null]}
 */
const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

/**
 * [addNote adds a new note to a list of notes]
 * @param {[string]} title [title of the note]
 * @param {[type]} body  [body of the note]
 */
const addNote = (title, body) => {
  let notes = fetchNotes();
  const note = {
    title,
    body
  }

  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
    console.log('Adding note', title, body);
  } else {
      console.log(`A note with the title ${title} already exists`);
  }

};

/**
 * [getAll fetches all the notes saved]
 * @return {[Array]} [list of all notes]
 */
const getAll = () => {
  notes = fetchNotes();
  return notes;
};

/**
 * [readNote retrieves a single note]
 * @param  {[string]} title [title of note to be retrived]
 * @return {[object]}       [Object containing title and body of the note]
 */
const readNote = (title) => {
  let notes = fetchNotes();
  note = notes.filter((note) => note.title === title);
  return note[0];
};

/**
 * [removeNote description]
 * @param  {[string]} title [title of note to be removed]
 * @return {[boolean]}       [check of length of notes array]
 */
const removeNote = (title) => {
  let notes = fetchNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  saveNotes(newNotes);
  return notes.length !== newNotes.length;
};

/**
 * [logNotes description]
 * @param  {[Object]} note [object containing note title and body]
 * @return {[type]}      [description]
 */
const logNotes = (note) => {
  console.log('--------------');
  console.log(`title: ${note.title}`);
  console.log(`body: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote,
  logNotes
};
