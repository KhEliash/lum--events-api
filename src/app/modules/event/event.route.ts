import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { EventController } from "./event.controller";
import multer from "multer";

const router = Router();

const upload = multer();

 
router.post(
  "/create",
  checkAuth(Role.HOST),
  upload.single("image"),
  EventController.createEvent
);

export const EventRoutes = router;
