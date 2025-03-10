import axios from "axios";

// Axios instance for base configuration
const api = axios.create({
  baseURL: process.env.BASE_URL,
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

// API service functions for vehicles
export const getVehicles = () => apiCall("GET", "/vehicles");
export const addVehicle = (vehicle: any) =>
  apiCall("POST", "/vehicles", vehicle);
export const updateVehicle = (id: number, vehicle: any) =>
  apiCall("PATCH", `/vehicles/${id}`, vehicle);
export const deleteVehicle = (id: number) => apiCall("DELETE", `/vehicles/${id}`);
