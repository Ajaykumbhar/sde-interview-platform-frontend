import axiosInstance from "../api/axiosInstance";
import type { Problem } from "../types/problem";

export const getProblems = async (difficulty?: string): Promise<Problem[]> => {
  const response = await axiosInstance.get<Problem[]>("/api/problems", {
    params: difficulty ? { difficulty } : {},
  });
  return response.data;
};

export const createProblem = async (problem: Problem): Promise<Problem> => {
  const response = await axiosInstance.post<Problem>("/api/problems", problem);
  return response.data;
};

export const updateProblem = async (
  id: number,
  problem: Problem,
): Promise<Problem> => {
  const response = await axiosInstance.put<Problem>(
    `/api/problems/${id}`,
    problem,
  );
  return response.data;
};

export const getProblemById = async (id: number): Promise<Problem> => {
  const response = await axiosInstance.get<Problem>(`/api/problems/${id}`);
  return response.data;
};

export const deleteProblem = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/problems/${id}`);
};
