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

export const GetUploadedSourceFile = async () => {
  try {
    const response = await axiosInstance.get(`/api/uploaded_files`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteSource = async (uuid_id:string) => {
  try {
    const response = await axiosInstance.delete(`/api/delete_Source_file/${uuid_id}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const AddSourceFileData = async (formData:any) => {
  try {
    const response = await axiosInstance.post(`/api/upload_and_parse`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};



export const UpdateSourceFileData = async (uuid_id :string,formData:any) => {
  try {
    const response = await axiosInstance.patch(`/api/upload_and_parse/${uuid_id }`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};
