import { Container, Tab, Tabs } from "react-bootstrap";
import "./Property.css";

import AllVisits from "./AllVisits";
import PromotedVisits from "./PromotedVisits";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
const Property = (props) => {
  const goBack = () => {
    props.onHide(false);
  };
  return (
    <>
      {/* <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4"> */}
      {/* <Container className="d-flex"> */}
      <Container className="d-flex pt-2 pb-2 dashboard__wrapper">
        <div>
          <button onClick={goBack}>
            <MdOutlineArrowBackIosNew size={44} />
          </button>
        </div>
        <div>
          <Tabs
            defaultActiveKey="visits"
            id="dashboard-tabs"
            className="mb-2 p-3 rounded-pill flex-column flex-sm-row"
            fill
          >
            <Tab eventKey="visits" title="All Visits">
              <AllVisits />
            </Tab>

            <Tab eventKey="promoted" title="Promoted Visits">
              <PromotedVisits />
            </Tab>
          </Tabs>
        </div>
        {/* </Container> */}
      </Container>
      {/* </section> */}
    </>
  );
};

export default Property;
