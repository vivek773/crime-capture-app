import { CopSelection, ResultSelection } from "@/types";
import axios from "axios";

// Axios instance for base configuration
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to submit selections
  export const submitSelections = async (
    formattedPayload: { cops: CopSelection[] },
    resultsPayload: { cops: ResultSelection[] }
  ): Promise<void> => {
    try {
      await Promise.all([
        api.post("/selection", formattedPayload),
        api.post("/results", resultsPayload),
      ]);
    } catch (error: any) {
      console.error("Error submitting selections:", error?.response?.data || error?.message);
      throw error;
    }
  };

// Function to fetch results
export const fetchResult = async () => {
    try {
      const response = await api.get("/results");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching results:", error?.response?.data || error?.message);
      throw error?.response?.data?.error || "Failed to fetch results";
    }
  };