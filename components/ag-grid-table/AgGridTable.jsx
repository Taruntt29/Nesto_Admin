import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './AgGridTable.css';

const AG_Grid_Table = props => {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(props.tableData);

  const [columnDefs, setColumnDefs] = useState(props.tableCol);

  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
  }, []);

  // Example load data from server
  // useEffect(() => {
  //   fetch("https://www.ag-grid.com/example-assets/row-data.json")
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  // }, []);

  const buttonListener = useCallback(e => {
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
      <div className="ag-theme-alpine w-100" style={{ height: 350 }}>
        <div className=" d-flex gap-3 w-75  mb-4 p-3">
          <input
            type="search"
            placeholder="Search"
            onChange={dataSearch}
            size="sm"
            className="bm_headingsearch"
          />

          {['Secondary', 'Secondary'].map(variant => (
            <DropdownButton
              as={ButtonGroup}
              key={variant}
              id={`dropdown-variants-${variant}`}
              variant={variant.toLowerCase()}
              title="Please Select"
              size="sm"
            >
              <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3" active>
                Active Item
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </DropdownButton>
          ))}
        </div>

        <p className="mb-2">Showing 10 Broker Management</p>
        <AgGridReact
          onGridReady={onGridReady}
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onCellClicked={cellClickedListener}
          pagination={true}
          paginationPageSize={6}
          rowMultiSelectWithClick={true}
        />
      </div>
    </div>
  );
};

export default AG_Grid_Table;
