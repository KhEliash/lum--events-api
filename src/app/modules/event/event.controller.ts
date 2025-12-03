/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { EventService } from "./event.service";
import { Types } from "mongoose";

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const decoded = req.user as JwtPayload;
  //   const hostId = decoded.userId;

  // Handle image upload if present
  //   let eventImage;
  //   if (req.file) {
  //     const result = await uploadToCloudinary(req.file.buffer, 'events-platform/events');
  //     eventImage = result.secure_url;
  //   }

  const eventData = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    //   image
    minParticipants: Number(req.body.minParticipants),
    maxParticipants: Number(req.body.maxParticipants),

    location: {
      city: req.body.city,
      address: req.body.address,
    },

    host: new Types.ObjectId(decoded.userId as string),
  };
  console.log(eventData);

  const result = await EventService.createEvent(eventData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

export const EventController = {
  //   createUser,
  createEvent,
};
