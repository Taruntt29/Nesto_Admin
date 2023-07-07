import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IoIosAdd } from 'react-icons/all';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddBroker from './AddBroker/AddBroker';
import './BrokerManagement.css';
import VisitTable from './VisitTable/VisitTable';
import TableClient from './ClientTable/TableClient';
import SoldProperty from './Sold_Property/SoldProperty';
import BrokerUpdate from './BrokerUpdate/BrokerUpdate';
import ClaimsMain from './Claims/ClaimsMain';

const BrokerManagement = () => {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [show, setShow] = useState(false);
  const [showClient, setShowClient] = useState(false);
  const [showClaims, setShowClaims] = useState(false);
  const [showSoldPro, setShowSoldPro] = useState(false);
  const [showUdpate, setShowUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModelClaims, setShowModalClaims] = useState(false);
  const [showModalSoldPro, setShowModalSoldPro] = useState(false);
  const [showModelUpdate, setShowModelUpdate] = useState(false);
  const [showModalClient, setShowModalClient] = useState(false);
  const [visitRowIndex, setVisitRowIndex] = useState(false);
  const [claimsRowIndex, setClaimsRowIndex] = useState(false);
  const [soldProRowIndex, setSoldProRowIndex] = useState(false);
  const [updateRowIndex, setUpdateRowIndex] = useState(false);
  const [clientRowIndex, setClientRowIndex] = useState(false);
  const [visitRowData, setVisitRowData] = useState(false);
  const [soldProRowData, setSlodProRowData] = useState(false);
  const [updateRowData, setUpdateRowData] = useState(false);
  const [clientRowData, setClientRowData] = useState(false);
  const [claimsRowData, setClaimsRowData] = useState(false);
  const [isActiveStatus, setIsActiveStatus] = useState(false);
  const handleClose6 = () => setShowModelUpdate(false);

  const handleShow = () => setShow(true);
  const NumberOfRows = 6;

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: '#',
      field: '',
      cellRenderer: params => params.rowIndex + 1,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: 'BROKER ID',
      field: '_id',
    },
    {
      headerName: 'BROKER NAME',
      field: 'name',
      filter: true,

      cellRendererFramework: (params, index) => (
        <button
          onClick={() => {
            setUpdateRowIndex(params.rowIndex);
            setShowModelUpdate(true);
            console.log('Clicked row data:', setUpdateRowData(params.data));
          }}
        >
          <div className="bm_colColor">{params.data.name}</div>
        </button>
      ),
    },
    {
      headerName: 'PHONE NUMBER',
      field: 'phoneNumber',
    },
    {
      headerName: 'EMAIL',
      field: 'email',
    },
    {
      headerName: 'PAN NUMBER',
      field: 'panNumber',
    },
    {
      headerName: 'RERA REGI. NUMBER',
      field: 'reraRegistrationNumber',
    },
    {
      headerName: 'ADDRESS',
      field: 'address',
    },
    {
      headerName: 'VISITS',
      field: 'noOfVisits',

      cellRendererFramework: (params, index) => (
        <button
          onClick={() => {
            setVisitRowIndex(params.rowIndex);
            setShowModal(true);
            console.log('Clicked row data:', setVisitRowData(params.data));
          }}
          className="bm_colColor"
        >
          {params.data.noOfVisits}
        </button>
      ),
    },
    {
      headerName: 'CLIENTS',
      field: 'noOfCustomers',

      cellRendererFramework: (params, index) => (
        <button
          onClick={() => {
            setClientRowIndex(params.rowIndex);
            setShowModalClient(true);
            console.log('Clicked row data:', setClientRowData(params.data));
          }}
          className="bm_colColor"
        >
          {params.data.noOfCustomers}
        </button>
      ),
    },
    {
      headerName: 'SOLD PROPERTIES',
      field: 'noOfSoldProperties',
      cellStyle: { color: 'blue' },
      cellRendererFramework: (params, index) => (
        <button
          onClick={() => {
            setSoldProRowIndex(params.rowIndex);
            setShowModalSoldPro(true);

            console.log('Clicked row data:', setSlodProRowData(params.data));
          }}
          className="bm_colColor"
        >
          <div className="bm_colColor">{params.data.noOfSoldProperties}</div>
        </button>
      ),
    },

    {
      headerName: 'CLAIMS',
      field: 'noOfClaimsCount',
      cellStyle: { color: 'blue' },
      cellRendererFramework: (params, index) => (
        <button
          onClick={() => {
            setClaimsRowIndex(params.rowIndex);
            setShowModalClaims(true);
            console.log('Clicked row data:', setClaimsRowData(params.data));
          }}
          className="bm_colColor"
        >
          <div className="bm_colColor">{params.data.noOfClaimsCount}</div>
        </button>
      ),
    },

    {
      headerName: 'STATUS',
      field: 'isActive',
      cellRendererFramework: params => (
        <Form>
          <Form.Check
            defaultChecked={params.data.isActive}
            type="switch"
            id="switch"
            onChange={() => {
              HandleStatus(params.data._id);
            }}
          />
        </Form>
      ),
    },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    minWidth: 200,
  }));

  const onGridReady = useCallback(params => {
    params.api.sizeColumnsToFit();
    setGridApi(params.api);
    axios
      .get(
        'http://ec2-54-166-52-219.compute-1.amazonaws.com/api/v1/broker/getAllBroker'
      )
      .then(ress => {
        let rowData2 = ress.data.data;
        setRowData(rowData2);

        params.api.sizeColumnsToFit();
      })
      .catch(err => {
        console.log('Something wrong happened', err);
      });
  }, []);

  // console.log("status.....................",isActiveStatus);

  function dataSearch(e) {
    gridApi.setQuickFilter(e.target.value);
  }

  const HandleStatus = async (handleStatusId) => {
    // setIsActiveStatus(!isActiveStatus);

    const chnageStatus = await axios.put(
      'http://ec2-54-166-52-219.compute-1.amazonaws.com/api/v1/broker/updateBrokerStatus?id=' +
        `${handleStatusId}`
    );
  };

  return (
    <div>
      <div className="d-flex mt-5">
        <h3 className=""> Broker Management</h3>

        <Button
          className="  ms-auto px-3 py-0.5 bm_Newbroker"
          onClick={handleShow}
        >
          <IoIosAdd size={25} /> New Broker
        </Button>

        <Modal show={show} size="xl" onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title> Add Broker </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddBroker setShow={setShow} show={show} />
          </Modal.Body>
        </Modal>
      </div>

      <div className="ag-theme-alpine w-100 " style={{ height: 450 }}>
        <div className=" d-flex gap-4 w-75 mb-4 mt-4">
          <Form>
            <Form.Group className="">
              <Form.Control
                type="search"
                placeholder="Search "
                onChange={dataSearch}
                size="sm"
                className="bm_headingsearch px-4"
              />
            </Form.Group>
          </Form>
        </div>
        <p className="mt-3 mb-3">
          Showing <b>{NumberOfRows} Broker Management </b>
        </p>

        <div
          className="ag-theme-alpine"
          style={{ height: '400px', width: '100%' }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowSelection={'multiple'}
            pagination={true}
            paginationPageSize={NumberOfRows}
            suppressRowClickSelection={true}
          />
          {setShow && (
            <Modal
              size="xl"
              show={showModal}
              onHide={() => setShowModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Visit </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <VisitTable rowIndex={visitRowIndex} rowData={visitRowData} />
              </Modal.Body>
            </Modal>
          )}

          {setShowClient && (
            <Modal
              size="xl"
              show={showModalClient}
              onHide={() => setShowModalClient(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Client </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TableClient
                  rowIndex={clientRowIndex}
                  rowData={clientRowData}
                />
              </Modal.Body>
            </Modal>
          )}

          {setShowClaims && (
            <Modal
              size="xl"
              show={showModelClaims}
              onHide={() => setShowModalClaims(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Claims </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ClaimsMain rowIndex={claimsRowIndex} rowData={claimsRowData} />
              </Modal.Body>
            </Modal>
          )}

          {setShowSoldPro && (
            <Modal
              size="xl"
              show={showModalSoldPro}
              onHide={() => setShowModalSoldPro(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Sold Properties</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <SoldProperty
                  rowIndex={soldProRowIndex}
                  rowData={soldProRowData}
                />
              </Modal.Body>
            </Modal>
          )}

          {setShowUpdate && (
            <Modal size="xl" show={showModelUpdate} onHide={handleClose6}>
              <Modal.Header closeButton>
                <Modal.Title>Update</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <BrokerUpdate
                  rowIndex={setShowModelUpdate}
                  rowData={updateRowData}
                  onCancel={handleClose6}
                />
              </Modal.Body>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrokerManagement;
