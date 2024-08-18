require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path'
import { IOSocket } from "./util/socket";
import http from 'http'
import consoleRoutes from './routes/v1/console.router'

const port = process.env.PORT;
if (!port) throw new Error("Missing env: PORT");

const app = express();
const server = http.createServer(app)

IOSocket.getInstance(server)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/console", consoleRoutes)

app.use(express.static(path.join(__dirname, "..", "public")))

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
})

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})