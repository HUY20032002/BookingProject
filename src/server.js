import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from './config/connectDB';
import cors from 'cors'
require("dotenv").config();

let app = express();
app.use(cors({
  origin: "http://localhost:3000", // ✅ Chỉ định chính xác frontend
  credentials: true, // ✅ Cho phép cookie & authentication headers
}));
// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT;
// Port === undefined => port = 6969
app.listen(port, () => {
  console.log("Backend nodejs " + port);
});
