import { Button, Container, Dropdown, Table } from "react-bootstrap";

import { useEffect, useState } from "react";

import TablePagination from "@mui/material/TablePagination";
import { getAPI } from "../BuilderApi/BuilderApiRequest";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";

const Eligible = () => {
  const [selectedOption, setSelectedOption] = useState("Select");
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllVisit = async () => {
      const response = await getAPI(apiEndpoints.getAllEligibleClaims);
      // console.log(response.data);

      setData(response.data);
      // setFilterData(response.data);
    };

    getAllVisit();
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

  // const propertyData = currentData.map((itm, index) => (
  const propertyData = currentData.map((itm) => {
    const index = data.findIndex((i) => i._id == itm._id);
    return (
      <tr key={itm._id}>
        <th>
          <input type="checkbox" />
        </th>
        <td>{index + 1}</td>
        <td>{itm.date}</td>
        <td>{itm.location}</td>
        <td>{itm.builderName}</td>
        <td> RS.3.93 L</td>
        <td>{itm.customerName}</td>
        <td>
          <div className="col-auto" style={{ gap: "2" }}>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {selectedOption}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOptionSelect(" Claim")}>
                  {/* Claim */}
                  <Button variant="outline-danger" className="rounded-pill">
                    Claim
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleOptionSelect("  Submitted")}
                >
                  <Button variant="outline-warning" className="rounded-pill">
                    Submitted
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOptionSelect("Approved")}>
                  {/* Approved */}
                  <Button variant="outline-primary" className="rounded-pill">
                    Approved
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleOptionSelect(" Payment received")}
                >
                  {/* Payment received */}
                  <Button variant="outline-success" className="rounded-pill">
                    Payment received
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOptionSelect("Paid")}>
                  {/* Paid */}
                  <Button variant="outline-info" className="rounded-pill">
                    Paid
                  </Button>
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
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
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
                  <th>DATE</th>
                  <th>ADDRESS</th>
                  <th>BUILDER NAME</th>
                  <th>BROKERAGE NAME</th>
                  <th>CUSTOMER NAME</th>
                  <th>ACTION</th>
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
        </Container>
      </section>
    </>
  );
};

export default Eligible;
