    import { useState, useEffect } from "react";
    import { useParams } from "react-router-dom";


    const Experience = () => {
        const [experience, setExperience] = useState(null)
        const [inputExperience, setInputExperience] = useState("");
        const { experienceId } = useParams();


        useEffect(() => {
            fetch(`http://localhost:8080/years-of-experience/${experienceId}`, {
                headers: { "Content-Type": "application/json" },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Failed to fetch employee data");
                })
                .then(experienceData => {
                    setExperience(experienceData);
                })
                .catch(error => {
                    console.error(error);
                });
        }, [experienceId]);

        const handleExperience = async () => {
            try {
              const experienceValue = parseInt(inputExperience); 
              if (isNaN(experienceValue)) {
                console.log("Invalid experience value");
                return;
              }
        
              const response = await fetch(
                `http://localhost:8080/years-of-experience/${experienceId}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ experience: experienceValue }),
                }
              );
              if (response.ok) {
                console.log("Experience updated successfully");
              } else {
                console.log("Failed to update experience");
              }
            } catch (error) {
              console.log(error);
            }
          };
            return (
                <div className="control">
                  <label htmlFor="experience">Years of experience:</label>
                  <input
                    type="number"
                    value={inputExperience}
                    onChange={(e) => {
                      setInputExperience(e.target.value);
                      handleExperience(); 
                    }}
                  />
                </div>
              );
    };



    export default Experience;