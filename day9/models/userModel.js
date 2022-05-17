import { DataTypes } from "sequelize";
import connection from "./index.js";

const userModel = connection.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,

      set(value) {
        this.setDataValue("location", value + ",Nepal");
      },

      get() {
        return this.getDataValue("location") + " hello";
      },
    },
  },
  {
    timestamps: false,
  }
);

export default userModel;
