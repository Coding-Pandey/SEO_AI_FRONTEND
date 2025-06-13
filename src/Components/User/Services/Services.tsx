import axiosInstance from "../../../Interceptor/Interceptor";
 

export const GetUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/api/user/info");
    return response;
  } catch (error) {
    throw error;
  }
};

 