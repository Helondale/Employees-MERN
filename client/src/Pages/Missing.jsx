import { useState, useEffect } from "react";

const Missing = () => {
    const [missing, setMissing] = useState([])

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
    }, [missing])


    return (
        <div className="control">
            <label>Missing:</label>
            {missing.map((employee, index) => {
                return <p key={index}>{employee.name}</p>
            })}

        </div>

    )
}

export default Missing;