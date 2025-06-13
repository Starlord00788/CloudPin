// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://cloudpin-backend.onrender.com/api/", // change to your backend base
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
