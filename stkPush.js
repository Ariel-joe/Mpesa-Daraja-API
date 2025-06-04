import { getTokenAccess } from "./accessToken.js";

const initiateSTKPush = async (phone, amount, reference) => {
  try {
    const accessToken = await getTokenAccess();
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.]/g, "")
      .slice(0, -5);

    const password = Buffer.from(
      `${process.env.MPESA_BUSINESS_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      partyA: `254${phone.substring(phone.length - 9)}`,
      partyB: process.env.MPESA_BUSINESS_SHORTCODE,
      PhoneNumber: `254${phone.substring(phone.length - 9)}`,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: reference,
      TransactionDesc: "Payment for services",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    throw error;
  }
};
