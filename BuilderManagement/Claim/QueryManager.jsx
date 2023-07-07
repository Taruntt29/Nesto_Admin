import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { HiPencilAlt } from "react-icons/hi";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";
import { getAPI } from "../BuilderApi/BuilderApiRequest";
import QueryPop from "./QueryPop";
const QueryManager = () => {
  const [queryPop, setQueryPop] = useState(false);
  const [queryData, setQueryData] = useState([]);
  useEffect(() => {
    // debugger;
    const getQuery = async () => {
      const response = await getAPI(
        `${apiEndpoints.getAllRaiseQuery}${props.builder._id}`
      );

      // console.log(response.data);
      setQueryData(response.data);
    };

    getQuery();
  }, []);

  const recentQuery = queryData.map((data, index) => {
    return (
      <Accordion.Item eventKey={index} key={data._id} className="my-3">
        <Accordion.Header>{data?.subject}</Accordion.Header>
        <Accordion.Body>
          {data?.description}
          <div className="d-flex justify-content-between">
            <p style={{ color: "#278FD9" }}>By Tarun Tiwari.</p>
            <Button
              className="rounded-pill gap-2"
              style={{ background: " #FFFFFF", color: "#282431" }}
              onClick={() => {
                setQueryPop(true);
              }}
            >
              <HiPencilAlt />
              Write Answer
            </Button>
          </div>
          <QueryPop show={queryPop} onChange={setQueryPop} />
        </Accordion.Body>
        <br />
      </Accordion.Item>
    );
  });

  return (
    <>
      {" "}
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
          <h3>Query Manage</h3>

          {/* <p>Showing:10 Broker Management</p> */}
          {/* <br /> */}
          <Accordion defaultActiveKey="0">{recentQuery}</Accordion>
        </Container>
      </section>
    </>
  );
};
export default QueryManager;
