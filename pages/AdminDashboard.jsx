import { useState } from 'react';
import { AdminHeader, AdminMain, AdminSidebar } from '../features';
import { Col, Container, Row } from 'react-bootstrap';
import { tabs } from '../data/sidebarTabs';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabSelect = tab => {
    setActiveTab(tab);
  };

  return (
    <>
      <AdminHeader />
      <Container fluid className="d-flex flex-row">
        <AdminSidebar
          activeTab={activeTab}
          handleTabSelect={handleTabSelect}
          tabs={tabs}
        />
        <AdminMain activeTab={activeTab} tabs={tabs} />
      </Container>
    </>
  );
};

export default AdminDashboard;
