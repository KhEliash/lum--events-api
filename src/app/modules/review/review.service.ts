import AppError from "../../errorHelpers/AppError";
import { EventStatus } from "../event/event.interface";
import { EventModel } from "../event/event.model";
import { IReviewCreate } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (reviewData: IReviewCreate) => {
  const event = await EventModel.findById(reviewData.event);

  if (!event) {
    throw new AppError(404, "Event not found");
  }

  if (event.status !== EventStatus.COMPLETED) {
    throw new AppError(400, "You can only review completed events");
  }

  // Check if reviewer was a participant
  const wasParticipant = await EventModel.exists({
    _id: reviewData.event,
    participants: reviewData.reviewer,
  });

  if (!wasParticipant) {
    throw new AppError(400, "You must have attended the event to review it");
  }

  // Check if review already exists
  const existingReview = await Review.findOne({
    event: reviewData.event,
    reviewer: reviewData.reviewer,
  });

  if (existingReview) {
    throw new AppError(400, "You have already reviewed this event");
  }

  const review = await Review.create(reviewData);
  return await review.populate([
    { path: "reviewer", select: "fullName profileImage" },
    { path: "event", select: "name type date" },
  ]);
};

const getHostReviews = async (hostId: string, query: any) => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({ host: hostId })
    .populate("reviewer", "fullName profileImage")
    .populate("event", "name type date")
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Review.countDocuments({ host: hostId });

  return {
    reviews,
    meta: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
    },
  };
};

const getEventReviews = async (eventId: string) => {
  const reviews = await Review.find({ event: eventId })
    .populate("reviewer", "fullName profileImage")
    .sort({ createdAt: -1 });

  return reviews;
};

const updateReview = async (reviewId: string, userId: string, updateData: any) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new AppError(404, 'Review not found');
  }

  if (review.reviewer.toString() !== userId) {
    throw new AppError(403, 'You are not authorized to update this review');
  }



  const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, {
    new: true,
    runValidators: true,
  }).populate([
    { path: 'reviewer', select: 'fullName profileImage' },
    { path: 'event', select: 'name type date' },
  ]);

  return updatedReview;
};

export const ReviewService = {
  createReview,
  getHostReviews,
  getEventReviews,
  updateReview,
};
