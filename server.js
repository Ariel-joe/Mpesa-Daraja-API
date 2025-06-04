import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import { getTokenAccess } from "./accessToken.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

getTokenAccess();

// timestamp (this is for stkpush)
const date = new Date();
const timestamp =
  date.getFullYear() +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  ("0" + date.getDate()).slice(-2) +
  ("0" + date.getHours()).slice(-2) +
  ("0" + date.getMinutes()).slice(-2) +
  ("0" + date.getSeconds()).slice(-2);

// generating stk password
const shortCode = "N/A";
const passkey = "";
// timestamp is on line 17

const stk_password = new Buffer.from(shortCode + passkey + timestamp).toString(
  "base64"
);



app.get("/", (req, res) => {
  return res.json({ message: "homepage" });
});

app.listen(8080, () => {
  console.log("app listening on http://localhost:8080");
});
