import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecod = currentPage * recordsPerPage;
  const indexOfFirstRecod = indexOfLastRecod - recordsPerPage;
  const currentRecords = employeeData.slice(indexOfFirstRecod, indexOfLastRecod);
  const totalPages = Math.ceil(employeeData.length/recordsPerPage);

  function handlePrevious() {
    if(currentPage > 1)
    setCurrentPage(currentPage - 1);
  }

  function handleNext(){
    if(currentPage < totalPages)
    setCurrentPage(currentPage + 1);
  }

  async function fetchEmployeeData() {
    try{
      const data = await fetch(
        " https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const finalData = await data.json();
      console.log(finalData);
      setEmployeeData(finalData);
    }catch(error){
      console.error(error);
      alert(error);
    }
  }

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div>
      <div className="table-container">
        <h1>Employee Data Table</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevious} >Previous</button>
          <span>{currentPage}</span>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
