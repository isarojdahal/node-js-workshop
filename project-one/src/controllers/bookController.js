import bookModel from "../models/bookModel.js";
import { Op } from "sequelize";

export default class BookController {
  async addBook(req, res, imageName) {
    const data = await bookModel.create({ ...req.body, image: imageName });
    console.log(data);
    if (data) {
      res.json(data);
    } else
      res.json({ success: false, message: "Error during Adding the book." });
  }

  //get book by their id
  async getBookByID(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await bookModel.findByPk(id);
      data ? res.json(data) : res.json([]);
    } else res.json({ success: false, message: "Book ID NOt provided" });
  }

  //
  async updateBook(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await bookModel.update(req.body, {
        where: {
          id,
        },
      });

      if (data[0]) {
        res.json({ success: true, message: "Updated Book" });
      } else {
        res.json({ success: false, message: "Couldn't update book" });
      }
    } else res.json({ success: false, message: "Book ID NOt provided" });
  }

  //
  async deleteBook(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await bookModel.destroy({
        where: {
          id,
        },
      });

      console.log(data);
      if (data === 1) {
        res.json({ success: true, message: "Book Deleted" });
      } else {
        res.json({ success: false, message: "Couldn't delete book" });
      }
    } else res.json({ success: false, message: "Book ID NOt provided" });
  }
}
