import React from "react";
import { Col, Container, Row, Tab } from "react-bootstrap";
import { adminMainContent } from "../../../data/adminMainContent";
import "./AdminMain.css";

const AdminMain = ({ activeTab, tabs }) => {
  return (
    <main className="NESTO__admin__main flex-grow-1">
      <Tab.Container activeKey={activeTab}>
        <Container fluid>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                {tabs.map((tab, index) => {
                  if (tab.dropdownItems) {
                    return tab.dropdownItems.map((item, dropdownItemsIndex) => {
                      return (
                        <Tab.Pane key={item.id} eventKey={item.id}>
                          {
                            adminMainContent[index]?.dropdownItemsContent[
                              dropdownItemsIndex
                            ]?.element
                          }

                          {/* {React.cloneElement(adminMainContent[index]?.element)} */}
                        </Tab.Pane>
                      );
                    });
                  } else {
                    return (
                      <Tab.Pane key={tab.id} eventKey={tab.id}>
                        {adminMainContent[index]?.element}
                        {/* {React.cloneElement(adminMainContent[index]?.element)} */}
                      </Tab.Pane>
                    );
                  }
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </main>
  );
};

export default AdminMain;
