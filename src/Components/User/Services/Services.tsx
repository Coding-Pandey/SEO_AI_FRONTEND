import axiosInstance from "../../../Interceptor/Interceptor";

export const GetUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/api/user/info");
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserProfile = async (formData: any) => {
  try {
    const response = await axiosInstance.patch("/api/profile/edit", formData);
    return response;
  } catch (error) {
    throw error;
  }
};
