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
router.get("/all", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.patch(
  "/:id",
  checkAuth(Role.HOST),
  upload.single("image"),
  EventController.updateEvent
);

export const EventRoutes = router;
