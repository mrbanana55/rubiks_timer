import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/connection.js";

interface SolveAttributes {
  id: string;
  userId: string;
  time: number;
  scramble: string;
  createdAt?: Date;
}

interface SolveCreationAttributes
  extends Optional<SolveAttributes, "id" | "createdAt"> {}

class Solve
  extends Model<SolveAttributes, SolveCreationAttributes>
  implements SolveAttributes
{
  public id!: string;
  public userId!: string;
  public time!: number;
  public scramble!: string;
  public createdAt!: Date;
}

Solve.init(
  {
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
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default Solve;
