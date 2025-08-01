// src/pages/IpoDetail.jsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IpoContext } from '../context/IpoContext';
import Layout from '../components/Layout';
import 'bootstrap-icons/font/bootstrap-icons.css';

const IpoDetail = () => {
  const { id } = useParams();
  const { ipos } = useContext(IpoContext);
  const ipo = ipos.find((item) => item.id === parseInt(id));
  const navigate = useNavigate();

  if (!ipo)
    return (
      <Layout>
        <div className="text-center py-5">IPO Not Found</div>
      </Layout>
    );

  // Status color badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'success';
      case 'Upcoming':
        return 'warning';
      case 'New Listed':
        return 'danger';
      default:
        return 'secondary';
    }
  };
  const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


  return (
    <Layout>
      <div className="container-fluid py-4 px-3 px-md-5 bg-body-tertiary min-vh-100">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
          <h3 className="fw-bold">IPO Detail - {ipo.companyName}</h3>
          <button
            className="btn btn-outline-dark d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm"
            onClick={() => navigate('/')}
          >
            <i className="bi bi-arrow-left"></i> Back
          </button>
        </div>

        <div className="row g-4">
          {/* Left Info Card */}
          <div className="col-12 col-md-4">
            <div className="bg-white p-4 shadow-sm rounded-4 h-100 border border-light-subtle text-center text-md-start">
              {ipo.logo ? (
                <img
                  src={URL.createObjectURL(ipo.logo)}
                  alt="Logo"
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: '100px', objectFit: 'contain' }}
                />
              ) : (
                <div
                  className="bg-light d-flex align-items-center justify-content-center rounded mb-3"
                  style={{ height: '100px' }}
                >
                  <i className="bi bi-image text-secondary fs-1"></i>
                </div>
              )}
              <h5 className="fw-bold mb-2">{ipo.companyName}</h5>
              <p className="mb-1">
                <strong>Price Band:</strong> ₹{ipo.priceBand}
              </p>
              <p className="mb-1">
                <strong>Issue Size:</strong> {ipo.issueSize} Cr.
              </p>
              <p className="mb-1">
                <strong>Issue Type:</strong> {ipo.issueType}
              </p>
              <p className="mb-0">
                <strong>Status:</strong>{' '}
                <span className={`badge bg-${getStatusBadge(ipo.status)}`}>
                  {ipo.status}
                </span>
              </p>
            </div>
          </div>

          {/* Right Info Card */}
          <div className="col-12 col-md-8">
            <div className="bg-white p-4 shadow-sm rounded-4 border border-light-subtle">
              <h5 className="fw-bold border-bottom pb-2 mb-3">IPO Timeline</h5>
              <div className="row mb-3">
                <div className="col-sm-6 col-lg-4"><strong>Open Date:</strong> {formatDate(ipo.openDate)}</div>
                <div className="col-sm-6 col-lg-4"><strong>Close Date:</strong> {formatDate(ipo.closeDate)}</div>
                <div className="col-sm-6 col-lg-4"><strong>Listing Date:</strong> {formatDate(ipo.listingDate)}</div>
              </div>

              <h5 className="fw-bold border-bottom pb-2 mb-3">Listing Details</h5>
              <div className="row mb-3">
                <div className="col-sm-6 col-lg-4"><strong>IPO Price:</strong> {ipo.ipoPrice || '—'}</div>
                <div className="col-sm-6 col-lg-4"><strong>Listing Price:</strong> {ipo.listingPrice || '—'}</div>
                <div className="col-sm-6 col-lg-4"><strong>Listing Gain:</strong> {ipo.listingGain || '—'}</div>
                <div className="col-sm-6 col-lg-4"><strong>CMP:</strong> {ipo.cmp || '—'}</div>
                <div className="col-sm-6 col-lg-4"><strong>Return %:</strong> {ipo.returnPercent || '—'}</div>
              </div>

              <h5 className="fw-bold border-bottom pb-2 mb-3">Documents</h5>
              <div className="d-flex flex-wrap gap-3">
                {ipo.rhp ? (
                  <a href={ipo.rhp} target="_blank" rel="noreferrer" className="btn btn-outline-primary d-flex align-items-center gap-2">
                    <i className="bi bi-file-earmark-pdf"></i> RHP
                  </a>
                ) : (
                  <span className="text-muted">No RHP</span>
                )}
                {ipo.drhp ? (
                  <a href={ipo.drhp} target="_blank" rel="noreferrer" className="btn btn-outline-secondary d-flex align-items-center gap-2">
                    <i className="bi bi-file-earmark-pdf"></i> DRHP
                  </a>
                ) : (
                  <span className="text-muted">No DRHP</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IpoDetail;
