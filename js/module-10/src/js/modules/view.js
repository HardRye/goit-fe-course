import { ICON_TYPES, NOTE_ACTIONS } from '../utils/constants';

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

export { createNoteContent, createActionButton, createListItem, renderNoteList };