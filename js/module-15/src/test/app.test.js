const expect = require('chai').expect;
import Notepad from '../index';


const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: Notepad.Priority.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: Notepad.Priority.NORMAL,
  },
];

describe('Class Notepad', function () {
  let notepad;

  beforeEach(() => {
    notepad = new Notepad(initialNotes);
  })

  afterEach(() => {
    notepad._notes = [];
  })

  it('get notes', () => {
    expect(notepad.notes).to.be.an('array');
    expect(notepad.notes).to.equal(initialNotes);
  })

  it('finds note by id', function () {
    const result = notepad.findNoteById('id-1');
    expect(result).to.be.a('object');
    expect(result).to.have.property('body')
    expect(result).contain({
      id: 'id-1',
      title: 'JavaScript essentials',
      body:
        'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
      priority: Notepad.Priority.HIGH,
    })
  })

  it('not finds note by id', function () {
    const result = notepad.findNoteById('id-5');
    expect(result).to.be.an('undefined');
  })

  it('save new notes', () => {
    notepad.saveNote({
      id: 'id-3',
      title: 'Get comfy with Frontend frameworks',
      body:
        'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
      priority: Notepad.Priority.NORMAL,
    });
    notepad.saveNote({
      id: 'id-4',
      title: 'Winter clothes',
      body:
        "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
      priority: Notepad.Priority.LOW,
    });

    expect(notepad.notes).to.be.an('array');
    expect(notepad.notes.length).equal(4);
    expect(notepad.notes).to.deep.include({
      id: 'id-3',
      title: 'Get comfy with Frontend frameworks',
      body:
        'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
      priority: Notepad.Priority.NORMAL,
    });
  })

  it('updates priority', () => {
    notepad.updateNotePriority('id-4', Notepad.Priority.NORMAL);
    notepad.updateNotePriority('id-3', Notepad.Priority.LOW);
    expect(notepad.findNoteById('id-4').priority).equal(1);
    expect(notepad.findNoteById('id-3').priority).equal(0);
  })

  it('filter notes by key word', () => {
    const resultHTML = notepad.filterNotesByQuery('html');
    const resultJS = notepad.filterNotesByQuery('javascript');
    expect(resultHTML).to.be.an('array');
    expect(resultJS).to.be.an('array');
    expect(resultHTML.length).equal(1);
    expect(resultJS.length).equal(2);
  })

  it('filter notes by priority', () => {
    const result = notepad.filterNotesByPriority(Notepad.Priority.NORMAL);
    expect(result).to.be.an('array');
    expect(result.length).equal(2);
  })

  it('updates note content', () => {
    notepad.updateNoteContent('id-3', {
      title: 'Get comfy with React.js or Vue.js',
    });
    const result = notepad.findNoteById('id-3');
    expect(result.title).to.be.a('string');
    expect(result.title).equal('Get comfy with React.js or Vue.js')
  })

  it('deletes note', () => {
    notepad.deleteNote('id-2');
    const result = notepad.findNoteById('id-2');
    expect(result).to.be.an('undefined');
    expect(notepad.notes.length).equal(3);
  })
})


