// import { useState, useEffect } from "react"
// import SingleNote from "../components/Note";
// import Notification from "../components/Notification";
// import Footer from "../components/Footer";
// import noteService from '../service/notes'


// const Note = () => {
//   const [notes, setNotes] = useState([])
//   const [newNote, setNewNote] = useState('')
//   const [showAll, setShowAll] = useState(true)
//   const [errorMessage, setErrorMessage] = useState(null)

//   useEffect(() => {
//     noteService
//         .getAll()
//         .then(initialNotes => {
//           setNotes(initialNotes)
//         })
//   }, [])

//   const addNote = (e) => {
//     e.preventDefault()
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: notes.length + 1
//     }
//     noteService
//       .create(noteObject)
//       .then(returnedNote => {
//         setNotes(notes.concat(returnedNote))
//         setNewNote('')
//       })
//     // setNotess((prevNotes) => [...prevNotes, noteObject])
//     // setNewNote(' ')
//   }

//   const toggleImportanceOf = id => {
//     const note = notes.find(n => n.id === id)
//     const changedNote = {...note, import: !note.important}

//     noteService
//         .update(id, changedNote)
//         .then(returnedNote => {
//           setNotes(notes.map(note => note.id !== id ? note : returnedNote))
//         })
//         .catch(error => {
//           setErrorMessage(`Note ${note.content} was already removed from server`)
//           setTimeout(() => {
//             setErrorMessage(null)
//           }, 5000)
//         })
//   }

//   const handleNoteChange = (e) => {
//     setNewNote(e.target.value)
//   }

//   const notesToShow = showAll ? notes : notes.filter(note => note.important)

//   return (
//     <>
//       <h1>Notes</h1>
//       <Notification message={errorMessage} />
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           Show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {
//           notesToShow.map(note => (
//             <SingleNote 
//                 key={note.id}
//                 note={note}
//                 toggleImportance={() => toggleImportanceOf(note.id)}
//             />
//           ))
//         }
//       </ul>
//       <form onSubmit={addNote}>
//         <input
//           value={newNote}
//           onChange={handleNoteChange}
//         />
//         <button type='submit'>save</button>
//       </form>
//       <Footer />
//     </>
//   )
// }

// export default Note