import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ReviewController } from "./review.controller";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/create", checkAuth(Role.USER,Role.HOST), ReviewController.createReview);
router.get('/host/:hostId', ReviewController.getHostReviews);
router.get('/event/:eventId', ReviewController.getEventReviews);
// router.patch('/:id', auth(), ReviewController.updateReview);
// router.delete('/:id', auth(), ReviewController.deleteReview);

export const ReviewRoutes = router;
