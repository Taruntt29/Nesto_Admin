import { Container, Tab, Tabs } from 'react-bootstrap';
// import Eligible from "./Eligible";
import History from './History';
import Queries from './Queries';
// import "./Property.css";

const Claim = () => {
  return (
    <>
      {' '}
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container className="pt-5 pb-4 dashboard__wrapper">
          <h3 className="heading"> Claim</h3>

          <Tabs
            defaultActiveKey="eligible"
            id="fill-tab-example"
            className="rounded-pill  mb-3 mx-auto "
            fill
          >
            <Tab eventKey="eligible" title="Eligible Claims">
              {/* <Eligible /> */}
            </Tab>

            <Tab eventKey="claims" title="Claims History">
              <History />
            </Tab>
            <Tab eventKey="loan" title="Loan Queries">
              <Queries />
            </Tab>
          </Tabs>
        </Container>
      </section>
    </>
  );
};

export default Claim;
