import { useState } from "react";

//A form helyett stateket használva könnyebb az equipment objectet kezelni és elmenteni
const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [level, setLevel] = useState([])
  const [position, setPosition] = useState ([])
  const [name, setName] = useState([])
  //
  const [equipment, setEquipment] = useState({})

  const onSubmit = (e) => {
    e.preventDefault();
    const employeeData = {level, position, name, equipment}
    onSave(employeeData)
  }



  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
          onChange={e => setLevel(e.target.value)}
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
          onChange={e => setPosition(e.target.value)}
        />
      </div>

      <div className="select-container">
          <select>
            {employee.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

     <div className ="control">
     <label htmlFor="equipment">Equipment:</label>
        <input
          defaultValue={employee ? employee.equipment : null}
          name="equipment"
          id="equipment"
          onChange={e => setEquipment(e.target.value)} 
        /> 
     </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
