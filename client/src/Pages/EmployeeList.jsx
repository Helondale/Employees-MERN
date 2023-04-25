import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};



const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [positionFilter, setPositionFilter] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
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

  const handleSearch = () => {
    setFilteredEmployees(employees.filter(employee => employee.position.toLowerCase().includes(positionFilter.toLowerCase()) && employee.level.toLowerCase().includes(levelFilter.toLowerCase())))
  }

  const handleSortByFirstName = () => {
    setFilteredEmployees([...filteredEmployees.sort((a, b) => {
      const aFirstName = a.name.split(' ')[0]
      const bFirstName = b.name.split(' ')[0]
      if (aFirstName === bFirstName) {
        return 0
      }
      if (aFirstName > bFirstName) {
        return 1
      } else {
        return -1
      }
    }
    )])
  };

  const handleSortByMiddleName = () => {
    setFilteredEmployees([...filteredEmployees.sort((a, b) => {
      const aNameParts = a.name.split(' ');
      const bNameParts = b.name.split(' ');
      const aMiddleName = aNameParts[1];
      const bMiddleName = bNameParts[1];

      if (aNameParts.length < 3 || bNameParts.length < 3) {
        return a.name.localeCompare(b.name);
      }

      if (aMiddleName === bMiddleName) {
        return 0;
      }
  
      if (aMiddleName > bMiddleName) {
        return 1;
      } else {
        return -1;
      }
    })]);
  };

  const handleSortByLastName = () => {
    setFilteredEmployees([...filteredEmployees.sort((a, b) => {
      const aLastName = a.name.split(' ')[a.name.split(' ').length - 1];
      const bLastName = b.name.split(' ')[b.name.split(' ').length - 1];
  
      if (aLastName === bLastName) {
        return 0;
      }
  
      if (aLastName > bLastName) {
        return 1;
      } else {
        return -1;
      }
    })]);
  };

  const handleSortByPosition = () => {
    setFilteredEmployees([...filteredEmployees.sort((a, b) => {
      const aPosition = a.position
      const bPosition = b.position
      if (aPosition === bPosition) {
        return 0
      }
      if (aPosition > bPosition) {
        return 1
      } else {
        return -1
      }
    }
    )])
  }

  const handleSortByLevel = () => {
    setFilteredEmployees([...filteredEmployees.sort((a, b) => {
      const aLevel = a.level
      const bLevel = b.level
      if (aLevel === bLevel) {
        return 0
      }
      if (aLevel > bLevel) {
        return 1
      } else {
        return -1
      }
    }
    )])
  }

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        setFilteredEmployees(employees);
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
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleSortByFirstName}>First Name</button>
        <button onClick={handleSortByMiddleName}>Middle Name</button>
        <button onClick={handleSortByLastName}>Last Name</button>
        <button onClick={handleSortByPosition}>Position Sort</button>
        <button onClick={handleSortByLevel}>Level Sort</button>
      </div><EmployeeTable employees={filteredEmployees} onDelete={handleDelete}
      />
    </>
  )
};

export default EmployeeList;
