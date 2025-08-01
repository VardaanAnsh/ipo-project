// src/pages/EditIPO.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IpoContext } from '../context/IpoContext';
import Layout from '../components/Layout';
import axios from 'axios';


const EditIPO = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ipos, updateIPO } = useContext(IpoContext);
  const ipoToEdit = ipos.find((item) => item.id === parseInt(id));

  const [formData, setFormData] = useState({
    companyName: '',
    priceBand: '',
    openDate: '',
    closeDate: '',
    issueSize: '',
    issueType: '',
    status: '',
    listingDate: '',
    ipoPrice: '',
    listingPrice: '',
    listingGain: '',
    cmp: '',
    returnPercent: '',
    rhp: '',
    drhp: '',
    logo: null,
  });

  useEffect(() => {
  if (ipoToEdit) {
    setFormData({
      companyName: ipoToEdit.companyName || '',
      priceBand: ipoToEdit.priceBand || '',
      openDate: ipoToEdit.openDate?.slice(0, 10) || '',
      closeDate: ipoToEdit.closeDate?.slice(0, 10) || '',
      issueSize: ipoToEdit.issueSize || '',
      issueType: ipoToEdit.issueType || '',
      status: ipoToEdit.status || '',
      listingDate: ipoToEdit.listingDate?.slice(0, 10) || '',
      ipoPrice: ipoToEdit.ipoPrice || '',
      listingPrice: ipoToEdit.listingPrice || '',
      listingGain: ipoToEdit.listingGain || '',
      cmp: ipoToEdit.cmp || '',
      returnPercent: ipoToEdit.returnPercent || '',
      rhp: ipoToEdit.rhp || '',
      drhp: ipoToEdit.drhp || '',
      logo: ipoToEdit.logo || null,
    });
  }
}, [ipoToEdit]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      company_name: formData.companyName,
      price_band: formData.priceBand,
      open_date: formData.openDate,
      close_date: formData.closeDate,
      issue_size: formData.issueSize,
      issue_type: formData.issueType,
      status: formData.status,
      listing_date: formData.listingDate,
      ipo_price: formData.ipoPrice,
      listing_price: formData.listingPrice,
      listing_gain: formData.listingGain,
      cmp: formData.cmp,
      return_percent: formData.returnPercent,
      rhp: formData.rhp,
      drhp: formData.drhp,
    };

    try {
      await axios.put(`http://localhost:5000/api/ipos/${id}`, payload);
      updateIPO({ id: parseInt(id), ...formData }); // ✅ send id along
      alert('IPO updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating IPO:', err);
      alert('Failed to update IPO.');
    }
  };

  const handleResetLogo = () => {
    setFormData({ ...formData, logo: null });
  };

  if (!ipoToEdit) {
    return <Layout><div className="p-4">IPO not found.</div></Layout>;
  }

  return (
    <Layout>
      <h4 className="fw-bold mb-4">Edit IPO Information</h4>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm rounded-4">
        {/* Logo Upload */}
        <div className="mb-4">
          <label className="form-label fw-bold">Company Logo</label>
          <div className="d-flex align-items-center gap-3">
            {formData.logo ? (
              <img
                src={typeof formData.logo === 'string' ? formData.logo : URL.createObjectURL(formData.logo)}
                alt="Logo"
                width="60"
                height="60"
                className="rounded"
              />
            ) : (
              <span className="text-muted">No logo uploaded</span>
            )}
            <input
              type="file"
              name="logo"
              className="form-control w-auto"
              onChange={handleChange}
            />
            {formData.logo && (
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleResetLogo}>
                Delete
              </button>
            )}
          </div>
        </div>

        {/* IPO Info */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Price Band</label>
            <input name="priceBand" className="form-control" value={formData.priceBand} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Open Date</label>
            <input type="date" name="openDate" className="form-control" value={formData.openDate} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Close Date</label>
            <input type="date" name="closeDate" className="form-control" value={formData.closeDate} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Issue Size</label>
            <input name="issueSize" className="form-control" value={formData.issueSize} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Issue Type</label>
            <select name="issueType" className="form-select" value={formData.issueType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Book Built">Book Built</option>
              <option value="Fixed Price">Fixed Price</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Listing Date</label>
            <input type="date" name="listingDate" className="form-control" value={formData.listingDate} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="New Listed">New Listed</option>
            </select>
          </div>
        </div>

        {/* RHP/DRHP Fields */}
        <hr className="my-4" />
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">RHP PDF Link</label>
            <input name="rhp" className="form-control" value={formData.rhp} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">DRHP PDF Link</label>
            <input name="drhp" className="form-control" value={formData.drhp} onChange={handleChange} />
          </div>
        </div>

        {/* New Listed Section (Conditional) */}
        {formData.status === 'New Listed' && (
          <>
            <hr className="my-4" />
            <h5 className="fw-bold">New Listed IPO Details</h5>
            <div className="row g-3 mt-1">
              <div className="col-md-4">
                <label className="form-label">IPO Price</label>
                <input name="ipoPrice" className="form-control" value={formData.ipoPrice} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Listing Price</label>
                <input name="listingPrice" className="form-control" value={formData.listingPrice} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Listing Gain</label>
                <input name="listingGain" className="form-control" value={formData.listingGain} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">CMP</label>
                <input name="cmp" className="form-control" value={formData.cmp} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Return %</label>
                <input name="returnPercent" className="form-control" value={formData.returnPercent} onChange={handleChange} />
              </div>
            </div>
          </>
        )}

        <div className="mt-4 d-flex justify-content-end gap-3">
          <button type="submit" className="btn btn-success px-4">Update</button>
          <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </Layout>
  );
};

export default EditIPO;
