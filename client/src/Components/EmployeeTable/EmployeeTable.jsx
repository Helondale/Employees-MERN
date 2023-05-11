import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import "../EmployeeForm/EmployeeForm";
import PresentForm from "../../Pages/Present";




const EmployeeTable = ({ employees, onDelete }) => {

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
            <th>Level</th>
            <th>Position</th>
            <th>Equipment</th>
            <th>
              <Link to="/missing">
                <button type="button">Missing</button>
              </Link>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>
                <PresentForm
                  present={employee.present}
                  id={employee._id}
                />
              </td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{employee.equipment ? employee.equipment.name : null}</td>
              <td>{employee.equipment ? employee.equipment.type : null}</td>
              <td>{employee.equipment ? employee.equipment.amount : null}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
                <Link to={`/employee/notes/${employee._id}`}>
                  <button type="button">Notes</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

