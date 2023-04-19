import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};



const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [positionFilter, setPositionFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" })
    .then((res) =>
      setEmployees(employees.filter(x => id !== x._id))
    );
  };


  const handleDelete = (id) => {
    deleteEmployee(id);
  };

  const handleClick = () => {
  employees.map(employee => console.log(employee.position))  


  }

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Filter by Position"
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          
        />
        <input
          type="text"
          placeholder="Filter by Level"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        />
        <button onClick={handleClick}>Search</button>
      </div><EmployeeTable employees={employees} onDelete={handleDelete}
      />
    </>
    )
};

export default EmployeeList;
