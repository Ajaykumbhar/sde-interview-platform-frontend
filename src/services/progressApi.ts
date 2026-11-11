import axiosInstance from "../api/axiosInstance";
import type { ProgressRequest, ProgressResponse } from "../types/progress";


export const getProgress = async ( problemId: number): Promise<ProgressResponse> => {

    const response = await axiosInstance.get<ProgressResponse>(
        `/api/progress/${problemId}`
    );
    return response.data;
}

export const updateProgress = async ( problemId : number, request : ProgressRequest): Promise<ProgressResponse> => {

    const response = await axiosInstance.put<ProgressResponse>(
        `/api/progress/${problemId}`,
        request
    );
    return response.data;
}
