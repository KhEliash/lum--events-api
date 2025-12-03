/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { EventService } from "./event.service";
import { Types } from "mongoose";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const decoded = req.user as JwtPayload;
  const hostId = decoded.userId;

  let eventImage;
  if (req.file) {
    const result = await uploadToCloudinary(
      req.file.buffer,
      "events-platform/events"
    );
    eventImage = result.secure_url;
  }

  const eventData = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    eventImage,
    minParticipants: Number(req.body.minParticipants),
    maxParticipants: Number(req.body.maxParticipants),

    location: {
      city: req.body.city,
      address: req.body.address,
    },

    host: new Types.ObjectId(decoded.userId as string),
  };

  const result = await EventService.createEvent(eventData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getAllEvents(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Events retrieved successfully",
    data: result.events,
    meta: result.meta,
  });
});

const getEventById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventService.getEventById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event retrieved successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decoded = req.user as JwtPayload;

  if (req.file) {
    const result = await uploadToCloudinary(
      req.file.buffer,
      "events-platform/events"
    );
    req.body.eventImage = result.secure_url;
  }

  const result = await EventService.updateEvent(id, decoded.userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event updated successfully",
    data: result,
  });
});

const joinEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId as string;

  const result = await EventService.joinEvent(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Joined event successfully",
    data: result,
  });
});

const leaveEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId as string;

  const result = await EventService.leaveEvent(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Left event successfully",
    data: result?.message,
  });
});

const getHostedEvents = catchAsync(async (req: Request, res: Response) => {
  const decoded = req.user as JwtPayload;
  const result = await EventService.getHostedEvents(decoded.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Hosted events retrieved successfully",
    data: result,
  });
});

const getJoinedEvents = catchAsync(async (req: Request, res: Response) => {
  const decoded = req.user as JwtPayload;
  const result = await EventService.getJoinedEvents(decoded.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Joined events retrieved successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decoded = req.user as JwtPayload;

  const result = await EventService.deleteEvent(id, decoded.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event deleted successfully",
    data: result,
  });
});

export const EventController = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  joinEvent,
  leaveEvent,
  getHostedEvents,
  getJoinedEvents,
  deleteEvent,
};
