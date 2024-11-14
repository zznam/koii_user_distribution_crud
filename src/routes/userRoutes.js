import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  validateDistribution,
} from "../controllers/userController.js";
import validateUser from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/user", validateUser, createUser);
router.post("/validate-distribution", validateUser, validateDistribution);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.get("/user-by-mail/:email", getUserByEmail);
router.put("/user/:id", validateUser, updateUser);
router.delete("/user/:id", deleteUser);

export default router;
