import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import './App.css';

export default function App() {
    const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("n"))  || [])

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0]?.id) || ""
    )
    
    const findCurrentNote = notes.find(note => note.id === currentNoteId) || notes[0]

    React.useEffect(() => {
        localStorage.setItem("n",JSON.stringify(notes))
    },[notes])
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        // This rearranges the notes whenever a new note is updated it goes to the top of the array
        setNotes(oldNotes => {
            const newarr=[];
            for (let i = 0; i < oldNotes.length; i++) {
                let oldNote = oldNotes[i]
                if (oldNote.id === currentNoteId) {
                    newarr.unshift({ ...oldNote, body: text })
                }
                else{newarr.push(oldNote)}
            }
            return newarr
        })
    }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes((oldNote)=> oldNote.filter(note => note.id !== noteId))
    }

    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}