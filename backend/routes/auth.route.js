import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Signup Controleer");
});

router.get("/login", (req, res) => {
  res.send("Signup Controleer");
});

router.get("/logout", (req, res) => {
  res.send("Signup Controleer");
});
export default router;
