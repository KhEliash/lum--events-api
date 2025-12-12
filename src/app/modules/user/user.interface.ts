import { Document, Types } from "mongoose";

export enum Role {
  USER = 'user',
  HOST = 'host',
  ADMIN = 'admin'
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  role?: Role;
  profileImage?: string;
  bio?: string;
  phone?: string;
  interests?: string[];
  location?: {
    city: string;
    area: string;
  };
  rating?: number;
  totalRatings?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  fullName: string;
  email: string;
  password: string;
  role?: Role;
  profileImage?: string;
  bio?: string;
  interests?: string[];
  location?: {
    city: string;
    area: string;
  };
}

export interface IUserUpdate {
  fullName?: string;
  profileImage?: string;
  bio?: string;
  interests?: string[];
  location?: {
    city: string;
    area: string;
  };
}