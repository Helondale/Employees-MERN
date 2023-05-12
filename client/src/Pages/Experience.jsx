import { useState } from "react";
import { useParams } from "react-router-dom";


const Experience = () => {
    const [inputExperience, setInputExperience] = useState(null);
    const { experience } = useParams();

    const handleExperience = () => {
        fetch(`http://localhost:8080/years-of-experience/${experience}`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ experience: inputExperience }),
        })
            .then((response) => response.json())
            .then((employeeExperience) => {
                setInputExperience(employeeExperience);
            });

    };
    return (
        <div>
            <input
                value={inputExperience}
                name="experience"
                id="experience"
                onChange={(e) => handleExperience(e.target.value)}
            >
            </input>
        </div>

    )
}


export default Experience;