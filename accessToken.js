// generate tokens for authorization

import axios from "axios";

export const getTokenAccess = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMERSECRET;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  ); //also know as encodedCredentials

  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  // url for live
  // const url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

  try {
    const headers = {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get(url, { headers });

    return response.data.access_token;
  } catch (error) {
    throw new Error("failed to fetch access token");
  }
};
