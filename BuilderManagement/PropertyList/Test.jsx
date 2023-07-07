import React, { useState } from "react";

function TableWithMultipleSearch() {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const data = [
    { id: 1, name: "John Doe", age: 30, country: "USA" },
    { id: 2, name: "Jane Doe", age: 25, country: "Canada" },
    { id: 3, name: "Bob Smith", age: 40, country: "Australia" },
    // add more data here
  ];

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm1.toLowerCase()) &&
      row.country.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm1}
        onChange={(e) => setSearchTerm1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by country"
        value={searchTerm2}
        onChange={(e) => setSearchTerm2(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableWithMultipleSearch;
