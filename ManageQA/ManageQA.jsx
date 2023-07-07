import { Button, Container, Table, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
// import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { BiEdit, BiSearchAlt2 } from 'react-icons/bi'
import { GoPlus } from "react-icons/go";
import AddQA from "./AddQA/AddQA";
import EditQA from "./EditQA/EditQA";
// import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";

// import { getAPI } from "../BuilderApi/BuilderApiRequest";
// import Profile from "../Profile/Profile";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ManageQA = () => {
    const [addQA, setAddQA] = useState(false)
    const [editQA, setEditQA] = useState(false)
    const [selectedOption, setSelectedOption] = useState("Select");
    const [builderSearch, setBuilderSearch] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyType, setCompanyType] = useState("");
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
    const [filterData, setFilterData] = useState(arr);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const lastPostIndex = page * rowsPerPage + rowsPerPage;
    const firstPostIndex = page * rowsPerPage;
    const currentData = filterData.slice(firstPostIndex, lastPostIndex);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleBuilderSearchInputChange = (event) => {
        const text = event.target.value;
        debugger;
        if (text.trim().length === 0) {
            setFilterData(arr);
        } else {
            const newData = customFilter(text, "name");

            setFilterData(newData);
        }
        setBuilderSearch(text);
    };
    const handleCompanyNameInputChange = (event) => {
        const text = event.target.value;
        if (text.trim().length === 0) {
            setFilterData(arr);
        } else {
            const newData = customFilter(text, "cName");

            setFilterData(newData);
        }
        setCompanyName(event.target.value);
    };
    const handleCompanyTypeInputChange = (event) => {
        const text = event.target.value;
        if (text.trim().length === 0) {
            setFilterData(arr);
        } else {
            const newData = customFilter(text, "cType");

            setFilterData(newData);
        }
        setCompanyType(event.target.value);
    };

    const customFilter = (text, from) => {
        // debugger;
        switch (from) {
            case "name":
                return arr.filter((itm) =>
                    itm?.name?.toLowerCase().includes(text?.toLowerCase())
                );
                break;
            case "cName":
                return arr.filter((itm) =>
                    itm?.companyName?.toLowerCase().includes(text?.toLowerCase())
                );
                break;
            default:
                return arr.filter((itm) =>
                    itm?.companyType?.toLowerCase().includes(text?.toLowerCase())
                );
                break;
        }
    };


    const listData = currentData.map((itm, index) => {
        return (
            <tr key={itm._id}>
                <td>
                    <input type="checkbox" />
                </td>
                <td>{index + 1}</td>
                <td>Lorem Ipsum is simply dummy text of the.....</td>
                <td>Lorem Ipsum is simply dummy text of the.....</td>
                <td>
                    <Form.Check type="switch" id="custom-switch" />
                </td>
                <td className="d-flex gap-2">
                    <BiEdit className="action_btn-1" onClick={() => setEditQA(true)} />
                </td>
            </tr>
        );
        // ))};
    });
    return (
        <>
            <section className="mt-4">
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="">
                            <h2>Manage Q&A</h2>
                        </div>
                        <span className="add-new_btn gap-1" onClick={() => setAddQA(true)}>
                            <GoPlus />
                            Add New
                        </span>
                    </div>
                    <br />
                    <div className="d-flex gap-2">
                        {" "}
                        <div className="action-inputs_div">
                            <input
                                type="text"
                                placeholder="Transaction ID"
                                value={builderSearch}
                                // onChange={(e) => setBuilderSearch(e.target.value)}
                                onChange={handleBuilderSearchInputChange}
                                className="action-inputs"
                            />
                            <span className="action-inputs_icon"><BiSearchAlt2 /></span>
                        </div>
                        <div className="action-inputs_div">
                            <input
                                type="text"
                                placeholder="Builder ID"
                                value={companyName}
                                // onChange={(e) => setCompanyName(e.target.value)}
                                onChange={handleCompanyNameInputChange}
                                className="action-inputs"
                            />
                            <span className="action-inputs_icon"><BiSearchAlt2 /></span>
                        </div>
                        <div className="action-inputs_div">
                            <input
                                type="text"
                                placeholder="Builder ID"
                                value={companyType}
                                // onChange={(e) => setCompanyType(e.target.value)}
                                onChange={handleCompanyTypeInputChange}
                                className="action-inputs"
                            />
                            <span className="action-inputs_icon"><BiSearchAlt2 /></span>
                        </div>
                        <div className="action-inputs_div">
                            <input
                                type="date"
                                placeholder="Choose Date"
                                value={companyType}
                                onChange={handleCompanyTypeInputChange}
                                className="action-inputs"
                            />
                        </div>
                    </div>

                    <br />


                    <div
                        className="table-responsive p-2"
                        style={{
                            overflowX: "scroll",
                            tableLayout: "fixed",
                            display: "block",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <Table responsive hover>
                            <thead>
                                <tr style={{ color: "#BABABA" }}>
                                    <th className="table_th">
                                        <input type="checkbox" />
                                    </th>
                                    <th className="table_th">#</th>
                                    <th className="table_th">QUESTION</th>
                                    <th className="table_th">ANSWER</th>
                                    <th className="table_th">STATUS</th>
                                    <th className="table_th">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>{listData}</tbody>
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
            <AddQA
                show={addQA}
                onHide={() => setAddQA(false)}
            />
            <EditQA
                show={editQA}
                onHide={() => setEditQA(false)}
            />
        </>
    );
};

export default ManageQA;