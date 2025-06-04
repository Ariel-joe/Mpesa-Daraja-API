// generate tokens for authorization

export const getTokenAccess = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMERSECRET;

  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  // url for live
  // const url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

  try {
    const encodedCredentials = new Buffer.from(
      consumerKey + ":" + consumerSecret
    ).toString("base64");

    const headers = {
      Authorization: "Basic" + "" + encodedCredentials,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { headers });

    console.log(response.data.access_token);

    return response.data.access_token;
  } catch (error) {
    throw new Error("failed to fetch access token");
  }
};
