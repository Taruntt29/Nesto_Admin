import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const SoldProperty = (params, onClose) => {
  let selectedRowId = params.rowData._id;
  const gridRef = useRef();

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "ID",
      field: "",
    },
    { headerName: "BROKER ID", field: "_id" },
    { headerName: "BROKER NAME", field: "", filter: true },
    { headerName: "PROPERTY NAME ", field: "", filter: true },
    { headerName: "ADDRESS", field: "address" },
    { headerName: "UNIT TYPE", field: "unitType", filter: true },
    { headerName: "UNIT NUMBER", field: "unitNumber" },
    { headerName: "SELLING PRICE", field: "sellingPrice" },
    { headerName: "CLIENT NAME ", field: "customerName", filter: true },
    { headerName: "SELLING DATE", field: "" },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // useEffect(() => {
  //   // debugger;
  //   // console.log("Authorization:" `Bearer ${token}`)
  //   axios
  //     .get(
  //       "http://nestobackend-env.eba-fk3zufmz.ap-south-1.elasticbeanstalk.com/api/v1/boughtProperty/getBoughtPropertyById?id=" +
  //         `${selectedRowId}`,
  //       {
  //         headers: {
  //           authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDExNWM1YTM3N2U5OWVlZTdjZDFhNTAiLCJpYXQiOjE2Nzg4NTk2MzEsImV4cCI6MTY4NjYzNTYzMX0.na92cyaK4y56P0mj5KzUYcCLrlBHYcNshRXhxrOawb4",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       let rowData2 = res.data.data;
  //       console.log(rowData2);
  //       setRowData(rowData2);
  //       // params.api.sizeColumnsToFit();
  //     })
  //     .catch((err) => {
  //       console.log("Something wrong happened", err);
  //     });
  // }, []);

  useEffect(() => {
    const AllSoldProperties = async () => {
      try {
        const response = await axios.get(
          "http://nestobackend-env.eba-fk3zufmz.ap-south-1.elasticbeanstalk.com/api/v1/boughtProperty/getBoughtPropertyById?id=" +
            `${selectedRowId}`,
          {
            headers: {
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDExNWM1YTM3N2U5OWVlZTdjZDFhNTAiLCJpYXQiOjE2Nzg4NTk2MzEsImV4cCI6MTY4NjYzNTYzMX0.na92cyaK4y56P0mj5KzUYcCLrlBHYcNshRXhxrOawb4",
            },
          }
        );
        let rowData2 = response.data.data;
        console.log(rowData2);
        setRowData(rowData2);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    AllSoldProperties();
  }, []);

  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }
  function dataSearch(e) {
    gridApi.setQuickFilter(e.target.value);
  }

  return (
    <div>
      <div className=" d-flex gap-3 w-75  mb-4 p-3">
        <input
          type="search"
          placeholder="Search"
          onChange={dataSearch}
          size="sm"
          className="bm_headingsearch"
        />
      </div>
      <p className="mb-2">
        Showing <b>8 Broker Management </b>
      </p>
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
};

export default SoldProperty;
