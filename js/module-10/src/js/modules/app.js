// JS imports
import { PRIORITY_TYPES } from '../utils/constants';
import { Notepad } from './notepad-model';
import { createListItem, renderNoteList } from './view';

import initialNotes from '../../assets/notes.json';

// Modules
const shortid = require('shortid');
// console.log(shortid.generate());


const notepad = new Notepad(initialNotes);

// REFERRALS
const refs = {
  form: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
  searchForm: document.querySelector('form.search-form'),
}

// render initialNotes
renderNoteList(refs.noteList, notepad.notes);


// HANDLERS
// form submit handler
function addListItem(listRef, note) {
  listRef.append(createListItem(note));
}

function handleSubmitForm(event) {
  event.preventDefault();
  let [title, body] = document.querySelectorAll('.note-editor__input');
  if (!title.value || !body.value) {
    return alert(`Необходимо заполнить все поля!`);
  }

  let newNote = notepad.saveNote({
    id: shortid.generate(),
    title: title.value,
    body: body.value,
    priority: PRIORITY_TYPES.LOW,
  });
  addListItem(refs.noteList, newNote);
  event.target.reset();
}

// delete note handler
function removeListItem(event) {
  if (event.target.closest('.action').dataset.action === 'delete-note') {
    notepad.deleteNote(event.target.closest('.note-list__item').dataset.id);
    event.target.closest('.note-list__item').remove();
  } else {
    return;
  }
}

// filter notes handler
function filterNotes(event) {
  refs.noteList.innerHTML = '';
  renderNoteList(refs.noteList, notepad.filterNotesByQuery(event.target.value));
}

// LISTENERS
refs.form.addEventListener('submit', handleSubmitForm);
refs.noteList.addEventListener('click', removeListItem);
refs.searchForm.addEventListener('input', filterNotes);
