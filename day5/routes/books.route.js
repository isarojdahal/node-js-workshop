import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  //db findAll,
  res.status(200).send(true);
});

router.get("/add", (req, res) => {
  //
  //graphql
  //authencation

  res.status(200).json({ added: "true" });
});

router.get("/delete/:id/settings/:author", (req, res) => {
  console.log(req.params);

  res.status(200).json({ delete: true });
});

export default router;
