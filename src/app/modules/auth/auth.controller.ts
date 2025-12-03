/* eslint-disable @typescript-eslint/no-unused-vars */

import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";
const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialLogin(res, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: " Users Logged In Successfully",
      data: loginInfo,
    });
  }
);

const credentialLogout = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.logoutUser(res);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged Out Successfully",
    data: null,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const decoded = req.user as JwtPayload;
  const { oldPassword, newPassword } = req.body;

  const result = await AuthServices.changePassword(decoded.userId, oldPassword, newPassword);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: null
  });
});

 

export const AuthControllers = {
  credentialLogin,
  credentialLogout,
  changePassword
};
