import { Schema, model } from 'mongoose';
import { IPayment, PaymentStatus } from './payment.interface';

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event is required'],
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Host is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      default: 'sslcommerz',
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
paymentSchema.index({ user: 1 });
paymentSchema.index({ event: 1 });
paymentSchema.index({ host: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ status: 1 });

export const Payment = model<IPayment>('Payment', paymentSchema);