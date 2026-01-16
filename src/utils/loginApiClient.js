// src/utils/loginApiClient.js
import axios from "axios";

export async function loginContractor(mobileNumber, otp) {
    try {
        const response = await axios.post(
            "https://qa-contractorportal.birlaopus.com/api/v1/login",
            {
                mobile_number: mobileNumber,
                otp: otp.toString()
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        // 🔑 Token returned by backend
        return response.data.authorization;

    } catch (error) {
        console.error("❌ LOGIN API ERROR RESPONSE:", error.response?.data);
        throw error;
    }
}
