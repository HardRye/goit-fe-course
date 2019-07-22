
// TEMPLDATES
import noteTemplate from '../../templates/note.hbs'

function renderNoteList(listRef, notes) {
  let listNotes = notes.map(note => noteTemplate(note));
  listRef.insertAdjacentHTML('beforeend', listNotes.join(''))
}

export default renderNoteList; 