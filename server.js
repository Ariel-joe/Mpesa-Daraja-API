import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { initiateSTKPush } from "./stkPush.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());

app.post("/stkpush", async (req, res) => {
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
});

// testing route
app.get("/test-payment", async (req, res) => {
  try {
    const response = await initiateSTKPush("254746687102", "10", "test123");

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log("app listening on http://localhost:8080");
});
