import connection from "../models/index.js";
import userModel from "../models/userModel.js";
import { Op } from "sequelize";

export default class UserController {
  //adds user to DB
  async addUser(req, res) {
    const { username, location } = req.body;

    try {
      const data = await userModel.create(req.body);

      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  //get user by their userid
  async getUserByID(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await userModel.findByPk(id);
      console.log(data);

      if (data) {
        res.json(data);
      } else res.json([]);
    } else res.json({ success: false, message: "User ID NOt provided" });
  }

  async updateUser(req, res) {
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
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    if (id) {
      //

      const data = await userModel.destroy({
        where: {
          id,
        },
      });

      console.log(data);
      if (data)
        res.json({ success: true, message: "user deleted successfully" });
      else res.json({ success: false, message: "couldn't delete user" });
    } else {
      res.status(403).json({ success: false, message: "User ID Not provided" });
    }
  }

  async searchUserByLocation(req, res) {
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
  }
}
