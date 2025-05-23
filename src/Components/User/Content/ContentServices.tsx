import axiosInstance from "../../../Interceptor/Interceptor";

//Content
export const GetContentPreviousList = async () => {
  try {
    const response = await axiosInstance.get("/api/content_datalist");
    return response;
  } catch (error) {
    throw error;
  }
};


export const GetFormDetails = async () => {
  try {
    const response = await axiosInstance.get("/api/content_types");
    return response;
  } catch (error) {
    throw error;
  }
};


  export const AddGenerateContent = async (formData:any) => {
  try { 
    const response = await axiosInstance.post(`/api/content_generation`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteContentPreviousList = async (formData: { uuid: string }) => {
  try {
    const response = await axiosInstance.delete("/api/content_delete_data", {
      data: formData,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
