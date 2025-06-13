import axiosInstance from "../../../Interceptor/Interceptor";


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

export const deleteSocialMediaPost = async (
  uuid: string,
  id: string,
  platform: string
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/socialmedia_${platform}/${uuid}/post/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateImageSocialMedia = async (
  uuid: string,
  id: string,
  platform: string,
  formData: any
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/socialmedia_${platform}/${uuid}/post/${id}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const AddScheduleSocialMedia = async (formData: any) => {
  try {
    const response = await axiosInstance.post(
      `/api/schedule_socialmedia_post`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetPlannerSocialMediaData = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/socialmedia_scheduled_posts"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePlannerSocialMediaData = async (
  posts: string,
  uuid: string
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/socialmedia_scheduled_posts/${posts}/${uuid}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateScheduleSocialMediaPlanner = async (
  post: string,
  uuid: string,
  formData: any
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/update_scheduled_posts/${post}/${uuid}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateFileNameSocialMedia = async (
  uuid: string,
  formData: any
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/edit_file_name/${uuid}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
