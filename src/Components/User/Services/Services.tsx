import axiosInstance from "../../../Interceptor/Interceptor";
import { SEOClusterKeywordDataPayload, SEOGenerateKeywordDetails, SEOPPCClusterKeywordDataPayload, SEOPPCClusterUploadPaylaod } from "../UserInterface/UserInterface";

export const SEOGenerateKeyword = async (formData: SEOGenerateKeywordDetails) => {
    try {
      const response = await axiosInstance.post('/api/seo_generate_keywords', formData);
      return response; 
    } catch (error) {
      throw error;
    }
  };

  export const SEOClusterKeywordService = async (filteredData: SEOClusterKeywordDataPayload) => {
    try {
      const response = await axiosInstance.post('/api/seo_keyword_clustering', filteredData);
      return response; 
    } catch (error) {
      throw error;
    }
  };

 

  export const SEOClusterUploadFile = async (filteredData: SEOPPCClusterUploadPaylaod) => {
    try {
      const response = await axiosInstance.post('/api/seo_cluster_uploadfile', filteredData);
      return response; 
    } catch (error) {
      throw error;
    }
  };

  export const  GetSeoClusterData = async () => {
    try {
      const response = await axiosInstance.get('/api/seo_Clusterfiles_list');
      return response; 
    } catch (error) {
      throw error;
    }
  };

  export const deleteClusterData = async (formData: { uuid: string }) => {
    try {
      const response = await axiosInstance.delete('/api/seo_cluster_delete_document', {
        data: formData,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const  GetSeoClusterDataById = async (uuid:string) => {
    try {
      const response = await axiosInstance.get(`/api/seo_cluster_fetch_data/${uuid}`);
      return response; 
    } catch (error) {
      throw error;
    }
  };

  export const deleteKeywordData = async (uuid:string,id:string) => {
    try {
      const response = await axiosInstance.delete(`/api/seo-files/${uuid}/keywords/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const deletePageData = async (uuid:string,id:string) => {
    try {
      const response = await axiosInstance.delete(`/api/seo-files/${uuid}/pages/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const UpdateSEOtitle = async (uuid:string,id:string,formData: { Page_Title: string }) => {
    try {
      const response = await axiosInstance.patch(`/api/seo-files/${uuid}/pages/${id}`,formData);
      return response;
    } catch (error) {
      throw error;
    }
  };


  
//ppc
export const  GetPpcClusterData = async () => {
  try {
    const response = await axiosInstance.get('/api/ppc_Clusterfiles_list');
    return response; 
  } catch (error) {
    throw error;
  }
};


export const deletePpcClusterData = async (formData: { uuid: string }) => {
  try {
    const response = await axiosInstance.delete('/api/ppc_cluster_delete_document', {
      data: formData,
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const  GetPpcClusterDataById = async (uuid:string) => {
  try {
    const response = await axiosInstance.get(`/api/ppc_cluster_fetch_data/${uuid}`);
    return response; 
  } catch (error) {
    throw error;
  }
};



export const SEOPPCGenerateKeyword = async (formData: SEOGenerateKeywordDetails) => {
  try {
    const response = await axiosInstance.post('/api/ppc_generate_keywords', formData);
    return response; 
  } catch (error) { 
    throw error;
  }
};


export const SEOPPCClusterKeywordService = async (filteredData: SEOPPCClusterKeywordDataPayload) => {
  try {
    const response = await axiosInstance.post('/api/ppc_keyword_clustering', filteredData);
    return response; 
  } catch (error) {
    throw error;
  }
};



export const PPclusterUploadFile = async (filteredData:any) => {
  try {
    const response = await axiosInstance.post('/api/ppc_cluster_uploadfile', filteredData);
    return response; 
  } catch (error) {
    throw error;
  }
};


export const deleteKeywordDataPpc = async (uuid:string,id:string) => {
  try {
    const response = await axiosInstance.delete(`/api/ppc-files/${uuid}/keywords/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePageDataPpc = async (uuid:string,id:string) => {
  try {
    const response = await axiosInstance.delete(`/api/ppc-files/${uuid}/pages/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdatetitlePpc = async (uuid:string , id:string, formData: { Ad_Group: string }) => {
  try {
    const response = await axiosInstance.patch(`/api/ppc-files/${uuid}/pages/${id}`,formData);
    return response;
  } catch (error) {
    throw error;
  }
};