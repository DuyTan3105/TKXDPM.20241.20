import axiosInstance from "./axiosInstance";

export const loginApi = async (data) => {
    return await axiosInstance.post("/user/login", data);
}

export const registerApi = async (data) => {
    return await axiosInstance.post("/user/register", data);
}

