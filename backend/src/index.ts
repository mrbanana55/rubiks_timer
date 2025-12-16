import { connectDB, sequelize } from "./config/connection.js";

console.log("Connecting to database...");
await connectDB();

console.log("Syncing...");

await sequelize.sync();

console.log("succesful sync");
