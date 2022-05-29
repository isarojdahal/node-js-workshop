import express, { text } from "express";
import connection from "./models/index.js";
import textConstants from "./constants/textConstants.js";
import authRoutes from "./routes/authRoutes.js";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json("Backend is Working");
});

//
app.use("/auth", authRoutes);

//
app.listen(process.env.PORT || 8000, async () => {
  console.log(textConstants.SERVER_STARTED);

  try {
    await connection.authenticate();
    console.log(textConstants.DB_CONNECTION_ESTABLISHED);
    connection.sync();
  } catch (err) {
    console.log("Error while connecting to DB" + err);
  }
});
