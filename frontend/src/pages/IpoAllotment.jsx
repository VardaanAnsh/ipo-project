// src/pages/IpoAllotment.jsx
import React from 'react';
import Layout from '../components/Layout';

const mockAllotments = [
  {
    id: 1,
    companyName: "ABC Tech Ltd",
    listingGain: "₹80 (40%)",
    returnPercent: "+42%",
    status: "Allotted",
  },
  {
    id: 2,
    companyName: "XYZ Industries",
    listingGain: "₹20 (10%)",
    returnPercent: "+12%",
    status: "Not Allotted",
  },
  {
    id: 3,
    companyName: "Fusion Power",
    listingGain: "₹0",
    returnPercent: "-3%",
    status: "Pending",
  },
];

const IpoAllotment = () => {
  return (
    <Layout>
      <div className="container-fluid bg-body-tertiary p-4 rounded-4 shadow-sm">
        <h4 className="fw-bold mb-4">IPO Allotment Results</h4>

        <div className="table-responsive">
          <table className="table table-bordered bg-white shadow-sm align-middle rounded">
            <thead className="table-light">
              <tr>
                <th>Company</th>
                <th>Listing Gain</th>
                <th>Return %</th>
                <th>Allotment Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAllotments.map((ipo) => (
                <tr key={ipo.id}>
                  <td className="fw-semibold">{ipo.companyName}</td>
                  <td>{ipo.listingGain}</td>
                  <td className={ipo.returnPercent.includes('-') ? 'text-danger' : 'text-success'}>
                    {ipo.returnPercent}
                  </td>
                  <td>
                    <span className={
                      ipo.status === 'Allotted' ? 'badge bg-success' :
                      ipo.status === 'Not Allotted' ? 'badge bg-danger' :
                      'badge bg-secondary'
                    }>
                      {ipo.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-muted mt-3">* Data shown above is mock. Live data will be connected later.</p>
      </div>
    </Layout>
  );
};

export default IpoAllotment;
