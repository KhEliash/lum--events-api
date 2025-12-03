import AppError from "../../errorHelpers/AppError";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { EventModel } from "../event/event.model";
import { Review } from "../review/review.model";

const createUser = async (payload: IUser) => {
  const { email, password, role, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exists");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    role,
    ...rest,
  });

  return user;
};

const updateProfile = async (userId: string, payload: any) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const { fullName, bio, interests, location: { city, area } = {} } = payload;

  if (fullName !== undefined) user.fullName = fullName;
  if (bio !== undefined) user.bio = bio;
  if (interests !== undefined) user.interests = interests;

  if (city !== undefined || area !== undefined) {
    user.location = {
      city: city ?? user.location?.city ?? "",
      area: area ?? user.location?.area ?? "",
    };
  }
  await user.save();

  return user;
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  return {
    data: user,
  };
};

const getAllUsers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: {
      page,
      limit,
      total: totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
    },
  };
};

const getUserById = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Get hosted events if user is a host
  let hostedEvents: any = [];
  if (user.role === Role.HOST) {
    hostedEvents = await EventModel.find({ host: userId, isActive: true })
      .select(
        "name type date location joiningFee currentParticipants maxParticipants status"
      )
      .limit(5);
  }

  // Get joined events
  const joinedEvents = await EventModel.find({
    participants: userId,
    isActive: true,
  })
    .select("name type date location joiningFee status")
    .limit(5);

  // Get reviews if host
  let reviews :any = [];
  if (user.role === Role.HOST) {
    reviews = await Review.find({ host: userId })
      .populate("reviewer", "fullName profileImage")
      .limit(5)
      .sort({ createdAt: -1 });
  }

  return {
    user,
    hostedEvents,
    joinedEvents,
    reviews,
  };
};

 const deactivateUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  user.isActive = false;
  await user.save();

  return { message: 'User deactivated successfully' };
};
 const activateUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  user.isActive = true;
  await user.save();

  return { message: 'User activated successfully' };
};

export const UserService = {
  createUser,
  getMe,
  getAllUsers,
  getUserById,
  updateProfile,
  deactivateUser,
  activateUser,
};
