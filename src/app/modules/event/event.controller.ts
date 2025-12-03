/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
 import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

// const createUser = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const user = await UserService.createUser(req.body);

//     sendResponse(res, {
//       statusCode: httpStatus.CREATED,
//       success: true,
//       message: "User Created Successfully",
//       data: user,
//     });
//   }
// );

 
export const EventController = {
//   createUser,
 
};
