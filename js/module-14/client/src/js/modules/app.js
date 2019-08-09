////// MY JS IMPORTS
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES } from '../utils/constants';
import { Notepad } from './notepad-model';
import renderNoteList from './view-template';


////// NPM MODULES
// notyf
import { Notyf } from 'notyf';
const notyf = new Notyf();
import 'notyf/notyf.min.css';
// micromodal
import MicroModal from 'micromodal';
// debounce
const debounce = require('lodash/debounce');


////// REFERRALS
const refs = {
  form: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
  searchForm: document.querySelector('form.search-form'),
  modalForm: document.querySelector('button[data-action="open-editor"]')
}


////// INITIALIZING NOTEPAD AND RENDERING NOTES
const notepad = new Notepad();

async function renderNotepad() {
  try {
    const initalNotes = await notepad.notes();
    renderNoteList(refs.noteList, initalNotes);
  }
  catch (err) {
    throw notyf.error(`Server Error: ${err.message}`);
  }
};
renderNotepad();


////// HANDLERS

// form submit handler and render new note
async function handleSubmitForm(event) {
  event.preventDefault();
  try {
    let [title, body] = document.querySelectorAll('.note-editor__input');
    if (!title.value || !body.value) {
      return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
    }

    const savedNote = await notepad.saveNote({
      title: title.value,
      body: body.value,
      priority: PRIORITY_TYPES.LOW,
    });
    renderNoteList(refs.noteList, [savedNote]);
    notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
    MicroModal.close("note-editor-modal");
    event.target.reset();
  }
  catch (err) {
    throw notyf.error(`Server Error: ${err.message}`);
  }
}

// delete note handler
function removeListItem(event) {
  if (event.target.nodeName === "I" && event.target.closest('.action').dataset.action === 'delete-note') {
    notepad.deleteNote(event.target.closest('.note-list__item').dataset.id);
    event.target.closest('.note-list__item').remove();
    notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
  } else {
    return;
  }
}

// filter notes handler
async function filterNotes(event) {
  try {
    refs.noteList.innerHTML = '';
    const result = await notepad.filterNotesByQuery(event.target.value)
    renderNoteList(refs.noteList, result);
  }
  catch (err) {
    throw notyf.error(err);
  }
}

// open modal handler
function openModal(event) {
  if (event.target.closest('.action').dataset.action === "open-editor") {
    MicroModal.show("note-editor-modal")
  }
}


////// LISTENERS
refs.form.addEventListener('submit', handleSubmitForm);
refs.noteList.addEventListener('click', removeListItem);
refs.searchForm.addEventListener('input', debounce(filterNotes, 500));
refs.modalForm.addEventListener('click', openModal);



