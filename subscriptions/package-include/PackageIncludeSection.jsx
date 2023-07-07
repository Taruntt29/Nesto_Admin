import React, { useState } from 'react';
import { Form, Col, Container } from 'react-bootstrap';

const PackageIncludeSection = () => {
  const [packageIncludeSectionChecked, setPackageIncludeSectionChecked] =
    useState({
      paidVisitsChecked: false,
      bannerChecked: false,
      flashScreenChecked: false,
    });

  const handlePackageIncludeSectionChecked = e => {
    const { name, checked } = e.target;
    console.log(name, checked);
    console.log(packageIncludeSectionChecked);
    setPackageIncludeSectionChecked({
      ...packageIncludeSectionChecked,
      [name]: checked,
    });
  };

  return (
    <Container>
      <Form.Group controlId="paidVisitsCheckbox">
        <Form.Check
          type="checkbox"
          label="Paid Visits"
          checked={packageIncludeSectionChecked.paidVisitsChecked}
          onChange={handlePackageIncludeSectionChecked}
          name="paidVisitsChecked"
        />
      </Form.Group>

      {packageIncludeSectionChecked.paidVisitsChecked && (
        <Form.Row>
          <Form.Group as={Col} controlId="amountPerVisit">
            <Form.Label>Amount Per Visit</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group as={Col} controlId="noOfPaidVisits">
            <Form.Label>No. Paid Visits</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
        </Form.Row>
      )}

      <Form.Group controlId="bannerCheckbox">
        <Form.Check
          type="checkbox"
          label="Banner"
          checked={packageIncludeSectionChecked.bannerChecked}
          onChange={handlePackageIncludeSectionChecked}
          name="bannerChecked"
        />
      </Form.Group>

      {packageIncludeSectionChecked.bannerChecked && (
        <Form.Group controlId="bannerDuration">
          <Form.Label>Banner Duration</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      )}

      <Form.Group controlId="flashScreenCheckbox">
        <Form.Check
          type="checkbox"
          label="Flash Screen"
          checked={packageIncludeSectionChecked.flashScreenChecked}
          onChange={handlePackageIncludeSectionChecked}
          name="flashScreenChecked"
        />
      </Form.Group>

      {packageIncludeSectionChecked.flashScreenChecked && (
        <Form.Group controlId="flashScreenDuration">
          <Form.Label>Flash Screen Duration</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      )}
    </Container>
  );
};

export default PackageIncludeSection;
