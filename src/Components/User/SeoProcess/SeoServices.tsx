import axiosInstance from "../../../Interceptor/Interceptor";
import {
  SEOClusterKeywordDataPayload,
  SEOGenerateKeywordDetails,
  SEOPPCClusterUploadPaylaod,
} from "../UserInterface/UserInterface";

//Report

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

export const AddSearchConsole = async (formData: any) => {
  try {
    const response = await axiosInstance.post(`/api/search_console/`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const AddRankingKeyword = async (formData: any) => {
  try {
    const response = await axiosInstance.post(
      `/api/ranking_keywords/`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const AddBrandedWordanalysis = async (formData: any) => {
  try {
    const response = await axiosInstance.post(
      `/api/branded_word_analysis`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//SEO

export const SEOGenerateKeyword = async (
  formData: SEOGenerateKeywordDetails
) => {
  try {
    const response = await axiosInstance.post(
      "/api/seo_generate_keywords",
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const SEOClusterKeywordService = async (
  filteredData: SEOClusterKeywordDataPayload
) => {
  try {
    const response = await axiosInstance.post(
      "/api/seo_keyword_clustering",
      filteredData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const SEOClusterUploadFile = async (
  filteredData: SEOPPCClusterUploadPaylaod
) => {
  try {
    const response = await axiosInstance.post(
      "/api/seo_cluster_uploadfile",
      filteredData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetSeoClusterData = async () => {
  try {
    const response = await axiosInstance.get("/api/seo_Clusterfiles_list");
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteClusterData = async (formData: { uuid: string }) => {
  try {
    const response = await axiosInstance.delete(
      "/api/seo_cluster_delete_document",
      {
        data: formData,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetSeoClusterDataById = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/seo_cluster_fetch_data/${uuid}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteKeywordData = async (uuid: string, id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/seo-files/${uuid}/keywords/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePageData = async (uuid: string, id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/seo-files/${uuid}/pages/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateSEOtitle = async (
  uuid: string,
  id: string,
  formData: { Page_Title: string }
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/seo-files/${uuid}/pages/${id}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
