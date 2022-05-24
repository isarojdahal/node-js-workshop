import blogModel from "../models/blogModel.js";

export default class BlogController {
  async addBlog(req, res) {
    try {
      const response = await blogModel.create({
        title: "blog title 3",
        description: "blog description 3",
      });
      res.json(response);
    } catch (err) {
      res.json({ message: err.message, success: false });
    }
  }

  async getBlogByID(req, res) {
    const { id } = req.params;
    console.log(id);

    try {
      const response = await blogModel.findById(id);
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  }

  async updateBlog(req, res) {
    const { id } = req.params;

    try {
      const response = await blogModel.findOne({
        _id: id,
      });

      response.title = "updated title";
      await response.save();
      res.json(response);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteBlogByID(req, res) {
    const { id } = req.params;

    try {
      const response = await blogModel.deleteOne({
        _id: id,
      });
      res.json(response);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}
