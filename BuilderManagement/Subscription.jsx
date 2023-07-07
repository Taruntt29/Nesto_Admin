import { Table, Button, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
// import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/all";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import SubscriptionPop from "./SubscriptionPop";
import NewSubscription from "./NewSubscription";
import ListedSubscription from "./ListedSubscription";
import TablePagination from "@mui/material/TablePagination";
import AddSubscription from "./PropertyList/AddSubscription";
import SubmitSubscription from "./SubmitSubscription";
import { apiEndpoints } from "./BuilderApi/BuilderApiEndpoint";
import { getAPI } from "./BuilderApi/BuilderApiRequest";

const Subscription = () => {
  const [showSubscription, setShowSubscription] = useState(false);
  const [newSubscription, setNewSubscription] = useState(false);
  const [listedSubscription, setListedSubscription] = useState(false);
  const [addSubscription, setAddSubscription] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [data, setData] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState("");
  useEffect(() => {
    const getSubscription = async () => {
      const response = await getAPI(`${apiEndpoints.getAllSubscription}`);
      // console.log(response.data);

      setData(response.data);
      // setFilterData(response.data);
    };

    getSubscription();
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
    return (
      <tr key={itm._id}>
        <th>
          <input type="checkbox" />
        </th>
        <td>{index + 1}</td>
        <td
          style={{ color: "#0686E1" }}
          onClick={() => {
            setSubscriptionId(itm._id);
            setShowSubscription(true);
          }}
        >
          {itm?.subscriptionName}
        </td>
        <td style={{ color: "#D12953" }}>{itm?.price}</td>

        <td> {itm.durationIndays}</td>
        <td
          style={{ color: "#0686E1" }}
          onClick={() => {
            setListedSubscription(true);
          }}
        >
          {itm.numberOfproperty}
        </td>
        <td>{itm.numberOfVisit}</td>

        {/* <td
          style={{ color: "#0686E1" }}
          onClick={() => {
            setNewSubscription(true);
          }}
        >
          {itm?.noOfSubscriptions}
        </td> */}
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
          {!addSubscription && (
            <div className="d-flex justify-content-between">
              <h3>Subscription</h3>
              {/* <span className="mb-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setAddSubscription(true);
                  }}
                >
                  <IoIosAdd size={25} />
                  Add Subscription
                </Button>
              </span> */}
            </div>
          )}
          <br />
          {!addSubscription && (
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
                    <th>SUBSCRIPTION NAME</th>
                    <th>PRICE</th>
                    <th>DURATION IN DAYS</th>
                    <th>LISTED PROPERTIES</th>
                    <th>PLAN INCLUDE</th>

                    {/* <th>NO. OF SUBSCRIBER</th> */}
                    <th>STATUS </th>
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
          )}
          {addSubscription && (
            <AddSubscription
              onSubmit={setShowSubmit}
              show={addSubscription}
              onHide={setAddSubscription}
            />
          )}
          <SubmitSubscription show={showSubmit} onHide={setShowSubmit} />
          <SubscriptionPop
            id={subscriptionId}
            show={showSubscription}
            onHide={setShowSubscription}
            onChange={setShowSubscription}
          />
          <NewSubscription
            show={newSubscription}
            onChange={setNewSubscription}
          />
          <ListedSubscription
            show={listedSubscription}
            onChange={setListedSubscription}
          />
        </Container>
      </section>
    </>
  );
};

export default Subscription;
