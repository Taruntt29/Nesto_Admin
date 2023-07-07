import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { apiEndpoints } from "./BuilderApi/BuilderApiEndpoint";
import { getAPI } from "./BuilderApi/BuilderApiRequest";

const NewSubscription = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSubscription = async () => {
      const response = await getAPI(apiEndpoints.getAllSubscriptionOrder);
      setData(response.data);
    };

    getSubscription();
  }, []);

  const listData = data.map((itm, index) => (
    <tr key={itm}>
      <th>
        <input type="checkbox" />
      </th>
      <td>{index + 1}</td>
      <td>{itm?._id}</td>
      <td>{itm?.builderId?.name}</td>
      <td>{itm?.planId?.name}</td>
      <td>{itm?.planId?.name}</td>
      <td>
        {itm?.selectProperties?._id}

        <div>
          {itm?.selectProperties.map((itm) => (
            <p>{itm.name}</p>
          ))}
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <Modal
        {...props}
        onHide={() => {
          props.onChange(false);
        }}
        size="lg"
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="builder-details_modal">
          <Modal.Title className="">
            <span className="builder-details_modal_heading">
              No. of Subscriber
            </span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
                  <th>ID</th>
                  <th>BUILDER NAME</th>
                  <th>SUBSCRIPTION NAME</th>
                  <th>PLAN NAME </th>
                  <th>NO. OF PROPERTIES</th>
                </tr>
              </thead>
              <tbody>{listData}</tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewSubscription;
