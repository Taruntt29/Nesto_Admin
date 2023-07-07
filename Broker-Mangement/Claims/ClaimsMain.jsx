import { Container, Tab, Tabs } from "react-bootstrap";
import History from "./ClaimsHistory";
import Queries from "./LoanQueries";
import Eligible from "./EligibleClaims";

const ClaimsMain = (params) => {

  const selectedClaims_id = params.rowData._id


  return (
    <>
      <section className="  ">
        <Container className="">
          <Tabs
            defaultActiveKey="eligible"
            id="fill-tab-example"
            className=""
            fill
          >
            <Tab eventKey="eligible" title="Eligible Claims">
              <Eligible slectedClaims={selectedClaims_id} />
            </Tab>

            <Tab eventKey="claims" title="Claims History">
              <History slectedClaims={selectedClaims_id} />
            </Tab>
            <Tab eventKey="loan" title="Loan Queries">
              <Queries slectedClaims={selectedClaims_id} />
            </Tab>
          </Tabs>
        </Container>
      </section>
    </>
  );
};

export default ClaimsMain;
