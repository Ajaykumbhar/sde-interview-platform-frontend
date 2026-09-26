import axios from "axios";

const API_BASE_URL = "https://localhost:8080";

export const getProblems = async () => {
  const response = await axios.get(`${API_BASE_URL}/problems`);
  return response.data;
};
