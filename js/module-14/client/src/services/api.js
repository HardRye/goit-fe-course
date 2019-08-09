const URL = 'http://localhost:3000/notes'
import { Notyf } from 'notyf';
const notyf = new Notyf();

//GET
export async function getNotes() {
  try {
    const responce = await fetch(URL);
    const data = await responce.json()
    return data;
  } catch (err) {
    // console.dir(err)
    throw err;
  }
}


// POST
export async function saveNote(note) {
  try {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }
    const responce = await fetch(URL, options);
    const data = await responce.json()
    return data;
  } catch (err) {
    throw err;
  }
}

// DELETE
export async function deleteNote(id) {
  try {
    const options = {
      method: "DELETE"
    }
    const responce = await fetch(`${URL}/${id}`, options);
    const data = await responce.json()
    return data;
  } catch (err) {
    throw err;
  }
}

// PATCH 
export async function updateNoteContent(id, newContentObj) {
  try {
    const options = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newContentObj)
    }
    const responce = await fetch(`${URL}/${id}`, options);
    const data = await responce.json()
    return data;
  } catch (err) {
    throw err;
  }
}
