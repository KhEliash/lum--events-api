/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  }
);

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;

  const updatedUser = await UserService.updateProfile(
    decodedToken.userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const result = await UserService.getMe(decodedToken.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Profile Retrieved Successfully",
    data: result.data,
  });
});

// const getUserProfile = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await UserService.getUserById(id);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User profile retrieved successfully',
//     data: result,
//   });
// });

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await UserService.getAllUsers(page, limit);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "All Users Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

 

export const UserController = {
  createUser,
  getMe,
  getAllUsers,
  // getUserProfile, 
  updateProfile,
};
