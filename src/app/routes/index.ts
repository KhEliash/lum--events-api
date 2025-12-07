import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { EventRoutes } from "../modules/event/event.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { BookingRoutes } from "../modules/Booking/booking.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/events",
    route: EventRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
