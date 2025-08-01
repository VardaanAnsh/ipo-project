// src/context/IpoContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import axios from '../api/axios';

export const IpoContext = createContext();

export const IpoProvider = ({ children }) => {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIPOs = async () => {
  try {
    const res = await axios.get('/ipos');

    const normalizedData = res.data.map((ipo) => ({
      id: ipo.id,
      companyName: ipo.company_name,
      priceBand: ipo.price_band,
      openDate: ipo.open_date,
      closeDate: ipo.close_date,
      issueSize: ipo.issue_size,
      issueType: ipo.issue_type,
      status: ipo.status,
      listingDate: ipo.listing_date,
      ipoPrice: ipo.ipo_price,
      listingPrice: ipo.listing_price,
      listingGain: ipo.listing_gain,
      cmp: ipo.cmp,
      returnPercent: ipo.return_percent,
      rhp: ipo.rhp,
      drhp: ipo.drhp,
      logo: ipo.logo,
    }));

    setIpos(normalizedData);
  } catch (err) {
    console.error('Error fetching IPOs:', err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchIPOs();
  }, []);

  const addIPO = async (ipoData) => {
    try {
      const res = await axios.post('/ipos', ipoData);
      setIpos(prev => [res.data, ...prev]);
    } catch (err) {
      console.error('Error adding IPO:', err);
    }
  };

  const updateIPO = async (updated) => {
    try {
      await axios.put(`/ipos/${updated.id}`, updated);
      await fetchIPOs();
      setIpos(prev =>
        prev.map((ipo) => (ipo.id === updated.id ? updated : ipo))
      );
    } catch (err) {
      console.error('Error updating IPO:', err);
    }
  };

//   const deleteIPO = async (id) => {
//   try {
//     await axios.delete(`http://localhost:5000/api/ipos/${id}`);
//     setIpos((prev) => prev.filter((ipo) => ipo.id !== id));
//   } catch (err) {
//     console.error('Error deleting IPO:', err);
//     alert('Failed to delete IPO');
//   }
// };

const deleteIPO = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/ipos/${id}`);
    setIpos((prev) => prev.filter((ipo) => ipo.id !== id));
  } catch (err) {
    console.error('Error deleting IPO:', err);
    alert('Failed to delete IPO');
  }
};


  return (
    <IpoContext.Provider value={{ ipos, loading, addIPO, updateIPO , deleteIPO }}>
      {children}
    </IpoContext.Provider>
  );
};


