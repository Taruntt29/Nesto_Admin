import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import { useEffect, useState } from "react";
import "./PropertyList.css";

// import { getAPI } from "../../../Api/ApiRequest";
// import { apiEndpoints } from "../../../Api/ApiEndpoint";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
let input = "";

const PropertyList = () => {
  //  const [data1, setData1] = useState([]);
  //   useEffect(() => {
  //     const getVisit = async () => {
  //       const response = await getAPI(apiEndpoints.getAllVisit);
  //       console.log(response.data);

  //       setData1(response.data);
  //       setFilterData(response.data);
  //     };

  //     getVisit();
  //   }, []);

  // const tabelData = Data.map((itm, index) => (
  //   <OnboardList itm={itm} className={"mb-3 py-3 border rounded"} />
  // ));

  // const table = (
  // const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  //    const propertyData = arr.map((itm,index) => (
  //     <tr>
  //          <th><input type="checkbox" /></th>
  //          <td>{index+1}</td>
  //       <td style={{color:"#0686E1"}}>Sky Dandelions</td>
  //       <td> Under Construction</td>
  //       <td style={{color:"#0686E1"}}>2 BHK</td>
  //       <td> Sec-29 Gurugram</td>
  //       <td style={{color:"#0686E1"}}>12</td>
  //       <td style={{color:"#D12953"}}>-Rs.270.00</td>
  //       <td style={{color:"#D12953"}}>-Rs.270.00</td>
  //       <td>
  //       <Form.Check type="switch" id="custom-switch" />
  //     </td>
  //     </tr>
  //   ));

  const gridRef = useRef();
  const externalFilterChanged = useCallback((e) => {
    input = e.target.value;
    gridRef.current.api.onFilterChanged();
  }, []);
  const isExternalFilterPresent = useCallback(() => {
    return input !== "";
  }, []);
  const doesExternalFilterPass = (node) => {
    if (node?.data) {
      return (
        node.data.completed === input ||
        node.data.id.toString().includes(+input) ||
        node.data.title.includes(input) ||
        node.data.userId.toString().includes(+input)
      );
    }
    return true;
  };
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", checkboxSelection: true, headerCheckboxSelection: true },
    { field: "title" },
    { field: "userId" },
    { field: "completed" },
  ]);
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
  }));
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);
  const onGridReady = () => {
    console.log("TABLE IS READY");
  };

  return (
    <>
      {/* <div className="table-responsive p-2">
      <Table striped bordered hover  >
        <thead>
          <tr style={{color:"#BABABA"}}>
          <th><input type="checkbox" /></th>
          <th>#</th>
            <th>NAME OF PROPERTY</th>
            <th>CONSTRUCTION STATUS</th>
            <th>PROPERTY TYPE</th>
            <th>LOCATION</th>
            <th>NUMBER OF VISITS</th>
            <th>PRICE  </th>
            <th>BROKERAGE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>{propertyData}</tbody>
      </Table>
    
      </div> */}
      <input onChange={externalFilterChanged} />
      <div className="ag-theme-alpine">
        <AgGridReact
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
        />
      </div>
    </>
  );
};

export default PropertyList;
