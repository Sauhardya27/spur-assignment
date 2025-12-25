import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import chatRoutes from "./routes/chatRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { env } from "./config/env.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/chat", chatRoutes);

app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(env.port, () => {
  console.log(`Server is listening on PORT: ${env.port}`);
});
