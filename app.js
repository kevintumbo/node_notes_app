console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs
  .command('add', 'add a new note', {
    title: {
      alias: 't',
      demand: true,
      describe: 'Title of the Note'
    },
    body: {
      alias: 'b',
      demand: true,
      describe: 'Body of the Note'
    }
  })
  .command('list', 'List all the notes saved.')
  .help()
  .argv;
console.log(argv);
const command = argv._[0];

if (command === "add") {
  let note = notes.addNote(argv.title, argv.body);
  if(note) {
    notes.logNotes(note)
  } else {
      console.log(`A note with the title ${note.title} already exists`);
  }
} else if (command === "list") {
  let allNotes = notes.getAll();
  allNotes.forEach((note) => notes.logNotes(note));
} else if (command === "read") {
  const selectedNote =  notes.readNote(argv.title);
  if (selectedNote) {
    notes.logNotes(selectedNote)
  }else {
    console.log('That note does not exist.');
  }
} else if (command === "remove") {
  const noteRemoved = notes.removeNote(argv.title);
  const message = noteRemoved ? `the note ${title} was removed`:'Note not found.'
  console.log(message);
} else {
  console.log('Sorry that command does not exist');
}
