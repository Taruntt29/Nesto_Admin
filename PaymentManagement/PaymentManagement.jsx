import React, { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { Container, Table } from "react-bootstrap";
import { BiSearchAlt2 } from 'react-icons/bi'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const PaymentManagement = () => {
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

                <td>Lorem Ipsum</td>
                <td>3444521232333</td>
                <td>Lorem Ipsum</td>
                <td>3444521232344</td>
                <td>4332234322432</td>
                <td>4332234322432</td>
                <td>4332234322432</td>
            </tr>
        );
    });
    return (
        <>
            <section className="mt-4">
                <Container>
                    <div className="">
                        <h2>Payment Management</h2>
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
                                type="date"
                                placeholder="Company Type"
                                value={companyType}
                                // onChange={(e) => setCompanyType(e.target.value)}
                                onChange={handleCompanyTypeInputChange}
                                className="action-inputs"
                            />
                        </div>
                    </div>

                    <br />


                    <div
                        className="table-responsive p-2"
                        style={{
                            // maxHeight: "400px",
                            // overflowY: "scroll",
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
                                    <th className="table_th">
                                        <input type="checkbox" />
                                    </th>
                                    <th className="table_th">#</th>
                                    <th className="table_th">IFSC CODE</th>
                                    <th className="table_th">ACCOUNT NUMBER</th>
                                    <th className="table_th">RECIPEINT NAME</th>
                                    <th className="table_th">BROKER ID</th>
                                    <th className="table_th">BUILDER ID</th>
                                    <th className="table_th">PROPERTY ID</th>
                                    <th className="table_th">INVOICE ID</th>
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
        </>
    );
};

export default PaymentManagement;