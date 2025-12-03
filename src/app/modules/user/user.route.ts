import { Router } from "express";
import { UserController } from "./user.controller";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get(
  "/me",
  checkAuth(Role.HOST, Role.ADMIN, Role.USER),
  UserController.getMe
);
router.get("/all", checkAuth(Role.ADMIN), UserController.getAllUsers);
router.patch("/update", checkAuth(Role.ADMIN,Role.HOST,Role.USER), UserController.updateProfile);
router.post("/register", UserController.createUser);

export const UserRoutes = router;
