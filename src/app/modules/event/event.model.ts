import { Schema, model } from 'mongoose';
import { IEvent, EventType, EventStatus } from './event.interface';

const eventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(EventType),
      required: [true, 'Event type is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Host is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
    },
    location: {
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    minParticipants: {
      type: Number,
      required: true,
      min: 1,
    },
    maxParticipants: {
      type: Number,
      required: true,
      min: 1,
    },
    currentParticipants: {
      type: Number,
      default: 0,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    joiningFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    eventImage: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: EventStatus.OPEN,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
eventSchema.index({ host: 1 });
eventSchema.index({ type: 1 });
eventSchema.index({ date: 1 });
eventSchema.index({ 'location.city': 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ participants: 1 });

// Update status automatically when max participants reached
eventSchema.pre('save', function (next) {
  if (this.currentParticipants >= this.maxParticipants) {
    this.status = EventStatus.FULL;
  } else if (this.status === EventStatus.FULL && this.currentParticipants < this.maxParticipants) {
    this.status = EventStatus.OPEN;
  }
  next();
});

export const EventModel = model<IEvent>('Event', eventSchema);