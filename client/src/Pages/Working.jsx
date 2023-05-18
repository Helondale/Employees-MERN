import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

const Working = () => {
    const [workingMode, setWorkingMode] = useState("");
    const [workingHour, setWorkingHour] = useState(null);
    //const[inputWorkingMode, setInputWorkingMode] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/employee/working/${id}`, {
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                //throw response;
            })
            .then(workingData => {
                //setWorking(Object.values(workingData).map(data => type.type))
                //setWorking(workingData)
               
            })
            .catch(error => {
                console.error(error)
            })
    }, [id]);


const workingHandler = () => {
    fetch(`http://localhost:8080/employee/working/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            hours: workingHour,
            mode: workingMode
        })

    })
        .then(response => {
            response.json()
                .then(employeeWorking => {
                 


                })

        })

}
    return (
        <div>
            <div className="control">
                <h2>Working mode:</h2>
                <input
                    value={workingMode}
                    type="text"
                    name="working"
                    id="working"
                    onChange={e => setWorkingMode(e.target.value)}
                    
                />
                <button type="button" onClick={workingHandler()}>Send</button>
            </div>

            <div className="control">
                <h2>Working hour:</h2>
                <input
                    type="number"
                    name="working"
                    id="working"
                    onChange={e => setWorkingHour(e.target.value)}
                />
                 <button type="button" onClick={workingHandler()}>Send</button>
            </div>
        </div>
    )
};

export default Working;






