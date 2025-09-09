import axiosInstance from "../../Interceptor/Interceptor";

interface GetUserAndOrganizationParams {
  username?: string;
  role?: string;
  page?: number;
  per_page?: number;
}

interface GetActiveSessionStatusParams {
  is_expired?: string; // "true" | "false" | ""
  page?: number;
  per_page?: number;
}

interface GetSecurityLogsParams {
  is_expired?: string;
  page?: number;
  per_page?: number;
}

interface GetAllOrganizationParams {
  username?:string;
  page?: number;
  per_page?: number;
}

interface GetOrganizationAndItsUserParams {
  username?:string;
  page?: number;
  per_page?: number;
}


export const GetUserAndOrganization = async (
  params: GetUserAndOrganizationParams = {}
) => {
  try {
    const queryParams = new URLSearchParams({
      username: params.username || "",
      role: params.role || "",
      page: params.page?.toString() || "1",
      per_page: params.per_page?.toString() || "10",
    }).toString();

    const response = await axiosInstance.get(`/api/admin/users?${queryParams}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetActiveSession = async (
  params: GetActiveSessionStatusParams = {}
) => {
  try {
    const queryParams = new URLSearchParams({
      is_expired: params.is_expired || "null", // ✅ add here
      page: params.page?.toString() || "1",
      per_page: params.per_page?.toString() || "10",
    }).toString();

    const response = await axiosInstance.get(
      `/api/admin/sessions?${queryParams}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteActiveSession = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/sessions/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteAllActiveSessions = async () => {
  try {
    const response = await axiosInstance.post("/api/admin/sessions/cleanup");
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteUserAndOrganizationUser = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/user/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const AdminCreateUser = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/api/admin/register", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetSecurityLogs = async (params: GetSecurityLogsParams = {}) => {
  try {
    const queryParams = new URLSearchParams({
      risk_level: params.is_expired || "",
      page: params.page?.toString() || "1",
      per_page: params.per_page?.toString() || "10",
    }).toString();

    const response = await axiosInstance.get(
      `/api/admin/security_logs?${queryParams}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const GetAllOrganization = async (
  params: GetAllOrganizationParams = {}
) => {
  try {
    const queryParams = new URLSearchParams({
      name: params.username || "",
      page: params.page?.toString() || "1",
      limit: params.per_page?.toString() || "10",
    }).toString();

    const response = await axiosInstance.get(`/api/admin/organizations?${queryParams}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetOrganizationAndItsUser = async (
  params: GetOrganizationAndItsUserParams = {}
) => {
  try {
    const queryParams = new URLSearchParams({
      name: params.username || "",
      page: params.page?.toString() || "1",
      limit: params.per_page?.toString() || "10",
    }).toString();

    const response = await axiosInstance.get(`/api/admin/moderators-with-users?${queryParams}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const SwitchORGAccountLoginByAdmin = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/api/admin/impersonate", formData);
    return response;
  } catch (error) {
    throw error;
  }
};