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
// router.get('/:id', UserController.getUserProfile);
router.get("/all", checkAuth(Role.ADMIN), UserController.getAllUsers);
router.get('/:id', UserController.getUserProfile);
router.patch("/update", checkAuth(Role.ADMIN,Role.HOST,Role.USER), UserController.updateProfile);
router.post("/register", UserController.createUser);
router.patch('/:id', checkAuth(Role.ADMIN), UserController.activateUser);
router.delete('/:id', checkAuth(Role.ADMIN), UserController.deactivateUser);

export const UserRoutes = router;
