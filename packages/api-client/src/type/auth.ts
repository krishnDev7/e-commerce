export interface IAuthService {
    getAuthHeaders: () => Record<string, string | boolean>;
}
