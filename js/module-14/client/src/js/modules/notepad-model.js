import * as api from '../../services/api'

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  async notes() {
    try {
      const serverNotes = await api.getNotes();
      // console.log(serverNotes);
      this._notes.push(...serverNotes);
      return this._notes
    }
    catch (err) {
      throw err;
    }
  }

  findNoteById(id) {
    return this._notes.find(el => el.id === id)
  }

  async saveNote(note) {
    try {
      const responce = await api.saveNote(note);
      this._notes.push(responce);
      return responce;
    } catch (err) {
      throw err;
    }
  }

  async deleteNote(id) {
    try {
      const deleted = await api.deleteNote(id);
      const index = this._notes.indexOf(this.findNoteById(id));
      this._notes.splice(index, 1);
    }
    catch (err) {
      throw err;
    }
  }

  async updateNoteContent(id, updatedContent) {
    try {
      const updatedNote = await api.updateNoteContent(id, updatedContent);
      if (this.findNoteById(id)) {
        return Object.assign(this.findNoteById(id), updatedNote);
      }
    }
    catch (err) {
      throw err;
    }
  }

  async updateNotePriority(id, priority) {
    try {
      const updatedNote = await api.updateNoteContent(id, priority);
      return updatedNote;
    }
    catch (err) {
      throw err;
    }
  }

  async filterNotesByQuery(query) {
    try {
      const result = await new Promise((resolve, reject) => {
        const filteredNotes = this._notes.filter(el => el.title.toLowerCase().includes(query.toLowerCase()) || el.body.toLowerCase().includes(query.toLowerCase()));
        if (filteredNotes.length > 0) {
          resolve(filteredNotes)
        } else {
          reject('Sorry! No matches');
        }
      })
      return result;
    }
    catch (err) {
      throw err;
    }
  }

  async filterNotesByPriority(priority) {
    try {
      const result = await new Promise((resolve, reject) => {
        const filteredNotes = this._notes.filter(el => el.priority === priority);
        if (filteredNotes.length > 0) {
          resolve(filteredNotes)
        } else {
          reject('Sorry! No matches');
        }
      })
      return result;
    }
    catch (err) {
      throw err;
    }
  }
}

export { Notepad };