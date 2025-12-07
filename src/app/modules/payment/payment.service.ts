 
import AppError from "../../errorHelpers/AppError";
 
import { PaymentStatus } from "./payment.interface";
import { Payment } from "./payment.model";
import { Booking } from "../Booking/booking.model";
import { BOOKING_STATUS } from "../Booking/booking.interface";
 
 

const successPayment = async (query: Record<string, string>) => {

     

    const session = await Booking.startSession();
    session.startTransaction()

    try {


        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: PaymentStatus.PAID,
        }, { new: true, runValidators: true, session: session })

        if (!updatedPayment) {
            throw new AppError(401, "Payment not found")
        }

        const updatedBooking = await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                { status: BOOKING_STATUS.COMPLETE },
                { new: true, runValidators: true, session }
            )
            .populate("event", "name")
            .populate("user", "fullName email")

        if (!updatedBooking) {
            throw new AppError(401, "Booking not found")
        }

        // const invoiceData: IInvoiceData = {
        //     bookingDate: updatedBooking.createdAt as Date,
        //     guestCount: updatedBooking.guestCount,
        //     totalAmount: updatedPayment.amount,
        //     tourTitle: (updatedBooking.tour as unknown as ITour).title,
        //     transactionId: updatedPayment.transactionId,
        //     userName: (updatedBooking.user as unknown as IUser).name
        // }

        // const pdfBuffer = await generatePdf(invoiceData)

        // const cloudinaryResult = await uploadBufferToCloudinary(pdfBuffer, "invoice")

        // if (!cloudinaryResult) {
        //     throw new AppError(401, "Error uploading pdf")
        // }

        // await Payment.findByIdAndUpdate(updatedPayment._id, { invoiceUrl: cloudinaryResult.secure_url }, { runValidators: true, session })

        // await sendEmail({
        //     to: (updatedBooking.user as unknown as IUser).email,
        //     subject: "Your Booking Invoice",
        //     templateName: "invoice",
        //     templateData: invoiceData,
        //     attachments: [
        //         {
        //             filename: "invoice.pdf",
        //             content: pdfBuffer,
        //             contentType: "application/pdf"
        //         }
        //     ]
        // })

        await session.commitTransaction(); //transaction
        session.endSession()
        return { success: true, message: "Payment Completed Successfully" }
    } catch (error) {
        await session.abortTransaction(); // rollback
        session.endSession()
        // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
        throw error
    }
};
// const failPayment = async (query: Record<string, string>) => {

//     // Update Booking Status to FAIL
//     // Update Payment Status to FAIL

//     const session = await Booking.startSession();
//     session.startTransaction()

//     try {


//         const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
//             status: PAYMENT_STATUS.FAILED,
//         }, { new: true, runValidators: true, session: session })

//         await Booking
//             .findByIdAndUpdate(
//                 updatedPayment?.booking,
//                 { status: BOOKING_STATUS.FAILED },
//                 { runValidators: true, session }
//             )

//         await session.commitTransaction(); //transaction
//         session.endSession()
//         return { success: false, message: "Payment Failed" }
//     } catch (error) {
//         await session.abortTransaction(); // rollback
//         session.endSession()
//         // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
//         throw error
//     }
// };
// const cancelPayment = async (query: Record<string, string>) => {

//     // Update Booking Status to CANCEL
//     // Update Payment Status to CANCEL

//     const session = await Booking.startSession();
//     session.startTransaction()

//     try {


//         const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
//             status: PAYMENT_STATUS.CANCELLED,
//         }, { runValidators: true, session: session })

//         await Booking
//             .findByIdAndUpdate(
//                 updatedPayment?.booking,
//                 { status: BOOKING_STATUS.CANCEL },
//                 { runValidators: true, session }
//             )

//         await session.commitTransaction(); //transaction
//         session.endSession()
//         return { success: false, message: "Payment Cancelled" }
//     } catch (error) {
//         await session.abortTransaction(); // rollback
//         session.endSession()
//         // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
//         throw error
//     }
// };
export const PaymentService = {
  // initializePayment
  successPayment
};
