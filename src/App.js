import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./components/data"
import Split from "react-split"
import {nanoid} from "nanoid"
import './App.css';

export default function App() {
    const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("n"))  || [])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
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
        // Dosen't rearranges the notes
        // setNotes(oldNotes => oldNotes.map(oldNote => {
        //     return oldNote.id === currentNoteId? { ...oldNote, body: text }: oldNote
        // }))
    }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes((oldNote)=> oldNote.filter(note => note.id !== noteId))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
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
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
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