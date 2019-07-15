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
    // reviewed code with array functional methods
    return this._notes.filter(el => el.title.toLowerCase().includes(query.toLowerCase()) || el.body.toLowerCase().includes(query.toLowerCase()))
  }

  filterNotesByPriority(priority) {
    // reviewed code with array functional methods
    return this._notes.filter(el => el.priority === priority);
  }

}

export { Notepad };