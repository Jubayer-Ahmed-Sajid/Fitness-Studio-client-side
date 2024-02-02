import axios from "axios";

// import React from 'react';
const axiosFitbitAccess = axios.create({
    baseURL: 'https://fitnessstudio-bacend.vercel.app', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAccess = () => {
    return axiosFitbitAccess
};

export default useAxiosFitbitAccess;