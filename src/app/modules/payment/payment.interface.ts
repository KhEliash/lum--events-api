import { Document, Types } from 'mongoose';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface IPayment extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  event: Types.ObjectId;
  host: Types.ObjectId;
  amount: number;
  transactionId: string;
  paymentMethod: string;
  status: PaymentStatus;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentCreate {
  user: Types.ObjectId;
  event: Types.ObjectId;
  host: Types.ObjectId;
  amount: number;
  paymentMethod?: string;
}