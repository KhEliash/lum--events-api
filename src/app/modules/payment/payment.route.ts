import { Router } from "express";
import { PaymentController } from "./paymetnt.controller";
  
const router = Router();

router.post("/success", PaymentController.successPayment);
// router.post("/fail");
// router.post("/cancel");

export const PaymentRoutes = router;
