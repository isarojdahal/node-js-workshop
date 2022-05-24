import { Router } from "express";
import BlogController from "../controllers/BlogController.js";

const router = Router();
const blogController = new BlogController();

router.post("/add", blogController.addBlog);
router.get("/:id", blogController.getBlogByID);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlogByID);

export default router;
