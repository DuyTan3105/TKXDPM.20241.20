import axiosInstance from "./axiosInstance";
export const paymentApi = async (data, paymentType) => {
    try {
        return await axiosInstance.post("/payment/pay", 
            data,
            {
                params: {
                    paymentType: paymentType,
                },
            }
        );
    } catch (error) {
        console.log("Error making payment: ", error);
    }
} 