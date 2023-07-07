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
import Profile from "../Profile/Profile";
import "./Onboard.css";

const Onboard = () => {
  const [data, setData] = useState([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showNewBuilder, setShowNewBuilder] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [builder, setBuilder] = useState("");
  const [builderSearch, setBuilderSearch] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [filterData, setFilterData] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const lastPostIndex = page * rowsPerPage + rowsPerPage;
  const firstPostIndex = page * rowsPerPage;
  const currentData = filterData?.slice(firstPostIndex, lastPostIndex);
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
      setFilterData(response.data);
      setData(response.data);
    };

    getList();
  }, []);
  const onToggle = async (builderData, event) => {
    const formData = { ...builderData, isDeleted: event.target.checked };
  };

  // const handleBuilderSearchInputChange = (event) => {
  //   const text = event.target.value;

  //   if (text.trim().length === 0) {
  //     setFilterData(data);
  //   } else {
  //     const newData = customFilter(text, "name");

  //     setFilterData(newData);
  //   }
  //   setBuilderSearch(text);
  // };
  const handleBuilderSearchInputChange = (event) => {
    const searchText = event.target.value.toLowerCase();

    if (searchText.trim().length === 0) {
      setFilterData(data);
    } else {
      const newData = data.filter((itm) =>
        Object.values(itm).some(
          (value) =>
            value && value.toString().toLowerCase().includes(searchText)
        )
      );
      setFilterData(newData);
    }

    setBuilderSearch(searchText);
  };
  const handleCompanyNameInputChange = (event) => {
    const text = event.target.value;
    if (text.trim().length === 0) {
      setFilterData(data);
    } else {
      const newData = customFilter(text, "cName");

      setFilterData(newData);
    }
    setCompanyName(event.target.value);
  };
  const handleCompanyTypeInputChange = (event) => {
    const text = event.target.value;
    if (text.trim().length === 0) {
      setFilterData(data);
    } else {
      const newData = customFilter(text, "cType");

      setFilterData(newData);
    }
    setCompanyType(event.target.value);
  };

  const customFilter = (text, from) => {
    switch (from) {
      case "name":
        return data.filter((itm) =>
          itm?.name?.toLowerCase().includes(text?.toLowerCase())
        );
        break;
      case "cName":
        return data.filter((itm) =>
          itm?.companyName?.toLowerCase().includes(text?.toLowerCase())
        );
        break;
      default:
        return data.filter((itm) =>
          itm?.companyType?.toLowerCase().includes(text?.toLowerCase())
        );
        break;
    }
  };

  const listData = currentData?.map((itm) => {
    const index = data?.findIndex((i) => i._id == itm._id);

    return (
      <tr key={itm._id}>
        <td>
          <input type="checkbox" />
        </td>
        <td>{index + 1}</td>
        <td>{itm?._id}</td>
        <td
          style={{ color: "#0686E1" }}
          onClick={() => {
            setBuilder(itm);
            setShowBuilder(true);
          }}
        >
          <a>{itm?.name}</a>
        </td>
        <td> {itm?.phoneNumber}</td>

        <td>{itm?.address}</td>
        <td>{itm?.companyName}</td>
        <td>{itm?.companyType}</td>
        <td>{itm?.gst}</td>
        <td>{itm?.panOfCompany}</td>
        <td style={{ color: "#0686E1" }}>{itm?.totalCount}</td>

        <td>
          <Form.Check
            type="switch"
            id="custom-switch"
            defaultChecked={itm.isDeleted}
            onClick={onToggle.bind(null, itm)}
          />
        </td>
      </tr>
    );
    // ))};
  });
  return (
    <>
      <section className="mt-4">
        <Container>
          {!showNewBuilder && !showSubmit && !showBuilder && (
            <div className="d-flex justify-content-between">
              <h2>Onboard /List</h2>
              <span className="mb-2">
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
              </span>
            </div>
          )}
          <br />
          {!showNewBuilder && !showSubmit && !showBuilder && (
            <div className="box gap-2">
              {" "}
              <input
                type="text"
                placeholder="Builder Search"
                className="action-inputs"
                value={builderSearch}
                onChange={handleBuilderSearchInputChange}
                style={{ width: "180px" }}
              />
              {/* <input
                type="text"
                placeholder="Company Name"
                className="action-inputs"
                value={companyName}
                onChange={handleCompanyNameInputChange}
              />
              <input
                type="text"
                placeholder="Company Type"
                className="action-inputs"
                value={companyType}
                onChange={handleCompanyTypeInputChange}
              /> */}
            </div>
          )}
          <br />

          {!showNewBuilder && !showSubmit && !showBuilder && (
            <div
              className="table-responsive p-2 onboard-table"
              style={{
                overflowX: "scroll",
                tableLayout: "fixed",
                display: "block",
                whiteSpace: "nowrap",
              }}
            >
              <Table responsive hover borderless className="bg-white">
                <thead>
                  <tr style={{ color: "#BABABA" }}>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>#</th>
                    <th>Builder ID</th>
                    <th>BUILDER NAME</th>
                    <th>PHONE NUMBER</th>
                    <th>LOCATION</th>
                    <th>COMPANY NAME</th>
                    <th>COMPANY TYPE</th>
                    <th>COMPANY GST </th>
                    <th>COMPANY PAN </th>
                    <th>PROPERTY COUNT</th>
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
            </div>
          )}

          {showBuilder && (
            <Profile
              builder={builder}
              name={builder.name}
              show={showBuilder}
              onHide={setShowBuilder}
              onChange={setShowBuilder}
            />
          )}
          {showNewBuilder && (
            <NewBuilder
              onSubmit={setShowSubmit}
              show={showNewBuilder}
              onHide={setShowNewBuilder}
            />
          )}
        </Container>
      </section>
    </>
  );
};

export default Onboard;
