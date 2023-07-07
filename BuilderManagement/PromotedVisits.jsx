import { Table, Button, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
// import VisitDetailItem from "./VisitDetailItem";

import { apiEndpoints } from "./BuilderApi/BuilderApiEndpoint";

import { getAPI } from "./BuilderApi/BuilderApiRequest";
import { FaStar } from "react-icons/fa";

const PromotedVisit = () => {
  const [rating, setRating] = useState(0);

  const [hover, setHover] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getPromoted = async () => {
      const response = await getAPI(apiEndpoints.getAllVisit2);
      // console.log(response.data);

      setData(response.data);
      // setFilterData(response.data);
    };

    getPromoted();
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

  // const subsData = currentData.map((itm, index) => (
  const subsData = currentData.map((itm) => {
    const index = data.findIndex((i) => i._id == itm._id);
    const currentRating = itm?.builderId?.rating || 0;
    return (
      <tr key={itm._id}>
        <th>
          <input type="checkbox" />
        </th>
        <td>{index + 1}</td>
        <td>{itm._id}</td>
        <td>{itm.brokerId.name}</td>

        <td> {itm.date}</td>
        <td>{itm.visitStatus}</td>
        <td>{itm.clientName}</td>
        <td>
          {" "}
          <div className="star-rating">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                size={25}
                color={index < itm?.builderId?.rating ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
          <br />
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
                  <th>VISIT ID</th>
                  <th>BROKER NAME</th>
                  <th>VISIT DATE</th>
                  <th>STATUS</th>
                  <th>CLIENT NAME</th>
                  <th>RATING</th>
                </tr>
              </thead>
              <tbody>{subsData}</tbody>
            </Table>
            <br />
            <span style={{ background: "rgba(244, 247, 252, 0.75)" }}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </span>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PromotedVisit;
