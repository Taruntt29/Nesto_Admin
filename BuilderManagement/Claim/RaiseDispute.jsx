import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { HiPencilAlt } from "react-icons/hi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";
import { getAPI } from "../BuilderApi/BuilderApiRequest";
import RaisePop from "./RaisePop";
const RaiseDispute = (props) => {
  const goBack = () => {
    props.onHide(false);
  };
  const [dispute, setDispute] = useState(false);
  const [raiseData, setRaiseData] = useState([]);
  useEffect(() => {
    // debugger;
    const getQuery = async () => {
      const response = await getAPI(apiEndpoints.getAllRaiseDispute);

      // console.log(response.data);s
      setRaiseData(response.data);
    };

    getQuery();
  }, []);

  const recentQuery = raiseData.map((data, index) => {
    return (
      <Accordion.Item eventKey={index} key={data._id} className="my-3">
        <Accordion.Header>{data.reason}</Accordion.Header>
        <Accordion.Body>
          {data.comments}
          <div className="d-flex justify-content-between">
            <p style={{ color: "#278FD9" }}>By {data.builderId.name}</p>
            <span className="d-flex justify-content-end gap-2 mt-2">
              <Button
                variant="outline-success "
                className="rounded-pill justify-content-end"
              >
                Bought
              </Button>
              <Button
                className="rounded-pill gap-2"
                style={{ background: " #FFFFFF", color: "#282431" }}
                onClick={() => {
                  setDispute(true);
                }}
              >
                <HiPencilAlt />
                Write Answer
              </Button>
            </span>
          </div>
          <RaisePop show={dispute} onChange={setDispute} />
        </Accordion.Body>
      </Accordion.Item>
    );
  });

  return (
    <>
      {/* <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4"> */}
      <Container>
        <div className="d-flex">
          <button onClick={goBack}>
            <MdOutlineArrowBackIosNew size={34} />
          </button>
          <h3>Raise Dispute Question</h3>
        </div>

        <br />
        {/* <p>Showing:10 Broker Management</p> */}
        {/* <br /> */}
        <Accordion defaultActiveKey="0">{recentQuery}</Accordion>
      </Container>
      {/* </section> */}
    </>
  );
};
export default RaiseDispute;
