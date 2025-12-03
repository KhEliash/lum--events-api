import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { sendResponse } from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const decoded = req.user as JwtPayload;

  const reviewData = {
    ...req.body,
    reviewer: new Types.ObjectId(decoded.userId as string),
  };

  const result = await ReviewService.createReview(reviewData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getHostReviews = catchAsync(async (req: Request, res: Response) => {
  const { hostId } = req.params;
  const result = await ReviewService.getHostReviews(hostId, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews retrieved successfully",
    data: result.reviews,
    meta: result.meta,
  });
});

const getEventReviews = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const result = await ReviewService.getEventReviews(eventId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getHostReviews,
  getEventReviews,
};
