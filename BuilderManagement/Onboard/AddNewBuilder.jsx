import React, { useEffect, useState } from "react";
import { Container, Dropdown, Form, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import { getAPI } from "../BuilderApi/BuilderApiRequest";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";
import Property from "../Property";
import RaiseDispute from "../Claim/RaiseDispute";

const AddNewBuilder = (props) => {
  const [selectedOption, setSelectedOption] = useState("Select");
  const [data, setData] = useState([]);
  const [showDispute, setShowDispute] = useState(false);
  const [showVisits, setShowVisits] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const lastPostIndex = page * rowsPerPage + rowsPerPage;
  const firstPostIndex = page * rowsPerPage;
  const currentData = data
    ?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(firstPostIndex, lastPostIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const getList = async () => {
      const response = await getAPI(
        `${apiEndpoints.getAllproperty}?builderId=${props.builder._id}`
      );
      setData(response.data);
    };
    debugger;
    getList();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const invoiceData = currentData?.map((itm, index) => (
    <tr key={itm._id} id={itm._id}>
      <th>
        <input type="checkbox" />
      </th>
      <td>{index + 1}</td>
      <td>{itm?.name}</td>
      <td>{itm?.constructionStatus}</td>
      <td>{itm?.propertyType?.name}</td>
      <td>{itm?.location}</td>
      <td
      // onClick={() => {
      //   setShowVisits(true);
      // }}
      >
        {itm?.noOfVisits}
      </td>
      <td style={{ color: "#D12953" }}>
        {itm?.minPrice}-{itm?.maxPrice}
      </td>
      {/* <td>
        <div className="col-auto" style={{ gap: '2' }}>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {selectedOption}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleOptionSelect('Claim')}>
                <button>Claim</button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionSelect('Submitted')}>
                <button>Submitted</button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionSelect('Approved')}>
                <button>Approved</button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionSelect('Payment received')}>
                <button>Payment received</button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionSelect('Paid')}>
                <button>Paid</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </td> */}
      <td style={{ color: "#D12953" }}>{itm?.brokerageValue}</td>
      {/* <td
        onClick={() => {
          setShowDispute(true);
        }}
      >
        Raise Dispute
      </td> */}
      <td>
        <Form.Check type="switch" id="custom-switch" />
      </td>
    </tr>
  ));

  return (
    <>
      <section className="NESTO__admin__main__add__property__section m-3 px-4 py-4">
        <Container>
          {!showDispute && !showVisits && <p>Showing: 10 Property Listings</p>}

          <br />

          <div className="table-search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {!showDispute && !showVisits && (
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
                    <th>NAME OF PROPERTY</th>
                    <th>CONSTRUCTION STATUS</th>
                    <th>PROPERTY TYPE</th>
                    <th>LOCATION</th>
                    <th>VISITS</th>
                    <th>PRICE</th>
                    {/* <th>CLAIMS STATUS</th> */}
                    <th>BROKERAGE</th>
                    {/* <th>RAISED DISPUTE</th> */}
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>{invoiceData}</tbody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          )}

          {showDispute && (
            <RaiseDispute
              show={showDispute}
              onHide={() => setShowDispute(false)}
              onChange={() => setShowDispute(false)}
            />
          )}

          {showVisits && (
            <Property
              show={showVisits}
              onHide={() => setShowVisits(false)}
              onChange={() => setShowVisits(false)}
            />
          )}
        </Container>
      </section>
    </>
  );
};

export default AddNewBuilder;
