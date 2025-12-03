/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
 
const createUser = async (payload: IUser) => {
  const { email, password, role, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exists");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    role,
    ...rest,
  });

  return user;
};

// const updateProfile = async (userId: string, payload: any) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   // const { fullName, phone } = payload;

//   // if (fullName) user.fullName = name;
//   // if (phone) user.phone = phone;

//   await user.save();

//   return user;
// };

// const getMe = async (userId: string) => {
//   const user = await User.findById(userId).select("-password");
//   return {
//     data: user,
//   };
// };

const blockUser = async (params: any) => {
  const { userId } = params;
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
const unBlockUser = async (params: any) => {
  const { userId } = params;
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: false },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const UserService = {
  createUser,
  // getMe,
  blockUser,
  unBlockUser,
  // updateProfile,
};
