import { Container, Form, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import TablePagination from "@mui/material/TablePagination";
import { getAPI } from "../BuilderApi/BuilderApiRequest";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const RaiseDisputeQuestion = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDispute = async () => {
      const response = await getAPI(apiEndpoints.getAllRaiseDispute);
      console.log(response.data);

      setData(response.data);
      // setFilterData(response.data);
    };

    getDispute();
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
  const invoiceData = currentData.map((itm, index) => (
    <tr key={index}>
      <th>
        <input type="checkbox" />
      </th>
      <td>{index + 1}</td>
      <td>{itm?.reason}</td>
      <td>
        {" "}
        <Form.Check type="switch" id="custom-switch" />
      </td>
    </tr>
  ));

  return (
    <>
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
          <h3>Raise Dispute Question</h3>
          <br />
          <br />
          <p>Showing: 10 Invoices</p>
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
                  <th>QUESTIONS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>{invoiceData}</tbody>
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

export default RaiseDisputeQuestion;
