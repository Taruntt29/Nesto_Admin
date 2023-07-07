import {
  Container,
  Table,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

import TablePagination from "@mui/material/TablePagination";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const TableData = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const lastPostIndex = page * rowsPerPage + rowsPerPage;
  const firstPostIndex = page * rowsPerPage;
  const currentData = arr.slice(firstPostIndex, lastPostIndex);
  const tableHead = props.tableHead.map((itm) => <th>{itm}</th>);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //   const invoiceData = props.currentData.map((itm, index) => (
  const invoiceData = currentData.map((itm, index) => (
    <tr key={index}>
      <th>
        <input type="checkbox" />
      </th>
      <td>{index + 1}</td>
      <td style={{ color: "#0686E1" }}>55555555</td>
      <td> Tarun Tiwari</td>
      <td>07 April 2023</td>
      <td> Bought</td>
      <td>Sweeti Tiwari</td>
    </tr>
  ));
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
                  {/* <th>#</th>
                  <th>VISIT ID</th>
                  <th>BROKER NAME</th>
                  <th>VISIT DATE</th>
                  <th>STATUS</th>
                  <th>CLIENT NAME</th> */}
                  {tableHead}
                </tr>
              </thead>
              <tbody>{invoiceData}</tbody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={arr.length}
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
export default TableData;
