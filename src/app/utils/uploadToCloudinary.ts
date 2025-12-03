import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";
import AppError from "../errorHelpers/AppError";
import crypto from "crypto";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder = "events-platform"
): Promise<CloudinaryUploadResult> => {
  try {
    //  Generate hash for exact duplicate detection
    const hash = crypto.createHash("sha1").update(fileBuffer).digest("hex");
    const publicId = `${folder}/${hash}`;

    //  Check if the asset already exists
    try {
      const existing = await cloudinary.api.resource(publicId);

      // If found → DO NOT upload, return existing
      return {
        secure_url: existing.secure_url,
        public_id: existing.public_id,
      };
    } catch (err) {
      // Resource not found → we upload it
    }

    // Upload new asset since no existing one found
    const result: UploadApiResponse = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${fileBuffer.toString("base64")}`,
      {
        public_id: hash,
        folder,
        unique_filename: false,
        overwrite: false,
        resource_type: "auto",
        transformation: [
          { width: 1000, height: 1000, crop: "limit" },
          { quality: "auto" },
        ],
      }
    );

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new AppError(500, "Failed to upload image to Cloudinary");
  }
};
