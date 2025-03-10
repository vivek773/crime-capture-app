import axios from "axios";

// Axios instance for base configuration
const api = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic API call function
const apiCall = async (method: "GET" | "POST" | "PATCH" | "DELETE", url: string, data?: any) => {
  try {
    const response = await api({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error: any) {
    console.error(`API Error (${method} ${url}):`, error?.response?.data || error?.message);
    throw error;
  }
};

// API service functions
export const getCities = () => apiCall("GET", "/cities");
export const addCity = (city: { name: string; distance: number }) => apiCall("POST", "/cities", city);
export const updateCity = (id: number, city: { name: string; distance: number }) =>
  apiCall("PATCH", `/cities/${id}`, city);
export const deleteCity = (id: number) => apiCall("DELETE", `/cities/${id}`);
