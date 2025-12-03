import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../user/user.model";
import { envVars } from "../../config/env";
import { setCookie } from "../../utils/setCookie";
import { Response } from "express";

const credentialLogin = async (res: Response, payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email }).select("+password");
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does Not Exist");
  }

  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isUserExist.password
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, {
    expiresIn: envVars.JWT_ACCESS_EXPIRES,
  } as SignOptions);

  setCookie(res, accessToken);

  return {
    accessToken,
    user: {
      _id: isUserExist._id,
      fullName: isUserExist.fullName,
      email: isUserExist.email,
      role: isUserExist.role,
      profileImage: isUserExist.profileImage,
      bio: isUserExist.bio,
      interests: isUserExist.interests,
      location: isUserExist.location,
    },
  };
};

const logoutUser = async (res: Response): Promise<void> => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
 
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError(404, "User not found");
  }

  
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new AppError(401, "Old password is incorrect");
  }

 
  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    throw new AppError(400, "New password must be different");
  }

   
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  
  user.password = hashedPassword;
  await user.save();

  return { message: "Password changed successfully" };
};

export const AuthServices = {
  credentialLogin,
  logoutUser,
  changePassword,
};
