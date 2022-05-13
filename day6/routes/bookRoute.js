import express from "express";
import validateToken from "../middlewares/validateToken.js";

const router = express.Router();

router.use((req, res, next) => {
  validateToken(req, res, next);
});

const middlewares = [validateToken, validateToken];

router.get("/", middlewares, (req, res) => {
  //db findAll,
  res.status(200).send(true);
});

// books/add
router.post("/add", (req, res) => {
  //
  //graphql
  //authencation

  console.log(req.body, req.query);
  res.status(200).json({ added: "true" });
});

router.delete("/delete/:id", (req, res) => {
  console.log(req.params);

  res.status(200).json({ delete: true });
});

export default router;
