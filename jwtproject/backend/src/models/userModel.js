import connection from "./index.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import { DataTypes } from "sequelize";

export default connection.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // username: {
    //   type: DataTypes.STRING,
    //   unique: true,
    // },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },

    password: {
      type: DataTypes.TEXT,
      set(value) {
        console.log("value : " + value);
        const hashedPassword = bcrypt.hashSync(value, 10);

        console.log("from end value : " + value);
        this.setDataValue("password", hashedPassword);
      },
    },
  },
  { timestamps: false }
);
