import express from "express";
import connection from "../config/connection.js";

const router = express.Router();

//inserts user to the database (CREATE)
router.post("/add", async (req, res) => {
  const { username, location } = req.body;

  try {
    const data = await connection.query(
      `INSERT INTO users(username,location) VALUES(?,?)`,
      [username, location]
    );

    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

//read operation (Read)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    connection.query(
      `SELECT * FROM users WHERE id=?`,
      [id],
      (err, results, fields) => {
        console.log(results);
        res.json(...results);
      }
    );
  } else res.json({ success: false, message: "User ID NOt provided" });
});

//update the users

router.put("/update/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    //

    const { username, location } = req.body;
    connection.query(
      `UPDATE users SET username=?, location=? WHERE id=?`,
      [username, location, id],
      (err, results, fields) => {
        console.log(results);
        if (results.affectedRows) {
          res.json({ success: true, message: "User Updated" });
        } else res.json({ success: false, message: "Unable to update User" });
      }
    );
  } else res.json({ success: false, message: "User ID Not provided" });
});

//delete.
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    //

    connection.query(
      `DELETE FROM users WHERE id=?`,
      [id],
      (err, results, fields) => {
        if (results.affectedRows) {
          res
            .status(200)
            .json({ success: true, message: "user deleted successfully" });
        }
      }
    );
  } else {
    res.status(403).json({ success: false, message: "User ID Not provided" });
  }
});

export default router;
