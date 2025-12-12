import { Router } from "express";
import { PaymentController } from "./paymetnt.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get("/my-payments",checkAuth(Role.USER), PaymentController.myPayment);
router.post("/init-payment/:bookingId", PaymentController.initPayment);
router.post("/success", PaymentController.successPayment);
router.post("/fail", PaymentController.failPayment);
router.post("/cancel", PaymentController.cancelPayment);
// router.post("/validate", PaymentController.cancelPayment); (33.13)

export const PaymentRoutes = router;
