import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/login", AuthControllers.credentialLogin);
router.post("/logout", AuthControllers.credentialLogout);
router.post('/change-password', checkAuth(Role.ADMIN,Role.HOST,Role.USER), AuthControllers.changePassword); 

export const AuthRoutes = router;
