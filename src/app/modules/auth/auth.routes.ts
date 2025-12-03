import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/login", AuthControllers.credentialLogin);
router.post("/logout", AuthControllers.credentialLogout);
 

export const AuthRoutes = router;
