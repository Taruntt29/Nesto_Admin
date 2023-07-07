import { Button, Container, Table } from "react-bootstrap";

import { useEffect, useState } from "react";

import TablePagination from "@mui/material/TablePagination";
import { getAPI } from "../BuilderApi/BuilderApiRequest";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const Queries = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllVisit = async () => {
      const response = await getAPI(apiEndpoints.getAllLoanQueryDetails);

      setData(response.data);
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

  // const propertyData = currentData.map((itm, index) => (
  const propertyData = currentData.map((itm) => {
    const index = data.findIndex((i) => i._id == itm._id);
    const currentRating = itm?.builderId?.rating || 0;
    return (
      <tr key={itm._id}>
        <th>
          <input type="checkbox" />
        </th>
        <td>{index + 1}</td>
        <td>{itm.propertyId.name}</td>
        <td>{itm.requiredDate}</td>
        <td>{itm.propertyId.location}</td>
        <td>{itm._id}</td>
        <td>{itm.boughtPropertyId._id}</td>
        <td>{itm.clientId.clientName}</td>
        <td>{itm.dsaId.name}</td>
        <td>{itm.dsaId.phoneNumber}</td>
        <td>{itm.followupDate === null ? " --------" : itm.followupDate}</td>
        <td>
          {" "}
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => {
                    setRating(index);
                    // onRating();
                    updateRating(itm?.builderId?.rating, index);
                  }}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(currentRating)}
                >
                  <span className="star">&#9733; </span>
                </button>
              );
            })}
          </div>
        </td>
        <td style={{ color: "#D12953" }}>
          <Button variant="outline-success " className="rounded-pill">
            Assigned
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container style={{ width: "100%", overflowX: "scroll" }}>
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
                  <th>PROPERTY NAME</th>
                  <th>DATE</th>
                  <th>ADDRESS</th>
                  <th>LOAN QUERY</th>
                  <th>VISIT ID</th>
                  <th>CUSTOMER NAME</th>
                  <th>DSA NAME</th>
                  <th>DSA PHONE NUMBER</th>
                  <th>STATUS DATE</th>
                  <th>RATING & REVIEWS</th>
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
        </Container>
      </section>
    </>
  );
};

export default Queries;
