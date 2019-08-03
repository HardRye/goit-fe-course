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
notepad.notes
  .then(initalNotes => renderNoteList(refs.noteList, initalNotes))
  .catch(console.log)




////// HANDLERS

// form submit handler and render new note
function handleSubmitForm(event) {
  event.preventDefault();
  let [title, body] = document.querySelectorAll('.note-editor__input');
  if (!title.value || !body.value) {
    return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  }

  notepad.saveNote({
    title: title.value,
    body: body.value,
    priority: PRIORITY_TYPES.LOW,
  })
    .then(savedNote => {
      renderNoteList(refs.noteList, [savedNote]);
      notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
      MicroModal.close("note-editor-modal");
      event.target.reset();
    })
    .catch(console.log)
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
function filterNotes(event) {
  refs.noteList.innerHTML = '';
  notepad.filterNotesByQuery(event.target.value)
    .then(result => renderNoteList(refs.noteList, result))
    .catch(console.log)
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



/*
refs.noteList.addEventListener('click', editListItem);
function editListItem({ target }) {
  if (target.nodeName === "I" && target.closest('.action').dataset.action === 'edit-note') {
    notepad.updateNoteContent(target.closest('.note-list__item').dataset.id, { title: 'updated', body: 'updated' });
  } else {
    return;
  }
}

refs.noteList.addEventListener('click', editPriority);
function editPriority({ target }) {
  if (target.nodeName === "I" && target.closest('.action').dataset.action === 'increase-priority') {
    notepad.updateNoteContent(target.closest('.note-list__item').dataset.id, { priority: 2 });
  } else {
    return;
  }
}
*/