import axiosInstance from "../../../Interceptor/Interceptor";
import {
  SEOClusterKeywordDataPayload,
  SEOGenerateKeywordDetails,
} from "../UserInterface/UserInterface";

//ppc

export const GetPpcClusterData = async () => {
  try {
    const response = await axiosInstance.get("/api/ppc_Clusterfiles_list");
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdatePpcFileName = async (
  uuid: string,
  formData: { file_name: string }
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/ppcfile_name/${uuid}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePpcClusterData = async (formData: { uuid: string }) => {
  try {
    const response = await axiosInstance.delete(
      "/api/ppc_cluster_delete_document",
      {
        data: formData,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const downloadCSVFile = async (formData: { uuid: string }) => {
  try {
    const response = await axiosInstance.post(
      "/api/ppc/export_to_csv",
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetPpcClusterDataById = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/ppc_cluster_fetch_data/${uuid}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const SEOPPCGenerateKeyword = async (
  formData: SEOGenerateKeywordDetails
) => {
  try {
    const response = await axiosInstance.post(
      "/api/ppc_generate_keywords",
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const SEOPPCClusterKeywordService = async (
  filteredData: SEOClusterKeywordDataPayload
) => {
  try {
    const response = await axiosInstance.post(
      "/api/ppc_keyword_clustering",
      filteredData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const PPclusterUploadFile = async (filteredData: any) => {
  try {
    const response = await axiosInstance.post(
      "/api/ppc_cluster_uploadfile",
      filteredData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteKeywordDataPpc = async (uuid: string, id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/ppc-files/${uuid}/keywords/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePageDataPpc = async (uuid: string, id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/ppc-files/${uuid}/pages/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdatetitlePpc = async (
  uuid: string,
  id: string,
  formData: { Ad_Group: string }
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/ppc-files/${uuid}/pages/${id}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
