"use strict"

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
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
