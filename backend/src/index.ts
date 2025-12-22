import { connectDB, sequelize } from "./config/connection.js";
import express from "express";
import registerRouter from "./routes/register.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import loginRouter from "./routes/login.routes.js";
import solveRouter from "./routes/solve.routes.js";
import profileRouter from "./routes/profile.routes.js";

dotenv.config();

// Connect to database
console.log("Connecting to database...");
await connectDB();

console.log("Syncing...");

await sequelize.sync();

console.log("succesful sync");

// Create express app
const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

// Routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/solve", solveRouter);
app.use("/profile", profileRouter);

const BACKEND_PORT = process.env.BACKEND_PORT || 3000;

app.listen(BACKEND_PORT, () =>
  console.log(`server listening on http://localhost:${BACKEND_PORT}`)
);
