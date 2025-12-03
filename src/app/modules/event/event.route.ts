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
router.get('/hosted', checkAuth(Role.HOST), EventController.getHostedEvents);
router.patch(
  "/:id",
  checkAuth(Role.HOST),
  upload.single("image"),
  EventController.updateEvent
);
router.get("/:id", EventController.getEventById);
router.post('/join/:id/', checkAuth(Role.USER), EventController.joinEvent);
router.delete('/leave/:id', checkAuth(Role.USER), EventController.leaveEvent);

export const EventRoutes = router;
