import { Document, Types } from "mongoose";

export enum EventType {
  CONCERT = "concert",
  HIKE = "hike",
  DINNER = "dinner",
  SPORTS = "sports",
  GAMING = "gaming",
  TECH_MEETUP = "tech_meetup",
  ART = "art",
  OTHER = "other",
}

export enum EventStatus {
  OPEN = "open",
  FULL = "full",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export interface IEvent extends Document {
  _id: Types.ObjectId;
  name: string;
  type: EventType;
  description: string;
  host: Types.ObjectId;
  date: Date;
  time: string;
  location: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  participants: Types.ObjectId[];
  joiningFee: number;
  eventImage?: string;
  status: EventStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventCreate {
  name: string;
  type: EventType;
  description: string;
  host: Types.ObjectId;
  date: Date;
  time: string;
  location: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  minParticipants: number;
  maxParticipants: number;
  joiningFee?: number;
  eventImage?: string;
}
