import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { stkPushHandler } from "./controllers/stk-push-handler.js";
import { callBackHandler } from "./controllers/callback-handler.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());

app.post("/stkpush", stkPushHandler);

// hanlding callback
app.post("/callback", callBackHandler);

app.listen(8080, () => {
  console.log("app listening on http://localhost:8080");
});
