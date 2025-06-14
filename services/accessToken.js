// generate tokens for authorization

import axios from 'axios';

export const getTokenAccess = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  ); //also know as encodedCredentials

  if (!consumerKey || !consumerSecret) {
    throw new Error("M-PESA credentials not configured");
  }

  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  // url for live
  // const url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

  try {
    const headers = {
      Authorization: `Basic ${auth}`,
    };

    const response = await axios.get(url, { headers });

    return response.data.access_token;
  } catch (error) {
    console.error("Token Error:", error.response?.data || error.message);
    throw new Error("failed to fetch access token" + error.message);
  }
};
