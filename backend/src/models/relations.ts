import User from "./User.js";
import Solve from "./Solve.js";

User.hasMany(Solve, { foreignKey: "userId" });
Solve.belongsTo(User, { foreignKey: "userId" });
