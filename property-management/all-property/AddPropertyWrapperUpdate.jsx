import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import AddPropertyUpdate from './AddPropertyUpdate';
import AddPropertyFloorPlanUpdate from './AddPropertyFloorPlanUpdate';
import AddPropertyBrokerageUpdate from './AddPropertyBrokerageUpdate';
import { useState } from 'react';
import './PropertyManagement.css';

const AddPropertyWrapperUpdate = ({ getPropertyByIdData }) => {
  const [addPropertySteps, setAddPropertySteps] = useState({
    addNewProperty: false,
    addFloorPlan: false,
    addBrokerage: false,
    mainId: null,
    propertyTypeCategory: 'commercial',
  });

  return (
    <>
      <section className="NESTO__admin__main__add__property__section NESTO__admin__main__add__property__form m-3 px-4 py-2 pb-5">
        <Container className="NESTO__admin__main__add__property">
          <Row>
            <Col xs={12}>
              <h1 className="NESTO__admin__main__title pt-3 mb-4">
                Update Property
              </h1>
            </Col>
            <Col
              xs={12}
              className="d-flex mb-5 NESTO__admin__main__add__property__steps__column"
            >
              <ButtonGroup
                className="NESTO__admin__main__add__property__steps mx-auto gap-4 px-4 py-2"
                // vertical
              >
                <Button
                  className={`rounded-circle position-relative border-0 d-flex justify-content-center align-items-center  ${
                    (addPropertySteps.addNewProperty &&
                      !addPropertySteps.addFloorPlan &&
                      !addPropertySteps.addBrokerage) ||
                    (addPropertySteps.addNewProperty &&
                      addPropertySteps.addFloorPlan)
                      ? 'active-step-success'
                      : ''
                  } ${
                    !addPropertySteps.addNewProperty &&
                    !addPropertySteps.addFloorPlan &&
                    !addPropertySteps.addBrokerage
                      ? 'active-step'
                      : ''
                  }`}
                >
                  1
                  {/* <span className="position-absolute top-100 translate-middle-y ms-3 start-50 translate-middle-x w-100">
                    Property Description
                  </span> */}
                </Button>
                <Button
                  className={`rounded-circle position-relative border-0 d-flex justify-content-center align-items-center  ${
                    addPropertySteps.addNewProperty &&
                    addPropertySteps.addFloorPlan &&
                    !addPropertySteps.addBrokerage
                      ? 'active-step-success'
                      : ''
                  } ${
                    addPropertySteps.addNewProperty &&
                    !addPropertySteps.addFloorPlan &&
                    !addPropertySteps.addBrokerage
                      ? 'active-step'
                      : ''
                  }`}
                >
                  2
                  {/* <span className="position-absolute top-100 translate-middle-y ms-3 start-50 translate-middle-x w-100">
                    Floor Plan
                  </span> */}
                </Button>
                <Button
                  className={`rounded-circle position-relative border-0 d-flex justify-content-center align-items-center  ${
                    addPropertySteps.addNewProperty &&
                    addPropertySteps.addFloorPlan &&
                    addPropertySteps.addBrokerage
                      ? 'active-step-success'
                      : ''
                  } ${
                    addPropertySteps.addNewProperty &&
                    addPropertySteps.addFloorPlan &&
                    !addPropertySteps.addBrokerage
                      ? 'active-step'
                      : ''
                  }`}
                >
                  3{' '}
                  {/* <span className="position-absolute top-100 translate-middle-y ms-3 start-50 translate-middle-x w-100">
                    Brokerage
                  </span> */}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
        {!addPropertySteps.addNewProperty &&
          !addPropertySteps.addFloorPlan &&
          !addPropertySteps.addBrokerage && (
            <AddPropertyUpdate setAddPropertySteps={setAddPropertySteps} />
          )}

        {!addPropertySteps.addFloorPlan &&
          !addPropertySteps.addBrokerage &&
          addPropertySteps.addNewProperty && (
            <AddPropertyFloorPlanUpdate
              propertyTypeCategory={addPropertySteps.propertyTypeCategory}
              mainId={addPropertySteps.mainId}
              setAddPropertySteps={setAddPropertySteps}
            />
          )}

        {!addPropertySteps.addBrokerage &&
          addPropertySteps.addNewProperty &&
          addPropertySteps.addFloorPlan && (
            <AddPropertyBrokerageUpdate
              id={addPropertySteps.mainId}
              setAddPropertySteps={setAddPropertySteps}
            />
          )}
      </section>
    </>
  );
};

export default AddPropertyWrapperUpdate;
