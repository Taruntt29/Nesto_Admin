import React, { useEffect, useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import TablePagination from "@mui/material/TablePagination";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";
import { getAPI, putAPI } from "../BuilderApi/BuilderApiRequest";

const Intents = () => {
  const [selectedOption, setSelectedOption] = useState("Pending");
  const [builderSearch, setBuilderSearch] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState("");

  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [rejectItem, setRejectItem] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOptionSelect = async (option, id, index) => {
    if (option === "Rejected") {
      setRejectItem({ id, option });
      setShowModal(true);
      return;
    }

    try {
      const response = await putAPI(apiEndpoints.updateIntentStatus, {
        id: id,
        status: option,
      });
      console.log(response);

      if (response) {
        let temp = [...filterData];
        temp[index] = {
          ...temp[index],
          status: option,
        };
        setFilterData(temp);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        // Show alert message with the API response message
        const errorMessage =
          error.response.data.message || "An error occurred.";
        alert(`Error: ${errorMessage}`);
      }
    }

    setSelectedOptionValue(option);

    setData((prevData) =>
      prevData.map((item) => {
        if (item._id === id) {
          return { ...item, status: option };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    const getIntent = async () => {
      const response = await getAPI(apiEndpoints.getAllIntents);
      console.log(response);
      setData(response.data);
    };

    getIntent();
  }, []);

  useEffect(() => {
    const firstPostIndex = page * rowsPerPage;
    const lastPostIndex = firstPostIndex + rowsPerPage;
    setFilterData(data.slice(firstPostIndex, lastPostIndex));
  }, [data, page, rowsPerPage]);

  const handleBuilderSearchInputChange = (event) => {
    const text = event.target.value;

    if (text.trim().length === 0) {
      setFilterData(data);
    } else {
      const newData = customFilter(text, "name");
      setFilterData(newData);
    }

    setBuilderSearch(text);
  };

  const handleCompanyNameInputChange = (event) => {
    const text = event.target.value;
    if (text.trim().length === 0) {
      setFilterData(data);
    } else {
      const newData = customFilter(text, "cName");
      setFilterData(newData);
    }
    setCompanyName(event.target.value);
  };

  const handleStatusInputChange = (event) => {
    const text = event.target.value;
    if (text.trim().length === 0) {
      setFilterData(data);
    } else {
      const newData = customFilter(text, "status");
      setFilterData(newData);
    }
    setStatus(text);
  };

  const customFilter = (text, from) => {
    switch (from) {
      case "name":
        return data.filter((itm) =>
          itm?.name?.toLowerCase().includes(text?.toLowerCase())
        );
      case "cName":
        return data.filter((itm) =>
          itm?.typeOfProperty?.toLowerCase().includes(text?.toLowerCase())
        );
      case "status":
        return data.filter((itm) =>
          itm?.status?.toLowerCase().includes(text?.toLowerCase())
        );
      default:
        return data;
    }
  };

  const propertyData = filterData?.map((itm, index) => {
    const dataIndex = data.findIndex((i) => i._id === itm._id);
    return (
      <tr key={itm._id}>
        <th>
          <input type="checkbox" />
        </th>
        <td>{index + 1}</td>
        <td style={{ color: "#0686E1" }}>{itm?.name}</td>
        <td>{itm?.phoneNumber}</td>
        <td>{itm?.email}</td>
        <td>{itm?.typeOfProperty}</td>
        <td>{itm?.locationProperty}</td>
        <td>{itm?.projectName}</td>
        <td>{itm?.description}</td>
        <td>
          <div className="col-auto" style={{ gap: "2" }}>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {itm?.status}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleOptionSelect("Approved", itm._id, index)}
                >
                  Approved
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleOptionSelect("Rejected", itm._id, index)}
                >
                  Rejected
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleOptionSelect("Pending", itm._id, index)}
                >
                  Pending
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <section className="mt-4">
        <Container>
          <div>
            <h2>Intents</h2>
            <br />
            <div className="d-flex gap-2">
              <input
                type="text"
                placeholder="Name"
                className="action-inputs"
                value={builderSearch}
                onChange={handleBuilderSearchInputChange}
              />
              <input
                type="text"
                placeholder="Property Type"
                className="action-inputs"
                value={companyName}
                onChange={handleCompanyNameInputChange}
              />
              <input
                type="text"
                placeholder="Status"
                className="action-inputs"
                value={status}
                onChange={handleStatusInputChange}
              />
            </div>
            <br />
          </div>
          <div
            className="table-responsive p-2"
            style={{
              maxHeight: "400px",
              overflowY: "scroll",
              overflowX: "scroll",
              tableLayout: "fixed",
              display: "block",
              whiteSpace: "nowrap",
            }}
          >
            <Table responsive hover>
              <thead>
                <tr style={{ color: "#BABABA" }}>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>#</th>
                  <th>NAME</th>
                  <th>PHONE NUMBER</th>
                  <th>EMAIL</th>
                  <th>PROPERTY TYPE</th>
                  <th>LOCATION PROPERTY</th>
                  <th>PROJECT NAME</th>
                  <th>DESCRIPTION</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>{propertyData}</tbody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </section>
    </>
  );
};

export default Intents;

{
  /* <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to reject this item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleOptionSelect(rejectItem.option, rejectItem.id)}
          >
            Reject
          </Button>
        </Modal.Footer>
      </Modal> */
}
