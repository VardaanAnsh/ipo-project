import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IpoContext } from '../context/IpoContext';
import { useNavigate } from 'react-router-dom';


const formatDate = (dateStr) => {
  if (!dateStr) return '--';
  const date = new Date(dateStr);
  if (isNaN(date)) return '--';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};



const statusBadge = (status) => {
  switch (status) {
    case "Ongoing": return <span className="badge rounded-pill bg-success px-3 py-2">{status}</span>;
    case "Upcoming": return <span className="badge rounded-pill bg-warning text-dark px-3 py-2">{status}</span>;
    case "New Listed": return <span className="badge rounded-pill bg-danger px-3 py-2">{status}</span>;
    default: return <span className="badge rounded-pill bg-secondary px-3 py-2">{status}</span>;
  }
};

const IpoTable = () => {
  const { ipos , loading , deleteIPO  } = useContext(IpoContext);
  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }
  return (
    <div className="table-responsive shadow rounded-4 p-3 bg-white">
      <table className="table table-borderless align-middle">
        <thead className="bg-light text-secondary small text-uppercase">
          <tr>
            <th>Company</th>
            <th>Price Band</th>
            <th>Open</th>
            <th>Close</th>
            <th>Issue Size</th>
            <th>Issue Type</th>
            <th>Listing Date</th>
            <th>Status</th>
            <th>Action</th>
            <th>Delete/View</th>
          </tr>
        </thead>
        <tbody>
  {ipos.map((ipo) => (
    <tr key={ipo.id}>
      <td><strong>{ipo.company_name || ipo.companyName || '--'}</strong></td>
      <td>{ipo.price_band || ipo.priceBand || '--'}</td>
      <td>{formatDate(ipo.open_date || ipo.openDate)}</td>
      <td>{formatDate(ipo.close_date || ipo.closeDate)}</td>
      <td>{ipo.issue_size || ipo.issueSize || '--'}</td>
      <td>{ipo.issue_type || ipo.issueType || '--'}</td>
      <td>{formatDate(ipo.listing_date || ipo.listingDate)}</td>
      <td>{statusBadge(ipo.status || ipo.status)}</td>
      <td>
        <Link to={`/edit/${ipo.id}`} className="btn btn-sm btn-primary rounded-pill px-3">Update</Link>
      </td>
      <td>
        <button
  className="btn btn-sm btn-danger rounded-circle me-2"
  onClick={() => {
    if (window.confirm('Are you sure you want to delete this IPO?')) {
      deleteIPO(ipo.id);
    }
  }}
>
  🗑
</button>

        <Link to={`/ipo/${ipo.id}`} className="btn btn-sm btn-secondary rounded-circle">👁</Link>
      </td>
    </tr>
  ))}
</tbody>


      </table>
    </div>
  );
};

export default IpoTable;
