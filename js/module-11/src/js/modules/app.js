////// My JS imports
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES } from '../utils/constants';
import { Notepad } from './notepad-model';
import initialNotes from '../../assets/notes.json';
import renderNoteList from './view-template';


////// NPM Modules
//shortid
const shortid = require('shortid');
//notyf
import { Notyf } from 'notyf';
const notyf = new Notyf();
import 'notyf/notyf.min.css';
//micromodal
import MicroModal from 'micromodal';


////// REFERRALS
const refs = {
  form: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
  searchForm: document.querySelector('form.search-form'),
  modalForm: document.querySelector('button[data-action="open-editor"]')
}


// initializing notepad
const notepad = new Notepad(initialNotes);

// rendering initialNotes
renderNoteList(refs.noteList, notepad.notes);


////// HANDLERS

// form submit handler  
function handleSubmitForm(event) {
  event.preventDefault();
  let [title, body] = document.querySelectorAll('.note-editor__input');
  if (!title.value || !body.value) {
    // return alert(`Необходимо заполнить все поля!`);
    return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  }

  let newNote = notepad.saveNote({
    id: shortid.generate(),
    title: title.value,
    body: body.value,
    priority: PRIORITY_TYPES.LOW,
  });

  renderNoteList(refs.noteList, [newNote]);
  notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
  MicroModal.close("note-editor-modal");
  event.target.reset();
}

// delete note handler
function removeListItem(event) {
  if (event.target.closest('.action').dataset.action === 'delete-note') {
    notepad.deleteNote(event.target.closest('.note-list__item').dataset.id);
    event.target.closest('.note-list__item').remove();
    notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
  } else {
    return;
  }
}

// filter notes handler
function filterNotes(event) {
  refs.noteList.innerHTML = '';
  renderNoteList(refs.noteList, notepad.filterNotesByQuery(event.target.value));
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
refs.searchForm.addEventListener('input', filterNotes);
refs.modalForm.addEventListener('click', openModal);