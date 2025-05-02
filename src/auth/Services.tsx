import axiosInstance from "../Interceptor/Interceptor";
import { GoogleUserDetails } from "./Interface";
import { LoginFormData } from "./Validations";

export const loginUser = async (formData: LoginFormData) => {
  try {
    const response = await axiosInstance.post('/api/login', formData); 
    return response;   
  } catch (error) {
    throw error;  
  }
};

export const googleLoginService = async (formData: GoogleUserDetails) => {
  try {
    const response = await axiosInstance.post('/api/google_login', formData);
    return response;  
  } catch (error) {
    throw error;
  }
};