import axios from "axios";

// import React from 'react';
const axiosPublic = axios.create({
    baseURL: 'https://fitnessstudio-bacend.vercel.app',
    withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;