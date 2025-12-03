import AppError from "../../errorHelpers/AppError";

import httpStatus from "http-status-codes";

import { envVars } from "../../config/env";
import { IEventCreate } from "./event.interface";
import { EventModel } from "./event.model";

 

const createEvent = async (eventData: IEventCreate) => {
  const event = await EventModel.create(eventData);
  return await event.populate("host", "fullName profileImage rating");
};



export const EventService = {
  createEvent,
};
