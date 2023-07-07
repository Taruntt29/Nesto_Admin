import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";


import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const EligibleClaims = (props) => {
  let selectedRowId = props.slectedClaims;

  const gridRef = useRef();

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "ID",
      field: "defaultId",
    },
    { headerName: "PROPERTY NAME", field: "_id" },
    { headerName: "DATE ", field: "_id" },
    { headerName: "ADDRESS", field: "_id" },
    { headerName: "BUILDER NAME", field: "_id" },
    { headerName: "BROKERAGE VALUE", field: "_id" },
    { headerName: "CUSTOMER NAME", field: "_id" },
    { headerName: "ACTION", field: "_id" },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  const cellClickedListener = useCallback((event) => {

  }, []);

  useEffect(() => {
    axios
      .get(
        "http://ec2-54-166-52-219.compute-1.amazonaws.com/api/v1/claim/getClaimById?id=" +
        `${selectedRowId}`,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBjMzA5MDJjZGYzNjczYTI5YWU3MWQiLCJpYXQiOjE2Nzg5NDQ0NzUsImV4cCI6MTY4NjcyMDQ3NX0.JC6YUtwiRBr_gBxMgu6j7kY9GVxM763ofB0ChX1lZo4",
          },
        }
      )
      .then((res) => {
        let rowData2 = res.data.data;

        setRowData(rowData2);
        // params.api.sizeColumnsToFit();
      })
      .catch((err) => {
        console.log("Something wrong happened", err);
      });
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

export default EligibleClaims;
