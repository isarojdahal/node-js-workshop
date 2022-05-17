import express from "express";
import connection from "../models/index.js";
import userModel from "../models/userModel.js";
import { Op } from "sequelize";

const router = express.Router();

//inserts user to the database (CREATE)
router.post("/add", async (req, res) => {
  // const { username, location } = req.body;

  try {
    // const data = await connection.query(
    //   `INSERT INTO users(username,location) VALUES(?,?),('')''`,
    //   [username, location]
    // );

    // const data = await userModel.bulkCreate(req.body);

    const data = await userModel.create(req.body);

    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

//read operation (Read)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const data = await userModel.findByPk(id);
    console.log(data);

    if (data) {
      res.json(data);
    } else res.json([]);
  } else res.json({ success: false, message: "User ID NOt provided" });
});

//update the users

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  if (id) {
    //

    const { username, location } = req.body;

    const data = await userModel.update(
      { username, location },
      {
        where: {
          id,
        },
      }
    );

    console.log(data);

    if (data[0]) res.json({ success: true, message: "User Updated" });
    else res.json({ success: false, message: "Unable to update User" });
  } else res.json({ success: false, message: "User ID Not provided" });
});

//delete.
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  if (id) {
    //

    const data = await userModel.destroy({
      where: {
        id,
      },
    });

    console.log(data);
    if (data) res.json({ success: true, message: "user deleted successfully" });
    else res.json({ success: false, message: "couldn't delete user" });
  } else {
    res.status(403).json({ success: false, message: "User ID Not provided" });
  }
});

// . localhost:8000/user/search/by?location=ktm
router.get("/search/by", async (req, res) => {
  const { location } = req.query;

  const data = await userModel.findAll({
    where: {
      location: {
        [Op.like]: `%${location}%`,
      },
      limit: 10,
    },
  });

  console.log(data);
  res.json(data);
});

export default router;
