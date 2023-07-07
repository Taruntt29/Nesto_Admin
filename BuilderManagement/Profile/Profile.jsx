import { Container, Tab, Tabs } from "react-bootstrap";
import Claim from "../Claim/Claim";
import QueryManager from "../Claim/QueryManager";
import RaiseDispute from "../Claim/RaiseDispute";
import Invoice from "../Invoice";
import AddNewBuilder from "../Onboard/AddNewBuilder";
import BuilderPop from "../Onboard/BuilderPop";
import Subscription from "../Subscription";
import { Link } from "react-router-dom";
import PropertyEditRequest from "./PropertyEditRequest";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

// import History from "./History";
// import Queries from "./Queries";
const Profile = (props) => {
  const goBack = () => {
    props.onHide(false);
  };
  return (
    <>
      {/* <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4"> */}
      <div className="d-flex">
        <button onClick={goBack}>
          <MdOutlineArrowBackIosNew size={34} />
        </button>
        <h1> {props?.builder?.name}</h1>
      </div>
      <Container className="pt-3 pb-4 dashboard__wrapper">
        <Tabs
          defaultActiveKey="Profile"
          id="fill-tab-example"
          className="rounded-pill  mb-3 mx-auto "
          fill
        >
          <Tab eventKey="Profile" title="Profile">
            <BuilderPop builder={props.builder} />
          </Tab>

          <Tab eventKey="Properties" title="Properties">
            {/* <Claim /> */}
            <AddNewBuilder onHide={props.onHide} builder={props.builder} />
          </Tab>
          <Tab eventKey="Invoices" title="Invoices">
            <Invoice builder={props.builder} />
          </Tab>
          <Tab eventKey="Subscription" title="Subscription">
            <Subscription builder={props.builder} />
          </Tab>

          <Tab eventKey="Queries" title="Queries">
            <QueryManager builder={props.builder} />
          </Tab>
          <Tab eventKey="Request" title="Property Edit Request">
            <PropertyEditRequest builder={props.builder} />
          </Tab>
        </Tabs>
      </Container>
      {/* </section> */}
    </>
  );
};
export default Profile;
