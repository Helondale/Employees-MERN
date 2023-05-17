import { useState, useEffect } from "react";

const Missing = () => {
    const [missing, setMissing] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/missing', {
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(missingData => {
                setMissing(missingData)
            })
            .catch(error => {
                console.error(error)
            })
    }, [missing]);

    return (
        <div className="control">
            <h1>Missing:</h1>
            {missing.map((employee, index) => {
                return <div>
                    <p key={index}><h3>Name:</h3>{employee.name} <h3>Position:</h3>{employee.position}</p>
                    <hr />
                </div>
            })}
        </div>
    )
};

export default Missing;