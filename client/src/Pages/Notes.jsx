import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

const NotesForm = () => {
    const [notes, setNotes] = useState([])
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
    }, [id])

    return (
        <div className="control">
             <label htmlFor="notes">Notes:</label>
             
        </div>
    )
}


export default NotesForm;