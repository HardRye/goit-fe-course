const URL = 'http://localhost:3000/notes'

// export function getNotes() {
//   return fetch(URL)
// .then(responce => {
//   if (responce.ok) {
//     return responce.json();
//   }
//   throw new Error('Error while fetching' + responce.statusText)
// })
// }


// GET
export function getNotes() {
  return fetch(URL)
    .then(responce => {
      if (responce.ok) {
        return responce.json();
      }
      throw new Error('Error while fetching' + responce.statusText)
    })
}

// POST
export function saveNote(note) {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  }
  return fetch(URL, options)
    .then(responce => {
      if (responce.ok) {
        return responce.json();
      }
      throw new Error('Error while fetching' + responce.statusText)
    })
}

// DELETE
export function deleteNote(id) {
  const options = {
    method: "DELETE"
  }
  return fetch(`${URL}/${id}`, options)
    .then(responce => {
      if (responce.ok) {
        return responce.json();
      }
      throw new Error('Error while fetching' + responce.statusText)
    })
}

// PATCH 
export function updateNoteContent(id, newContentObj) {
  const options = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newContentObj)
  }
  return fetch(`${URL}/${id}`, options)
    .then(responce => {
      if (responce.ok) {
        return responce.json();
      }
      throw new Error('Error while fetching' + responce.statusText)
    })
}

