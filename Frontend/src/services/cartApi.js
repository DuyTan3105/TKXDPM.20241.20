import axiosInstance from "./axiosInstance";

export const createNewCart = async (id) => {
  try {
    return await axiosInstance.get("/cart/new");
  } catch (error) {
    console.error("Error getting products: ", error);
  }
};
