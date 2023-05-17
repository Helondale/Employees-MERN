import { useState } from "react";


const PresentForm = ({present, id}) => {
  const [isChecked, setIsChecked] = useState(present);

  

  const handlePresent = (isChecked) => {
    fetch(`http://localhost:8080/employee/present/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ present: isChecked }),
    })
      .then((response) => response.json())
      .then((employeePresent) => {
        setIsChecked(employeePresent);
      });

  };

  return (
    <div>
      <div className="control">
        <input
          type="checkbox"
          checked={isChecked}
          name="present"
          id="present"
          onChange={(e) => handlePresent(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default PresentForm;