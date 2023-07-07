import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Table } from "react-bootstrap";
import { TablePagination } from "@mui/material";
import { apiEndpoints } from "./BuilderApi/BuilderApiEndpoint";
import { getAPI } from "./BuilderApi/BuilderApiRequest";
import { HiPencilAlt } from "react-icons/hi";

const Invoice = () => {
  const [selectedOption, setSelectedOption] = useState("Pending");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getInvoice = async () => {
      const response = await getAPI(
        `${apiEndpoints.getAllInvoiceForBuilder}${props.builder._id}`
      );
      console.log(response.data);
      setData(response.data);
    };

    getInvoice();
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
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = currentData.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const invoiceData = filteredData.map((itm, index) => (
    <tr key={index}>
      <th>
        <input type="checkbox" />
      </th>
      <td>{index + 1}</td>
      <td style={{ color: "#0686E1" }}>{itm?.claimId?.propertyId?._id}</td>
      <td>{itm?._id}</td>
      <th style={{ color: "#D12953" }}>{itm?.invoiceAmount}</th>
      <td>{itm?.brokerId?.createdAt}</td>
      <td>{itm?.claimId?.propertyId?.createdAt}</td>
      <td> {itm?.claimId?._id}</td>
      <td>
        <div className="col-auto" style={{ gap: "2" }}>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {selectedOption}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleOptionSelect(" Paid")}>
                <button>Paid</button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionSelect("Pending")}>
                <button>Pending</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </td>
      <td style={{ color: "#0686E1" }}>VIEW</td>
      <td>
        <div className="col-auto" style={{ gap: "2" }}>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {selectedOption}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleOptionSelect(" Paid")}>
                <button>Paid</button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionSelect("Pending")}>
                <button>Pending</button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionSelect("Pending")}>
                <button>Processing</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </td>
      <td>
        <HiPencilAlt />
      </td>
    </tr>
  ));

  return (
    <>
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
          <h3>Invoices</h3>
          <br />

          <p>Showing: {filteredData.length} Invoices</p>
          <br />
          <div className="table-search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
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
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ position: "absolute", left: "0", top: "0" }}
              />
            </div>
            <Table responsive hover>
              <thead>
                <tr style={{ color: "#BABABA" }}>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>#</th>
                  <th>PROPERTY ID</th>
                  <th>INVOICE NO.</th>
                  <th>AMOUNT</th>
                  <th>INVOICE DATE</th>
                  <th>CLAIM DATE</th>
                  <th>CLAIM NO.</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                  <th>PAYMENT STATUS</th>
                  <th>REMARKS</th>
                </tr>
              </thead>
              <tbody>{invoiceData}</tbody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Invoice;
