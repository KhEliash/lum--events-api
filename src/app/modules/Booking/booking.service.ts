import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Payment } from "../payment/payment.model";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { PaymentStatus } from "../payment/payment.interface";
import { getTransactionId } from "../../utils/getTransactionId";
import { EventModel } from "../event/event.model";
import { ISSLCommerz } from "../sslcommerz/sslCommerz.interface";
import { SSLService } from "../sslcommerz/sslCommerz.service";
import mongoose from "mongoose";

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);

    if (!user?.phone || !user.location) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please Update Your Profile to Book a Event."
      );
    }

    const event = await EventModel.findById(payload.event).select("joiningFee");

    if (!event?.joiningFee) {
      throw new AppError(httpStatus.BAD_REQUEST, "No joiningFee Found!");
    }

    const existingPayment = await Payment.findOne({
      booking: {
        $in: await Booking.find({ user: userId, event: payload.event }).select(
          "_id"
        ),
      },
      status: { $in: [ PaymentStatus.PAID] },
    });

    if (existingPayment) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You already have a  completed payment for this event."
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const amount = Number(event.joiningFee) * Number(payload.guestCount!);

    const booking = await Booking.create(
      [
        {
          user: userId,
          status: BOOKING_STATUS.PENDING,
          ...payload,
        },
      ],
      { session }
    );

    const payment = await Payment.create(
      [
        {
          booking: booking[0]._id,
          status: PaymentStatus.UNPAID,
          transactionId: transactionId,
          amount: amount,
        },
      ],
      { session }
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      { payment: payment[0]._id },
      { new: true, runValidators: true, session }
    )
      .populate("user", "fullName email phone location")
      .populate("event", "name joiningFee")
      .populate("payment");

    const userAddress = (updatedBooking?.user as any).location?.city;
    const userEmail = (updatedBooking?.user as any).email;
    const userPhoneNumber = (updatedBooking?.user as any).phone;
    const userName = (updatedBooking?.user as any).fullName;

    const sslPayload: ISSLCommerz = {
      address: userAddress,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      name: userName,
      amount: amount,
      transactionId: transactionId,
    };

    const sslPayment = await SSLService.sslPaymentInit(sslPayload);

    await session.commitTransaction(); //transaction
    session.endSession();
    return {
      paymentUrl: sslPayment.GatewayPageURL,

      booking: updatedBooking,
    };
  } catch (error) {
    await session.abortTransaction(); // rollback
    session.endSession();
    // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
    throw error;
  }
};

const getUserBookings = async () => {
  return {};
};

const getBookingById = async (userId: string, eventId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      throw new AppError(400, "Invalid eventId");
    }
    const bookings = await Booking.findOne({
      user: userId,
      event: eventId,
      status: "COMPLETE",
    }).populate("payment");

    if (!bookings) {
      throw new AppError(404, "No booking found");
    }
    return bookings;
  } catch (error: any) {
    return error.message || "No bookings found";
  }
};

const updateBookingStatus = async () => {
  return {};
};

const getAllBookings = async () => {
  return {};
};

export const BookingService = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings,
};
