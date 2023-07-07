import React, { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import { Container, Table, Form, Button } from "react-bootstrap";
import { BiEdit, BiSearchAlt2 } from 'react-icons/bi'
import ViewBlog from "./ViewBlog/ViewBlog";
import { GoPlus } from 'react-icons/go'
import { Link } from "react-router-dom";
import axios from "axios";
import AddBlog from "./AddBlog/AddBlog";
import { getAPI } from "../BuilderManagement/BuilderApi/BuilderApiRequest";
import { apiEndpoints } from "../BuilderManagement/BuilderApi/BuilderApiEndpoint";
import { BASE_URL } from "../../../../config";
import { BsTrash3 } from "react-icons/bs";
import { toast } from "react-toastify";
// import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";

// import { getAPI } from "../BuilderApi/BuilderApiRequest";
// import Profile from "../Profile/Profile";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Blogs = (props) => {
    const [data, setData] = useState({});
    const [isActive, setIsActive] = useState(false);
    const [viewPopUp, setViewPopUp] = useState(false)
    const [addPopUp, setAddPopUp] = useState(false)
    //   const [data, setData] = useState([]);
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

    useEffect(() => {
        fetchData();
    }, []);

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

    // const handleToggle = () => {
    //     console.log(true, "hello Anas");
    // }
    const handleToggle = async (id) => {
        try {
            const response = await axios.put(`${BASE_URL + apiEndpoints.activeStatus}?id=${id}`, { active: !isActive });
            setIsActive(response?.data);
        } catch (error) {
            console.error('Error toggling active status:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL + apiEndpoints.deleteBlog}?id=${id}`);
            console.log(response, "blog deleted");
            toast.success(response.data.message)
            fetchData();
        } catch (error) {
            // Handle error
        }
    };

    console.log(isActive, "hello active status");
    const fetchData = async () => {
        await axios.get(BASE_URL + apiEndpoints.getAllBlogsAdmin)
            .then(function (response) {
                setData(response)
            })
            .catch(function (error) {
                // console.log(error);
            })
    }
    console.log(data?.data?.data, 'blogs---->');

    return (
        <>
            <section className="mt-4">
                <Container>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="">
                            <h2>Blogs</h2>
                        </div>
                        <span to='/' className="add-new_btn gap-1" onClick={() => setAddPopUp(true)}>
                            <GoPlus />
                            Add Blog
                        </span>
                    </div>

                    <br />

                    <div className="d-flex">
                        {" "}
                        <div className="action-inputs_div">
                            <input
                                type="text"
                                placeholder="Search"
                                value={builderSearch}
                                // onChange={(e) => setBuilderSearch(e.target.value)}
                                onChange={handleBuilderSearchInputChange}
                                className="action-inputs"
                            />
                            <span className="action-inputs_icon"><BiSearchAlt2 /></span>
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
                                    <th>
                                        <input type="checkbox" />
                                    </th>
                                    <th className="table_th">#</th>
                                    <th className="table_th">BLOG NAME</th>
                                    <th className="table_th">POSTED BY</th>
                                    <th className="table_th">DATE</th>
                                    <th className="table_th">Active</th>
                                    <th className="table_th">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data?.data?.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>{index + 1}</td>

                                        <td className="td-popUp_link">
                                            {item.blogName}
                                        </td>
                                        <td>{item.postedByName}</td>
                                        <td>{item.blogDate}</td>
                                        <td>
                                            <Form.Check // prettier-ignore
                                                type="switch"
                                                // id={item._id}
                                                label=""
                                                isActive={isActive}
                                                onChange={(e) => handleToggle(item._id)}
                                            />
                                        </td>
                                        <td className="d-flex gap-2">
                                            <BiEdit className="action_btn-1" onClick={() => setViewPopUp(true)} />
                                            <Button variant="transparent" className="p-0">
                                                <BsTrash3 onClick={(e) => handleDelete(item._id)}/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
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
            <ViewBlog
                show={viewPopUp}
                onHide={() => setViewPopUp(false)}
            />
            <AddBlog
                show={addPopUp}
                onHide={() => setAddPopUp(false)}
            />
        </>
    );
};

export default Blogs;