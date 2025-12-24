// import httpStatus from "http-status-codes";

import { Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { EventStatus, IEventCreate } from "./event.interface";
import { EventModel } from "./event.model";
import { Payment } from "../payment/payment.model";
import { PaymentStatus } from "../payment/payment.interface";
import { BOOKING_STATUS } from "../Booking/booking.interface";
import { Booking } from "../Booking/booking.model";

const createEvent = async (eventData: IEventCreate) => {
  const event = await EventModel.create(eventData);
  return await event.populate("host", "fullName profileImage rating");
};

const getAllEvents = async (query: any) => {
  const {
    page = 1,
    limit = 10,
    type,
    city,
    status,
    date,
    search,
    sortBy = "date",
    sortOrder = "asc",
  } = query;

  const skip = (page - 1) * limit;

  const filter: any = { isActive: true };

  if (type) filter.type = type;
  if (city) filter["location.city"] = { $regex: city, $options: "i" };
  if (status) filter.status = status;
  if (date) {
    const searchDate = new Date(date);
    filter.date = {
      $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
      $lte: new Date(searchDate.setHours(23, 59, 59, 999)),
    };
  }
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions: any = {};
  sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

  const events = await EventModel.find(filter)
    .populate("host", "fullName profileImage rating")
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sortOptions);

  const total = await EventModel.countDocuments(filter);

  return {
    events,
    meta: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
    },
  };
};

const getEventById = async (eventId: string) => {
  const event = await EventModel.findById(eventId)
    .populate("host", "fullName profileImage rating totalRatings bio")
    .populate("participants", "fullName profileImage");

  if (!event) {
    throw new AppError(404, "Event not found");
  }

  return event;
};

const updateEvent = async (
  eventId: string,
  userId: string,
  updateData: any
) => {
  const event = await EventModel.findById(eventId);

  if (!event) {
    throw new AppError(404, "Event not found");
  }

  if (event.host.toString() !== userId) {
    throw new AppError(403, "You are not authorized to update this event");
  }

  const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updateData, {
    new: true,
    runValidators: true,
  }).populate("host", "fullName profileImage rating");

  return updatedEvent;
};

const joinEvent = async (eventId: string, userId: string) => {
  const event = await EventModel.findById(eventId);

  if (!event) {
    throw new AppError(404, "Event not found");
  }

  if (event.status === EventStatus.FULL) {
    throw new AppError(400, "Event is already full");
  }

  if (event.status === EventStatus.CANCELLED) {
    throw new AppError(400, "Event is cancelled");
  }

  if (event.status === EventStatus.COMPLETED) {
    throw new AppError(400, "Event is already completed");
  }

  if (event.host.toString() === userId) {
    throw new AppError(400, "You cannot join your own event");
  }

  if (event.participants.includes(new Types.ObjectId(userId))) {
    throw new AppError(400, "You have already joined this event");
  }

  // Check if payment required
  const existingBooking = await Booking.findOne({
    user: userId,
    event: eventId,
    status: BOOKING_STATUS.COMPLETE,
  });

  if (existingBooking) {
    const payment = await Payment.findOne({
      booking: existingBooking._id,
      status: PaymentStatus.PAID,
    });

    if (!payment) {
      throw new AppError(400, "Payment required to join this event");
    }
  }
  event.participants.push(new Types.ObjectId(userId));
  event.currentParticipants += 1;
  await event.save();

  return await event.populate("host", "fullName profileImage rating");
};

const leaveEvent = async (eventId: string, userId: string) => {
  const event = await EventModel.findById(eventId);

  if (!event) {
    throw new AppError(404, "Event not found");
  }
  if (event?.status === "completed") {
    throw new AppError(404, "Event completed you can't leave now");
  }

  if (!event.participants.includes(new Types.ObjectId(userId))) {
    throw new AppError(400, "You are not a participant of this event");
  }

  event.participants = event.participants.filter(
    (p) => p.toString() !== userId
  );
  event.currentParticipants -= 1;
  await event.save();

  return { message: "Left event successfully" };
};

const getHostedEvents = async (userId: string) => {
  const events = await EventModel.find({ host: userId, isActive: true })
    .populate("participants", "fullName profileImage")
    .sort({ date: 1 });

  return events;
};

const getJoinedEvents = async (userId: string) => {
  const events = await EventModel.find({ participants: userId, isActive: true })
    .populate("host", "fullName profileImage rating")
    .sort({ date: 1 });

  return events;
};

const deleteEvent = async (eventId: string, userId: string) => {
  const event = await EventModel.findById(eventId);
  if (!event) {
    throw new AppError(404, "Event not found");
  }

  if (event.host.toString() !== userId) {
    throw new AppError(403, "You are not authorized to delete this event");
  }

  event.isActive = false;
  event.status = EventStatus.CANCELLED;
  await event.save();

  return { message: "Event deleted successfully" };
};

export const EventService = {
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
