import { Button, Container, Table } from "react-bootstrap";

import { useEffect, useState } from "react";

import TablePagination from "@mui/material/TablePagination";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";
import { getAPI } from "../BuilderApi/BuilderApiRequest";

const History = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllVisit = async () => {
      const response = await getAPI(apiEndpoints.getAllClaim);
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

  // const propertyData = currentData.map((itm, index) => (
  const propertyData = currentData.map((itm) => {
    const index = data.findIndex((i) => i._id == itm._id);
    return (
      <tr key={itm._id}>
        <th>
          <input type="checkbox" />
        </th>
        <td>{index + 1}</td>
        <td>{itm.propertyId.name}</td>
        <td> {itm.date}</td>
        <td>{itm.propertyId.location}</td>
        <td> {itm.builderId.name}</td>
        <td>{itm.propertyId.brokerageValue}</td>
        <td>{itm?.visitId?.clientName}</td>
        <td>
          {" "}
          <Button variant="outline-warning" className="rounded-pill">
            Submitted
          </Button>
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
                  <th>PROPERTY NAME</th>
                  <th>DATE</th>
                  <th>ADDRESS</th>
                  <th>BUILDER NAME</th>
                  <th>BROKERAGE VALUE</th>
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

export default History;
