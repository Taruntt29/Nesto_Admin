import { Button, Container, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/all";
import BuilderPop from "./BuilderPop";
import NewBuilder from "./NewBuilder";
import Submit from "./Submit";

import TablePagination from "@mui/material/TablePagination";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";

import { getAPI } from "../BuilderApi/BuilderApiRequest";

const AddNewBuilder = () => {
  const [data, setData] = useState([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showNewBuilder, setShowNewBuilder] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  const [builderSearch, setBuilderSearch] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");

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

  useEffect(() => {
    const getList = async () => {
      const response = await getAPI(apiEndpoints.getAllBuilder);
      // debugger;
      // console.log(response.data);

      setData(response.data);
      // setFilterData(response.data);
    };

    getList();
  }, []);

  const filteredData = data.filter(
    (itm) => itm?.name?.toLowerCase().includes(builderSearch?.toLowerCase())
    // &&
    // itm.country.toLowerCase().includes(companyName.toLowerCase()) &&
    // itm.country.toLowerCase().includes(companyType.toLowerCase())
  );

  if (builderSearch) {
  }
  const listData = currentData.map((itm) => {
    const index = data.findIndex((i) => i._id == itm._id);
    return (
      <tr>
        <td>
          <input type="checkbox" />
        </td>
        <td>{index + 1}</td>
        <td
          style={{ color: "#0686E1" }}
          onClick={() => {
            setShowBuilder(true);
          }}
        >
          {/* {builderSearch} */}
          {itm.name}
        </td>
        <td> {itm.phoneNumber}</td>

        <td>{itm.locationOfProperty}</td>
        <td>{itm.companyName}</td>
        <td>{itm.companyType}</td>
        <td>{itm.gst}</td>
        <td>{itm.panOfCompany}</td>
        <td style={{ color: "#0686E1" }}>{itm.totalCount}</td>

        <td>
          <Form.Check type="switch" id="custom-switch" />
        </td>
      </tr>
    );
  });
  return (
    <>
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
          <div className="d-flex justify-content-between">
            <h2>Property List Under Tarun Tiwari</h2>
            {/* <span className="mb-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setShowNewBuilder(true);
                  }}
                >
                  <IoIosAdd size={25} />
                  Add Builder
                </Button>
              </span> */}
          </div>
          {/* <br />
          {!showNewBuilder && !showSubmit && (
            <div className=" d-flex justify-content-around">
              {" "}
              <input
                type="text"
                placeholder="Builder Search"
                value={builderSearch}
                onChange={(e) => setBuilderSearch(e.target.value)}
              />
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Company Type"
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
              />
            </div>
          )}
          <br /> */}
          <div
            style={{
              width: "100%",
              overflowX: "scroll",
              display: "block",
              whiteSpace: "nowrap",
            }}
          >
            <Table responsive striped bordered hover>
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
                  <th>NUMBER OF VISITS</th>
                  <th>PRICE</th>
                  <th>BROKERAGE</th>

                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>{listData}</tbody>
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
          </div>{" "}
        </Container>
      </section>
    </>
  );
};

export default AddNewBuilder;
