import axiosInstance from "../../../Interceptor/Interceptor";


export const GetModeratorUserList = async () => {
  try {
    const response = await axiosInstance.get(`/api/moderator/users`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const ModeratorCreateUser = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/api/moderator/send-invitation", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteUserByModerator = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/moderator/user/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

