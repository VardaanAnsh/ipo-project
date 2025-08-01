import React from 'react';
import IpoTable from '../components/IpoTable';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <h4 className="fw-bold mb-3">Upcoming IPO | Dashboard</h4>
      <IpoTable />
    </Layout>
  );
};

export default Dashboard;
