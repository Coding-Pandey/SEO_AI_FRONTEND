import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});


axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const userDataJson = localStorage.getItem('user_Data');
    const userData = userDataJson ? JSON.parse(userDataJson) : null;
    const token = userData?.access_token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    config.headers['Accept'] = 'application/json';

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200 || response.status === 201) {
      return response;
    }
    return response;  
  },
  async (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as any)?.detail;
    if (status === 401) {
         toast.error(message, { position: "top-right", autoClose: 3000 });
         setTimeout(() => {
          window.location.href = '/Logout';
        }, 1000);   
    } else if ([400, 403, 404, 409, 429 ].includes(status || 0)) {
      let errorMessage = 'An error occurred. Please try again.';
      switch (status) {
        case 400:
          errorMessage = message || 'Bad Request. Please check the input and try again.';
          break;
        case 403:
          errorMessage = message || 'Forbidden. You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = message || 'Not Found. The requested resource could not be found.';
          break;
        case 409:
          errorMessage = message || 'Conflict. There was a conflict with your request.';
          break;
        case 429:
            errorMessage = message || 'Too Many Requests.';
            break;
      }
      toast.error(errorMessage, { position: 'top-right',autoClose: 3000});
    } else {
      toast.error( message || 'An internal server error occurred. Please try again later.', { position: 'top-right',   autoClose: 3000,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
