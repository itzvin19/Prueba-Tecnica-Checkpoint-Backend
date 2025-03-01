import express from "express";
import morgan from "morgan";
import { productRouter } from "./routes/ProductRoutes";
import { AuthRouter } from "./routes/AuthRoutes";
import { corsOptions } from "./config/cors";
import cors from "cors";

export const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cors(corsOptions));

server.use("/productos", productRouter);
server.use("/auth", AuthRouter);
