import axiosInstance from "../../../Interceptor/Interceptor";

export const GetConnectIntegrations = async (provider_name: string) => {
  try {
    const response = await axiosInstance.get(`/api/login/${provider_name}`);
    return response;
  } catch (error) {
    throw error;
  }
};



export const GetIntegrationData = async () => {
  try {
    const response = await axiosInstance.get(`/api/app_integration_data`);
    return response;
  } catch (error) {
    throw error;
  }
};
