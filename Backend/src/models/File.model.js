import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true, // ✅ This is the Cloudinary "view" URL
    },
    downloadUrl: {
      type: String,
      required: true, // ✅ Add this for the forced-download link
    },
    size: {
      type: Number, // in bytes
      required: true,
    },
    type: {
      type: String, // image/png, application/pdf
      required: true,
    },
    publicId: {
      type: String, // Cloudinary public_id (used for deletion)
      required: true,
    },
    shortId: {
      type: String, // for generating short, shareable links (e.g., 6-digit code)
      unique: true,
      required: true,
    },
    downloaded: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const File = mongoose.model("File", fileSchema);
