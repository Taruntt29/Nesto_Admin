import {
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";

import { getAPI } from "../BuilderApi/BuilderApiRequest";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const PropertyEditRequest = (props) => {
  const [selectedOption, setSelectedOption] = useState("Pending");
  const [builderSearch, setBuilderSearch] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState("");

  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    const getAllRequestProperty = async () => {
      debugger;

      try {
        const response = await getAPI(
          `${apiEndpoints.getAllRequestProperty}${props.builder?._id}`
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    getAllRequestProperty();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const lastPostIndex = page * rowsPerPage + rowsPerPage;
  const firstPostIndex = page * rowsPerPage;
  const currentData = data.slice(firstPostIndex, lastPostIndex);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedOptionValue(option);
    // if (option === "Rejected") {
    //   // setShowModal(true); // open popup when "Rejected" is selected
    // } else {
    //   setShowModal(false); // close popup for other options
    // }
  };

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
          itm?.companyName?.toLowerCase().includes(text?.toLowerCase())
        );

      case "status":
        return data.filter((itm) =>
          itm?.status?.toLowerCase().includes(text?.toLowerCase())
        );
      default:
        return data;
    }
  };

  const propertyData = currentData.map((itm, index) => {
    return (
      <tr key={itm._id}>
        <th>
          <input type="checkbox" />
        </th>
        <td>{index + 1}</td>
        <td
          style={{ color: "#0686E1" }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          {itm?.name}
        </td>
        <td>{itm?.location}</td>
        <td>{itm?.propertyType}</td>
        <td>{itm?.aboutProject}</td>

        <td>{itm?.aboutBuilder}</td>
        <td>
          <div className="col-auto" style={{ gap: "2" }}>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {selectedOption}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOptionSelect("Verified")}>
                  <button>Approved</button>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOptionSelect("Rejected")}>
                  <button>Rejected</button>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOptionSelect("Pending")}>
                  <button>Pending</button>
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
      {/* <section className="mt-4"> */}
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
          <div>
            <br />
            <div className=" d-flex gap-2">
              {" "}
              <input
                type="text"
                placeholder="Name"
                className="action-inputs"
                value={builderSearch}
                // onChange={(e) => setBuilderSearch(e.target.value)}
                onChange={handleBuilderSearchInputChange}
              />
              <input
                type="text"
                placeholder="Property Type"
                className="action-inputs"
                value={companyName}
                // onChange={(e) => setCompanyName(e.target.value)}
                onChange={handleCompanyNameInputChange}
              />
              <input
                type="text"
                placeholder="Status"
                className="action-inputs"
                value={status}
                // onChange={(e) => setCompanyType(e.target.value)}
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
              // maxWidth: "300px",
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
                  <th>LOCATION</th>
                  <th>PROPERTY TYPE</th>
                  <th>ABOUT THE PROJECT</th>
                  <th>ABOUT THE BUILDER</th>

                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>{propertyData}</tbody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          {showModal && (
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Property Edit Request</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex justify-content-evenly">
                  <Col>
                    <span>
                      <p>Upload your Property Photos/Videos</p>
                      <FileUploader files={[]} />
                    </span>
                  </Col>
                  <Col>
                    <span>
                      <p>Upload Brochure</p>
                      <FileUploader files={[]} />
                    </span>
                  </Col>
                </div>
                <hr />

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <h5> Name*</h5>
                      </Form.Label>
                      <Form.Control
                        className="builder-details_modal_input"
                        type="text"
                        placeholder="Enter name"
                      />
                      <br />
                      <Form.Label>
                        <h5>Amenities</h5>
                      </Form.Label>
                      <Form.Control
                        className="builder-details_modal_input"
                        type="text"
                        placeholder="Add amenities"
                      />
                      <br />
                      <Form.Label>
                        <h5> Loan Approved By</h5>
                      </Form.Label>
                      <Form.Control
                        className="builder-details_modal_input"
                        type="text"
                        placeholder="Choose loan approved by"
                      />
                      <br />
                      <Form.Label>
                        <h5> About the Builder</h5>
                      </Form.Label>
                      <Form.Control
                        className="builder-details_modal_input"
                        type="text"
                        placeholder="Builder Description"
                      />
                      <br />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <h5>Property Type*</h5>
                      </Form.Label>
                      <Form.Control
                        className="builder-details_modal_input"
                        type="text"
                        maxLength="10"
                        placeholder="Choose Property Type"
                      />

                      <br />

                      <br />
                      <Form.Label>
                        <h5>Location Advantages</h5>
                      </Form.Label>
                      <Form.Control
                        className="builder-details_modal_input"
                        type="text"
                        placeholder="Add location advantages"
                      />
                      <br />
                      <Form.Label>
                        <h5>About the Project</h5>
                      </Form.Label>
                      <Form.Control
                        className="builder-details_modal_input"
                        type="text"
                        placeholder="Project description"
                      />
                      <br />
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
          )}
        </Container>
      </section>
    </>
  );
};

export default PropertyEditRequest;
