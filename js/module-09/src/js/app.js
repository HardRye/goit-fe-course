'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

////////////////////////////////////////////////////////

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    for (let el of this._notes) {
      if (id === el.id) return el;
    }
  }

  saveNote(note) {
    this._notes.push(note);
    return note;
  }

  deleteNote(id) {
    const index = this._notes.indexOf(this.findNoteById(id));
    this._notes.splice(index, 1);
  }

  updateNoteContent(id, updatedContent) {
    if (this.findNoteById(id)) {
      return Object.assign(this.findNoteById(id), updatedContent);
    }
  }

  updateNotePriority(id, priority) {
    const updatedNote = this.findNoteById(id);
    updatedNote.priority = priority;
    return updatedNote;
  }

  filterNotesByQuery(query) {
    const queryNotes = [];
    for (let el of this._notes) {
      const strTitle = el.title.toLowerCase();
      const strBody = el.body.toLowerCase();
      if (strTitle.includes(query.toLowerCase()) || strBody.includes(query.toLowerCase())) queryNotes.push(el);
    }
    return queryNotes;
  }

  filterNotesByPriority(priority) {
    const priorityNotes = [];
    for (let el of this._notes) {
      if (priority === el.priority) priorityNotes.push(el);
    }
    return priorityNotes;
  }

}

////////////////////////////////////////////////////////

const notepad = new Notepad(initialNotes);

function createNoteContent(title, body) {
  let noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  let noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  let noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;

  noteContent.append(noteTitle);
  noteContent.append(noteBody);

  return noteContent;
}

function createActionButton(action, type) {
  let btn = document.createElement('button');
  btn.classList.add('action');
  btn.dataset.action = action;

  let icon = document.createElement('i');
  icon.classList.add('material-icons', 'action__icon');
  icon.textContent = type;

  btn.append(icon);

  return btn;
}

function createNoteFooter(priority) {
  let noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  let noteSection = document.createElement('section');
  noteSection.classList.add('note__section');

  let noteSection2 = noteSection.cloneNode(true);

  let notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${priority}`

  noteSection.append(createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY, ICON_TYPES.ARROW_DOWN), createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY, ICON_TYPES.ARROW_UP), notePriority);

  noteSection2.append(createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT), createActionButton(NOTE_ACTIONS.DELETE, ICON_TYPES.DELETE));

  noteFooter.append(noteSection, noteSection2);

  return noteFooter;
}

function createListItem({ id, title, body, priority }) {

  let noteListItem = document.createElement('li');
  noteListItem.classList.add('note-list__item');
  noteListItem.dataset.id = id;
  let noteWrapper = document.createElement('div');
  noteWrapper.classList.add('note');
  noteWrapper.append(createNoteContent(title, body), createNoteFooter(priority));
  noteListItem.append(noteWrapper);
  return noteListItem;
}

function renderNoteList(listRef, notes) {
  let listNotes = notes.map(note => createListItem(note));
  listRef.append(...listNotes);
}

let rootNode = document.querySelector('.note-list');

renderNoteList(rootNode, notepad.notes);


/////////////////////
// module 09 

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

// REFERRALS
const refs = {
  form: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
  searchForm: document.querySelector('form.search-form'),
}

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
    id: generateUniqueId(),
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
