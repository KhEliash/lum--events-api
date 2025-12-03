import { Router } from "express";
  import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { EventController } from "./event.controller";

const router = Router();

 
// router.get("/all", checkAuth(Role.ADMIN), EventController.);
 
export const EventRoutes = router;
