import { Types } from 'mongoose';

export enum PaymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  CANCELLED= 'CANCELLED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface IPayment  {
  booking: Types.ObjectId;
  transactionId: string;
  amount: number;
  paymentMethod?: any;
  status: PaymentStatus;
  invoiceUrl?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

 