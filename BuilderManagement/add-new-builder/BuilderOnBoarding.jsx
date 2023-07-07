import { useState } from 'react';
import AddNewBuilder from './AddNewBuilderNew';
import AddBuilderPastProperty from './AddBuilderPastProperty';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './BuilderOnBoarding.css';
const BuilderOnBoarding = () => {
  const builderOnboardingStep = useSelector(
    state => state.builder.builderOnBoardingStep
  );

  return (
    <section className="NESTO__admin__main__add__property__section NESTO__admin__main__add__property__form m-3 px-4 py-2 pb-5">
      <Container>
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <div className="builder-onboarding-step rounded-pill py-2 px-4 d-flex justify-content-center align-items-center gap-4">
              <div className="builder-onboarding-step-content d-flex align-items-center gap-3">
                <div
                  className={`builder-onboarding-step-content-circle rounded rounded-circle d-flex justify-content-center align-items-center ${
                    !builderOnboardingStep ? `default-step` : `success-step`
                  }`}
                >
                  1
                </div>
                <span>Onboarding</span>
              </div>
              <div className="builder-onboarding-step-content d-flex align-items-center gap-3">
                <div className="builder-onboarding-step-content-circle rounded rounded-circle d-flex justify-content-center align-items-center default-step">
                  2
                </div>
                <span>Property Description</span>
              </div>
            </div>
          </Col>
          <Col xs={12}>{!builderOnboardingStep && <AddNewBuilder />}</Col>
          <Col xs={12}>
            {builderOnboardingStep && <AddBuilderPastProperty />}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BuilderOnBoarding;
