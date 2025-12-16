import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

const Solve = sequelize.define("solve", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scramble: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Solve;
