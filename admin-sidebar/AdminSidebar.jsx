import { Nav, Collapse } from "react-bootstrap";
import { ShadowIcon } from "../../../components";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useState } from "react";
import "./AdminSidebar.css";

const AdminSidebar = ({ activeTab, handleTabSelect, tabs }) => {
  const [collapsedItems, setIsCollapsedItems] = useState({
    isCollapsed: true,
    builderManagementIsCollapsed: true,
    brokerManagementIsCollapsed: true,
  });
  const propertyManagementTab = tabs.find((tab) => tab.id === "5");
  const builderManagementTab = tabs.find((tab) => tab.id === "4");
  const { dropdownItems } = propertyManagementTab;
  const { dropdownItems: builderDropdownItems } = builderManagementTab;
  const brokerManagementTab = tabs.find((tab) => tab.id === "6");
  const { dropdownItems: brokerDropdownItems } = brokerManagementTab;
  return (
    <aside className="NESTO__admin__sidebar overflow-auto p-3 flex-shrink-0">
      <Nav variant="pills" className="flex-column gap-1">
        {tabs.map((tab) => {
          if (tab.id === "5") {
            return (
              <Nav.Item
                key={tab.id}
                className={!collapsedItems.isCollapsed ? "collapse-shadow" : ""}
              >
                <Nav.Link
                  onClick={() =>
                    setIsCollapsedItems((prevCollapsedItems) => ({
                      ...prevCollapsedItems,
                      isCollapsed: !collapsedItems.isCollapsed,
                    }))
                  }
                  className="d-flex align-items-center gap-2 rounded-0"
                >
                  <ShadowIcon icon={tab.icon} bgColor="bg-white" />
                  {tab.title}
                  {collapsedItems.isCollapsed && (
                    <HiChevronDown size={22} className="ms-auto" />
                  )}
                  {!collapsedItems.isCollapsed && (
                    <HiChevronUp size={22} className="ms-auto" />
                  )}
                </Nav.Link>
                <Collapse in={!collapsedItems.isCollapsed}>
                  <div>
                    <Nav variant="pills" className="flex-column gap-1">
                      {dropdownItems.map((item) => (
                        <Nav.Item key={item.id}>
                          <Nav.Link
                            eventKey={item.id}
                            active={activeTab === item.id}
                            onClick={() => handleTabSelect(item.id)}
                            className="d-flex align-items-center gap-2 rounded-0 ms-3"
                          >
                            {item.icon}
                            {item.title}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </div>
                </Collapse>
              </Nav.Item>
            );
          }
          if (tab.id === "4") {
            return (
              <Nav.Item
                key={tab.id}
                className={
                  !collapsedItems.builderManagementIsCollapsed
                    ? "collapse-shadow"
                    : ""
                }
              >
                <Nav.Link
                  onClick={() =>
                    setIsCollapsedItems((prevCollapsedItems) => ({
                      ...prevCollapsedItems,
                      builderManagementIsCollapsed:
                        !collapsedItems.builderManagementIsCollapsed,
                    }))
                  }
                  className="d-flex align-items-center gap-2 rounded-0"
                >
                  <ShadowIcon icon={tab.icon} bgColor="bg-white" />
                  {tab.title}
                  {collapsedItems.builderManagementIsCollapsed && (
                    <HiChevronDown size={22} className="ms-auto" />
                  )}
                  {!collapsedItems.builderManagementIsCollapsed && (
                    <HiChevronUp size={22} className="ms-auto" />
                  )}
                </Nav.Link>
                <Collapse in={!collapsedItems.builderManagementIsCollapsed}>
                  <div>
                    <Nav variant="pills" className="flex-column gap-1">
                      {builderDropdownItems.map((item) => (
                        <Nav.Item key={item.id}>
                          <Nav.Link
                            eventKey={item.id}
                            active={activeTab === item.id}
                            onClick={() => handleTabSelect(item.id)}
                            className="d-flex align-items-center gap-2 rounded-0 ms-3"
                          >
                            {item.icon}
                            {item.title}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </div>
                </Collapse>
              </Nav.Item>
            );
          }
          if (tab.id === "6") {
            return (
              <Nav.Item
                key={tab.id}
                className={
                  !collapsedItems.brokerManagementIsCollapsed
                    ? "collapse-shadow"
                    : ""
                }
              >
                <Nav.Link
                  onClick={() =>
                    setIsCollapsedItems((prevCollapsedItems) => ({
                      ...prevCollapsedItems,
                      brokerManagementIsCollapsed:
                        !collapsedItems.brokerManagementIsCollapsed,
                    }))
                  }
                  className="d-flex align-items-center gap-2 rounded-0"
                >
                  <ShadowIcon icon={tab.icon} bgColor="bg-white" />
                  {tab.title}
                  {collapsedItems.brokerManagementIsCollapsed && (
                    <HiChevronDown size={22} className="ms-auto" />
                  )}
                  {!collapsedItems.brokerManagementIsCollapsed && (
                    <HiChevronUp size={22} className="ms-auto" />
                  )}
                </Nav.Link>
                <Collapse in={!collapsedItems.brokerManagementIsCollapsed}>
                  <div>
                    <Nav variant="pills" className="flex-column gap-1">
                      {brokerDropdownItems.map((item) => (
                        <Nav.Item key={item.id}>
                          <Nav.Link
                            eventKey={item.id}
                            active={activeTab === item.id}
                            onClick={() => handleTabSelect(item.id)}
                            className="d-flex align-items-center gap-2 rounded-0 ms-3"
                          >
                            {item.icon}
                            {item.title}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </div>
                </Collapse>
              </Nav.Item>
            );
          }
          return (
            <Nav.Item key={tab.id}>
              <Nav.Link
                eventKey={tab.id}
                active={activeTab === tab.id}
                onClick={() => handleTabSelect(tab.id)}
                className="d-flex align-items-center gap-2 rounded-0"
              >
                <ShadowIcon icon={tab.icon} bgColor="bg-white" />
                {tab.title}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </aside>
  );
};

export default AdminSidebar;
