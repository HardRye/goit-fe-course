class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    return this._notes.find(el => el.id === id)
  }

  saveNote(note) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._notes.push(note);
        localStorage.setItem("_notes", JSON.stringify(this._notes));
        resolve(note);
      }, 100)
    })
  }

  deleteNote(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this._notes.indexOf(this.findNoteById(id));
        this._notes.splice(index, 1);
        localStorage.setItem("_notes", JSON.stringify(this._notes));
      }, 100)
    })
  }

  updateNoteContent(id, updatedContent) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.findNoteById(id)) {
          resolve(Object.assign(this.findNoteById(id), updatedContent));
        }
      }, 100)
    })
  }

  updateNotePriority(id, priority) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedNote = this.findNoteById(id);
        updatedNote.priority = priority;
        resolve(updatedNote);
      }, 100)
    })
  }

  filterNotesByQuery(query) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this._notes.filter(el => el.title.toLowerCase().includes(query.toLowerCase()) || el.body.toLowerCase().includes(query.toLowerCase())))
      }, 100)
    })
  }

  filterNotesByPriority(priority) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this._notes.filter(el => el.priority === priority));
      }, 100);
    })
  }
}

export { Notepad };