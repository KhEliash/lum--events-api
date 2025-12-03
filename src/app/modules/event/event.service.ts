// import httpStatus from "http-status-codes";

import AppError from "../../errorHelpers/AppError";
import { IEventCreate } from "./event.interface";
import { EventModel } from "./event.model";

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

export const EventService = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
};
