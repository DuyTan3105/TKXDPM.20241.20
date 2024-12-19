import axiosInstance from "./axiosInstance";

export const getAllProducts = async (page = 0, limit = 10) => {
  try {
    return await axiosInstance.get("/product/all", {
      params: {
        page: page,
        limit: limit,
      },
    });
  } catch (error) {
    console.error("Error getting products: ", error);
  }
};
