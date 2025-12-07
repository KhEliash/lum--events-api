import { Schema, model } from "mongoose";
import { IPayment, PaymentStatus } from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "User is required"],
      unique: true,
    },
    transactionId: {
      type: String,

      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 0,
    },

    paymentMethod: {
      type: Schema.Types.Mixed,
    },
    invoiceUrl: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

 
export const Payment = model<IPayment>("Payment", paymentSchema);
