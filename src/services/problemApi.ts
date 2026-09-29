import axios from "axios";
import type { Problem } from "../types/problem";

const API_BASE_URL = "http://localhost:8080";

export const getProblems = async (): Promise<Problem[]> => {
  const url = `${API_BASE_URL}/problems`;
  const response = await axios.get<Problem[]>(url);
  return response.data;
};
export const createProblem = async (problem: Problem): Promise<Problem> => {
  const url = `${API_BASE_URL}/problems`;
  const response = await axios.post<Problem>(url, problem);
  return response.data;
};

export const updateProblem = async (
  id: number,
  problem: Problem,
): Promise<Problem> => {
  const url = `${API_BASE_URL}/problems/${id}`;
  const reponse = await axios.put<Problem>(url, problem);
  return reponse.data;
};

export const getProblemById = async (id: number): Promise<Problem> => {
  const url = `${API_BASE_URL}/problems/${id}`;
  const response = await axios.get<Problem>(url);
  return response.data;
};

export const deleteProblem = async (id: number): Promise<void> => {
  const url = `${API_BASE_URL}/problems/${id}`;
  await axios.delete(url);
};
