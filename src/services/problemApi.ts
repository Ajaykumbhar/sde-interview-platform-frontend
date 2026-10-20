import axiosInstance from "../api/axiosInstance";
import type { Problem, PageResponse } from "../types/problem";

export const getProblems = async (
  difficulty?: string,
  page = 0,
  size = 5,
  sort = "title,asc",
  search = "",
): Promise<PageResponse<Problem>> => {
  const response = await axiosInstance.get<PageResponse<Problem>>(
    "/api/problems",
    {
      params: {
        page,
        size,
        sort,
        search: search.trim()||undefined,
        ...(difficulty ? { difficulty } : {}),
      },
    },
  );
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
