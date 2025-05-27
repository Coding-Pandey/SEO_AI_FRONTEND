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

  export const EditGenerateContent = async (formData:any) => {
  try { 
    const response = await axiosInstance.post(`/api/edit_content_generation`,formData);
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

  export const MoreGenerateSuggestion = async (formData:any) => {
  try { 
    const response = await axiosInstance.post(`/api/blog_suggestion_more`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};


  export const SaveGenerateSuggestion = async (uuid:string,formData:any) => {
  try { 
    const response = await axiosInstance.patch(`/api/content_generation_uploadfile/${uuid}`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetGeneratedSuggestion = async (uuid:string) => {
  try {
    const response = await axiosInstance.get(`/api/content_data/${uuid}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateTitleOrFileName = async (uuid:string,formData:any) => {
  try {
    const response = await axiosInstance.patch(`/api/update_name_and_title/${uuid}`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};
