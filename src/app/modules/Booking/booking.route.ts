import express from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { BookingController } from "./booking.controller";

const router = express.Router();

// api/v1/booking
router.post(
  "/",
  checkAuth(...Object.values(Role)),
  BookingController.createBooking
);

// api/v1/booking
router.get("/", checkAuth(Role.ADMIN), BookingController.getAllBookings);

// api/v1/booking/my-bookings
router.get(
  "/my-bookings/:eventId",
  checkAuth(...Object.values(Role)),
  BookingController.getSingleBooking
);

// api/v1/booking/bookingId
router.get(
  "/:bookingId",
  checkAuth(...Object.values(Role)),
  BookingController.getSingleBooking
);

// api/v1/booking/bookingId/status
router.patch(
  "/:bookingId/status",
  checkAuth(...Object.values(Role)),
  BookingController.updateBookingStatus
);

export const BookingRoutes = router;
