import axiosInstance from "../../../Interceptor/Interceptor";


export const GetWebListDetails = async () => {
  try {
    const response = await axiosInstance.get(`/api/search_console/sites`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const GetFilterData = async () => {
  try {
    const response = await axiosInstance.get(`/api/report_filter`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const AddSearchConsole = async (formData:any) => {
  try {
    const response = await axiosInstance.post(`/api/search_console`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const AddRankingKeyword = async (formData:any) => {
  try {
    const response = await axiosInstance.post(`/api/ranking_keywords`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const AddBrandedWordanalysis = async (formData:any) => {
  try {
    const response = await axiosInstance.post(`/api/branded_word_analysis`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};