import { Router } from "express";
import { PaymentController } from "./paymetnt.controller";

const router = Router();

router.post("/init-payment/:bookingId", PaymentController.initPayment);
router.post("/success", PaymentController.successPayment);
router.post("/fail", PaymentController.failPayment);
router.post("/cancel", PaymentController.cancelPayment);
// router.post("/validate", PaymentController.cancelPayment); (33.13)

export const PaymentRoutes = router;
