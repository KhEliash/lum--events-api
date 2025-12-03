import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";
import AppError from "../errorHelpers/AppError";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder = "events-platform"
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
        transformation: [
          { width: 1000, height: 1000, crop: "limit" },
          { quality: "auto" },
        ],
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error) {
          reject(new AppError(500, "Failed to upload image to Cloudinary"));
        } else if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
};
