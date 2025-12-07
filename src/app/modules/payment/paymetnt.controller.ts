// import { Request, Response } from "express";
// import { catchAsync } from "../../utils/catchAsync";
// import { sendResponse } from "../../utils/sendResponse";
// import { PaymentService } from "./payment.service";



// const initializePayment = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user?.userId as string;
//   const { eventId } = req.body;

//   const result = await PaymentService.initializePayment(userId, eventId);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Payment initialized successfully',
//     data: result,
//   });
// });


export const PaymentController = {
  // initializePayment
};