import { initiateSTKPush } from "../services/stkPush.js";

export const stkPushHandler = async (req, res) => {
  try {
    const { phone, amount, reference } = req.body;

    if (!phone || !amount || !reference) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const response = await initiateSTKPush(phone, amount, reference);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate STK push" });
  }
};
