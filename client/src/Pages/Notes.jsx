import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NotesForm = () => {
    const [notes, setNotes] = useState([]);
    const [inputNote, setInputNote] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/employee/notes/${id}`, {
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(noteData => {
                setNotes(noteData)
            })
            .catch(error => {
                console.error(error)
            })
    }, [id]);

    const handleAddNote = () => {
    fetch(`http://localhost:8080/employee/notes/${id}`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({notes: inputNote})
    })
    .then(response => {
        response.json()
        .then(employeeNote => {
            setNotes(employeeNote)
        })

    })
    };

    return (
        <div className="control">
            <label htmlFor="notes">Notes:</label>
            {notes.length > 0 ? notes.map((note, index) => {
             return <p key={index}>{note}</p>   
            }) : <p>This user haven't got any note</p> }
            <input
                value={inputNote}
                name="note"
                id="note"
                onChange={e => setInputNote(e.target.value)}
            />  
            <button onClick={handleAddNote}>Set notes</button>
        </div>
    )
};

export default NotesForm;