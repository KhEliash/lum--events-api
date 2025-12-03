import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';
import { User } from '../user/user.model';

const reviewSchema = new Schema<IReview>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event is required'],
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Host is required'],
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Reviewer is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
reviewSchema.index({ event: 1, reviewer: 1 }, { unique: true });
reviewSchema.index({ host: 1 });

// Update host rating after review is saved
reviewSchema.post('save', async function () {
  const Review = model<IReview>('Review', reviewSchema);
  
  const stats = await Review.aggregate([
    {
      $match: { host: this.host },
    },
    {
      $group: {
        _id: '$host',
        avgRating: { $avg: '$rating' },
        totalRatings: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await User.findByIdAndUpdate(this.host, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      totalRatings: stats[0].totalRatings,
    });
  }
});

export const Review = model<IReview>('Review', reviewSchema);