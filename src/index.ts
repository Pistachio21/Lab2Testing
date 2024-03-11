import express from "express";
import pogs from "./routes"

export const app = express();

app
 .use(express.json())
 .use("/", pogs);

export default app;