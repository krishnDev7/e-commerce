import { ApiService } from '../services';

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const agentApiBaseURL = process.env.NEXT_PUBLIC_AGENT_API_URL || '';
const agentManagerApiBaseURL = process.env.NEXT_PUBLIC_AGENT_MANAGER_API_URL || '';

export const apiService = new ApiService(apiBaseURL);
export const agentApiService = new ApiService(agentApiBaseURL);
export const agentManagerApiService = new ApiService(agentManagerApiBaseURL);
