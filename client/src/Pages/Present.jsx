import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PresentForm = () => {
  const [present, setPresent] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    console.log(id, "id itt");
    fetch(`http://localhost:8080/employee/present/${id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((presentData) => {
        setPresent(presentData.present);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handlePresent = (isChecked) => {
    fetch(`http://localhost:8080/employee/present/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ present: isChecked }),
    })
      .then((response) => response.json())
      .then((employeePresent) => {
        setPresent(employeePresent);
      });
  };

  return (
    <div>
      <div className="control">
        <input
          type="checkbox"
          checked={present}
          name="present"
          id="present"
          onChange={(e) => handlePresent(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default PresentForm;



/*<input
type= "checkbox"
checked={employee.present}
onChange={(e) =>
  (e.target.checked)
}
/>*/