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

// API service functions
export const getCops = () => apiCall("GET", "/cops");
export const addCop = (cop: { name: string }) => apiCall("POST", "/cops", cop);
export const updateCop = (id: number, cop: { name: string }) => apiCall("PATCH", `/cops/${id}`, cop);
export const deleteCop = (id: number) => apiCall("DELETE", `/cops/${id}`);
