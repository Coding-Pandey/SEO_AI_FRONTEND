import axios from "axios";
import axiosInstance from "../../../Interceptor/Interceptor";
import {
  SEOClusterKeywordDataPayload,
  SEOGenerateKeywordDetails,
  SEOPPCClusterUploadPaylaod,
} from "../UserInterface/UserInterface";

//Report
const userDataJson = localStorage.getItem("user_Data");
const userData = userDataJson ? JSON.parse(userDataJson) : null;
const token = userData?.access_token;

export const GetFilterData = async () => {
  try {
    const response = await axiosInstance.get(`/api/report_filter`);
    return response;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/refresh_token/google_search_console`
    );
    const isSuccess = response.status === 200 || response.status === 201;
    return isSuccess;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return false;
  }
};

export const GetWebListDetails = async (): Promise<any> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/search_console/sites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error: any) {
    if (error.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        return await GetWebListDetails();
      } else {
        throw new Error("Token refresh failed.");
      }
    } else {
      throw error;
    }
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

export const UpdateSEOFileName = async (
  uuid: string,
  formData: { file_name: string }
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/seofile_name/${uuid}`,
      formData
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

//SEO Audit

export const GetAuditListDetails = async () => {
  try {
    const response = await axiosInstance.get(`/api/crawl_data_info`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const AddDomainCrawlURL = async (formData: { domain: string }) => {
  try {
    const response = await axiosInstance.post(`/api/sheets/crawl`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteOldDomain = async (uuid: string) => {
  try {
    const response = await axiosInstance.delete(`/api/crawl_data/${uuid}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetCrawDataById = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(`/api/crawl_data/${uuid}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const GetCrawDataByTaskId = async (task_id: string) => {
  try {
    const response = await axiosInstance.get(`/api/crawl/status/${task_id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
