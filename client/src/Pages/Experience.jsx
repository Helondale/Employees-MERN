import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const Experience = () => {
    const { experience } = useParams();
    const [fetchedData, setFetchedData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const parsedExperience = parseInt(experience)
            if (parsedExperience >= 0) {
                fetch(`http://localhost:8080/years-of-experience/${experience}`, {
                    headers: { "Content-Type": "application/json" },
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw response;
                    })
                    .then((fetchData) => {
                        if (Array.isArray(fetchData) && fetchData.length > 0) {
                            setFetchedData(fetchData);
                        } else {
                            throw new Error("Invalid API response");
                        }
                    })
                    .catch(error => {
                        console.error(error)
                    })
            } else {
                navigate("/")
            }
        }
        catch {
            navigate("/")
        }
    }, [experience, navigate]);

    return (
        <div className="control">
            <div>
                <h2>Employees with this experience:</h2>
                {
                    fetchedData.map((employee) => (
                        <div key={employee._id}>
                            <p>Name: {employee.name}</p>
                            <p>Level: {employee.level}</p>
                            <p>Position: {employee.position}</p>
                            <hr />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Experience;

