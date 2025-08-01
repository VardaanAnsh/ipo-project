// src/pages/IpoSubscription.jsx
import React from 'react';
import Layout from '../components/Layout';
import 'bootstrap-icons/font/bootstrap-icons.css';

const mockSubscriptions = [
  {
    id: 1,
    companyName: "ABC Tech Ltd",
    qib: "12.56x",
    nii: "18.20x",
    retail: "7.85x",
    total: "13.45x",
    status: "Closed"
  },
  {
    id: 2,
    companyName: "XYZ Industries",
    qib: "5.20x",
    nii: "10.75x",
    retail: "9.40x",
    total: "8.45x",
    status: "Ongoing"
  },
  {
    id: 3,
    companyName: "Fusion Power",
    qib: "1.25x",
    nii: "3.30x",
    retail: "2.15x",
    total: "2.23x",
    status: "Ongoing"
  }
];

const IpoSubscription = () => {
  return (
    <Layout>
      <div className="container-fluid bg-body-tertiary p-4 rounded-4 shadow-sm">
        <h4 className="fw-bold mb-4">IPO Subscription Status</h4>
        
        <div className="table-responsive">
          <table className="table table-bordered align-middle bg-white shadow-sm rounded">
            <thead className="table-light">
              <tr>
                <th>Company Name</th>
                <th>QIB</th>
                <th>NII</th>
                <th>Retail</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockSubscriptions.map((ipo) => (
                <tr key={ipo.id}>
                  <td className="fw-semibold">{ipo.companyName}</td>
                  <td>{ipo.qib}</td>
                  <td>{ipo.nii}</td>
                  <td>{ipo.retail}</td>
                  <td className="fw-bold">{ipo.total}</td>
                  <td>
                    <span className={`badge ${ipo.status === "Closed" ? "bg-danger" : "bg-success"}`}>
                      {ipo.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-muted mt-3">
          * Data shown is mock. I’ll connect live subscription data from backend/database shortly*.
        </p>
      </div>
    </Layout>
  );
};

export default IpoSubscription;
