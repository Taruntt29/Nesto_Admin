import { Container, Form, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import TablePagination from "@mui/material/TablePagination";
import { getAPI } from "../BuilderApi/BuilderApiRequest";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";
function ContactUs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDispute = async () => {
      const response = await getAPI(apiEndpoints.getAllContactus);
      console.log(response.data);

      setData(response.data);
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

  const contactData = currentData.map((itm, index) => (
    <tr key={index}>
      <th>
        <input type="checkbox" />
      </th>
      <td>{index + 1}</td>
      <td>{itm?.name}</td>
      <td>{itm?.email}</td>
      <td>{itm?.service}</td>
      <td>{itm?.phoneNumber}</td>
      <td>{itm?.msg}</td>
    </tr>
  ));

  return (
    <>
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
          <h3>Contact Us Information</h3>
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
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>SERVICES</th>
                  <th>PHONE NUMBER</th>
                  <th>COMMENTS</th>
                </tr>
              </thead>
              <tbody>{contactData}</tbody>
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
}

export default ContactUs;
