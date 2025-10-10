import axiosInstance from "./Interceptor/Interceptor";

//delete
export const deleteS3Files = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/delete_s3_file?file_uuid=${uuid}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
