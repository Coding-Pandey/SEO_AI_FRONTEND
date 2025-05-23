import axiosInstance from "../../../Interceptor/Interceptor";
import {
  SEOClusterKeywordDataPayload,
  SEOGenerateKeywordDetails,
  SEOPPCClusterUploadPaylaod,
} from "../UserInterface/UserInterface";

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

//ppc
export const GetPpcClusterData = async () => {
  try {
    const response = await axiosInstance.get("/api/ppc_Clusterfiles_list");
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

//Social Media

export const GeneratePostService = async (formdata: any) => {
  try {
    const response = await axiosInstance.post(
      "/api/social_media_post",
      formdata
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetSocialMediaData = async () => {
  try {
    const response = await axiosInstance.get("/api/socialmedia_datalist");
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSocialMediaData = async (formData: { uuid: string }) => {
  try {
    const response = await axiosInstance.delete(
      "/api/socialmedia_delete_document",
      {
        data: formData,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetGeneratedPostById = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/socialmedia_post_data/${uuid}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSocialMediaPost = async (uuid: string,id: string,platform: string) => {
  try {
    const response = await axiosInstance.delete(`/api/socialmedia_${platform}/${uuid}/post/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

  export const UpdateImageSocialMedia = async (uuid:string,id:string,platform: string,formData:any) => {
  try { 
    const response = await axiosInstance.patch(`/api/socialmedia_${platform}/${uuid}/post/${id}`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};

  export const AddScheduleSocialMedia = async (formData:any) => {
  try { 
    const response = await axiosInstance.post(`/api/schedule_socialmedia_post`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};



export const GetPlannerSocialMediaData = async () => {
  try {
    const response = await axiosInstance.get("/api/socialmedia_scheduled_posts");
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePlannerSocialMediaData = async (posts: string,uuid: string,) => {
  try {
    const response = await axiosInstance.delete(`/api/socialmedia_scheduled_posts/${posts}/${uuid}`);
    return response;
  } catch (error) {
    throw error;
  }
};

  export const UpdateScheduleSocialMediaPlanner = async (post:string,uuid:string,formData:any) => {
  try { 
    const response = await axiosInstance.patch(`/api/update_scheduled_posts/${post}/${uuid}`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};



  export const UpdateFileNameSocialMedia = async (uuid:string,formData:any) => {
  try { 
    const response = await axiosInstance.patch(`/api/edit_file_name/${uuid}`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};



