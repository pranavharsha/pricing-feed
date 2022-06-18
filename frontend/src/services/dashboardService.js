import client from "../axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getAllFeedsService = async () => {
  try {
    const response = await client.get(
      `feeds/`,
      { headers },
    );
    const responseData = response.data;
    return {
      key: "success",
      data: responseData,
    };
  } catch (error) {
    return {
      key: "error",
      error: "Something error occurred",
    };
  }
};

export const addFeedsService = async (formData) => {
  try {
    const response = await client.post(
      `feeds/add/`,
      { ...formData },
      { headers },
    );
    const responseData = response.data;
    return {
      key: "success",
      data: responseData,
    };
  } catch (error) {
    return {
      key: "error",
      error: "Something error occurred",
    };
  }
};

export const editFeedsService = async (formData, id) => {
  try {
    const response = await client.put(
      `feeds/edit/${formData.id}/`,
      { ...formData },
      { headers },
    );
    const responseData = response.data;
    return {
      key: "success",
      data: responseData,
    };
  } catch (error) {
    return {
      key: "error",
      error: "Something error occurred",
    };
  }
};

export const deleteFeedsService = async (id) => {
  try {
    const response = await client.delete(
      `feeds/delete/${id}/`,
      { headers },
    );
    const responseData = response.data;
    return {
      key: "success",
      data: responseData,
    };
  } catch (error) {
    return {
      key: "error",
      error: "Something error occurred",
    };
  }
};

export const bulkUploadFeedsService = async (formData) => {
  try {
    const response = await client.post(
      `feeds/add/bulk/`,
      { ...formData },
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    const responseData = response.data;
    return {
      key: "success",
      data: responseData,
    };
  } catch (error) {
    return {
      key: "error",
      error: "Something error occurred",
    };
  }
};

