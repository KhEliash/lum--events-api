import { Document, Types } from 'mongoose';

export interface IReview extends Document {
  _id: Types.ObjectId;
  event: Types.ObjectId;
  host: Types.ObjectId;
  reviewer: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewCreate {
  event: Types.ObjectId;
  host: Types.ObjectId;
  reviewer: Types.ObjectId;
  rating: number;
  comment: string;
}