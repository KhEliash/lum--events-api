 
import { model, Schema } from "mongoose";
import { IUser, Role,   } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    profileImage: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: '',
    },
    interests: {
      type: [String],
      default: [],
    },
    location: {
      city: { type: String, default: '' },
      area: { type: String, default: '' },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    phone:{
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   transform: function (doc, ret) {
    //     delete ret.password;
    //     return ret;
    //   },
    // },
  }
);

// userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'location.city': 1 });
userSchema.index({ interests: 1 });

export const User = model<IUser>('User', userSchema);
