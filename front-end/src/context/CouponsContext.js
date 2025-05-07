import React, { createContext, useState, useContext, useEffect } from 'react';

const CouponsContext = createContext({
  coupons: [],  
  setUserCoupons: (newCoupons) => {} 
});

export const CouponsProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);
  const setUserCoupons = (newCoupons) => {
    setCoupons(newCoupons);
  };

  return (
    <CouponsContext.Provider value={{ coupons, setUserCoupons }}>
      {children}  
    </CouponsContext.Provider>
  );
};

export const useCoupons = () => useContext(CouponsContext);
