export type ProgressStatus = 
    |'NOT_STARTED' 
    |'ATTEMPTED' 
    | 'SOLVED' 
    | 'NEEDS_REVISION';

export type PersistedProgressStatus = 
    | 'ATTEMPTED'
    | 'SOLVED'
    | 'NEEDS_REVISION';

export interface ProgressResponse {
    problemId: number;
    problemTitle: string;
    status: ProgressStatus;
    notes: string;
    createdAt: string| null;
    updatedAt: string| null;
}

export interface ProgressRequest {
    status: PersistedProgressStatus;
    notes: string;  
}