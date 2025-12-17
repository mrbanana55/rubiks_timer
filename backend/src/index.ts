import { connectDB, sequelize } from "./config/connection.js";
import express from "express";
import registerRouter from "./routes/register.routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Conncect to database
console.log("Connecting to database...");
await connectDB();

console.log("Syncing...");

await sequelize.sync();

console.log("succesful sync");

// Create epxress app
const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

app.use("/register", registerRouter);
const BACKEND_PORT = process.env.BACKEND_PORT || 3000;

app.listen(BACKEND_PORT, () =>
  console.log(`server listening on http://localhost:${BACKEND_PORT}`)
);
