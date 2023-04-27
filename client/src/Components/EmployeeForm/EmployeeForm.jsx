import { useState, useEffect } from "react";


const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [level, setLevel] = useState(employee ? employee.level : null)
  const [position, setPosition] = useState(employee ? employee.position : null)
  const [name, setName] = useState(employee ? employee.name : null)

  const [equipmentName, setEquipmentName] = useState(employee && employee.equipment ? employee.equipment.name : "")
  const [equipmentType, setEquipmentType] = useState(employee && employee.equipment ? employee.equipment.type : "")
  const [equipmentAmount, setEquipmentAmount] = useState(employee && employee.equipment ? employee.equipment.amount : null)
  const [propertyEquipmentType, setPropertyEquipmentType] = useState([])



  const onSubmit = (e) => {
    e.preventDefault();
    const employeeData = { level, position, name, equipment: { name: equipmentName, type: equipmentType, amount: equipmentAmount }, _id: employee ? employee._id : undefined }
    onSave(employeeData)
  }

  useEffect(() => {
    fetch('http://localhost:8080/api/types/', {
      headers: { "Content-Type": "application/json" },
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      })
      .then(equipmentType => {
        setPropertyEquipmentType(Object.values(equipmentType).map(type => type.type))
      })
      .catch(error => {
        console.error(error)
      })
  }, [])


  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          name="name"
          id="name"
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          name="level"
          id="level"
          onChange={e => setLevel(e.target.value)}
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          name="position"
          id="position"
          onChange={e => setPosition(e.target.value)}
        />
      </div>


      <div className="control">
        <label htmlFor="equipment">Equipment Name:</label>
        <input
          value={equipmentName}
          name="equipment"
          id="equipment"
          onChange={e => setEquipmentName(e.target.value)}
        />
        <label htmlFor="equipmentType">Equipment Type:</label>
        <select
          value={equipmentType}
          onChange={e => setEquipmentType(e.target.value)}
          name="equipmentType"
          id="equipmentType"
        >
          {propertyEquipmentType.map((option, i) => (
            <option key={i} value={option.value}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="equipment">Equipment Amount:</label>
        <input
          value={equipmentAmount}
          name="equipment"
          id="equipment"
          onChange={e => {
            const value = e.target.value;
            const parsedValue = parseInt(value);
            if (!isNaN(parsedValue)) {
              setEquipmentAmount(parsedValue);
            } else {
              setEquipmentAmount(value);
            }
          }}
          type="number"
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
