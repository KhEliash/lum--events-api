// import { Types } from "mongoose";
// import AppError from "../../errorHelpers/AppError";
// import { EventModel } from "../event/event.model";
// import { PaymentStatus } from "./payment.interface";
// import { Payment } from "./payment.model";
 
 

// const initializePayment = async (userId: string, eventId: string) => {
//   const event = await EventModel.findById(eventId).populate('host', 'fullName email');

//   if (!event) {
//     throw new AppError(404, 'Event not found');
//   }

//   if (event.joiningFee === 0) {
//     throw new AppError(400, 'This event is free');
//   }

//   // Check if payment already exists
//   const existingPayment = await Payment.findOne({
//     user: userId,
//     event: eventId,
//     status: { $in: [PaymentStatus.COMPLETED, PaymentStatus.PENDING] },
//   });

//   if (existingPayment) {
//     if (existingPayment.status === PaymentStatus.COMPLETED) {
//       throw new AppError(400, 'Payment already completed for this event');
//     }
//     if (existingPayment.status === PaymentStatus.PENDING) {
//       throw new AppError(400, 'Payment is already pending');
//     }
//   }

//   // Generate transaction ID
//   const transactionId = generateTransactionId();

//   // Create payment record
//   const payment = await Payment.create({
//     user: new Types.ObjectId(userId),
//     event: new Types.ObjectId(eventId),
//     host: event.host._id,
//     amount: event.joiningFee,
//     transactionId,
//     status: PaymentStatus.PENDING,
//   });

//   // SSLCommerz payment data
//   const paymentData = {
//     total_amount: event.joiningFee,
//     currency: 'BDT',
//     tran_id: transactionId,
//     success_url: `${config.frontend_url}/api/payments/success`,
//     fail_url: `${config.frontend_url}/api/payments/fail`,
//     cancel_url: `${config.frontend_url}/api/payments/cancel`,
//     ipn_url: `${config.frontend_url}/api/payments/ipn`,
//     product_name: event.name,
//     product_category: event.type,
//     product_profile: 'general',
//     cus_name: 'Customer Name', // Replace with actual user data
//     cus_email: 'customer@email.com', // Replace with actual user data
//     cus_add1: 'Dhaka',
//     cus_city: 'Dhaka',
//     cus_country: 'Bangladesh',
//     cus_phone: '01711111111',
//     shipping_method: 'NO',
//   };

//   try {
//     const gatewayResponse = await sslcommerz.init(paymentData);

//     if (gatewayResponse.status === 'SUCCESS') {
//       return {
//         paymentUrl: gatewayResponse.GatewayPageURL,
//         transactionId,
//         payment,
//       };
//     } else {
//       await Payment.findByIdAndUpdate(payment._id, {
//         status: PaymentStatus.FAILED,
//       });
//       throw new AppError(400, 'Failed to initialize payment');
//     }
//   } catch (error) {
//     await Payment.findByIdAndUpdate(payment._id, {
//       status: PaymentStatus.FAILED,
//     });
//     throw new AppError(500, 'Payment gateway error');
//   }
// };


export const PaymentService = {
  // initializePayment
};
