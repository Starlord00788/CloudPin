import { File } from "../models/File.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

import { nanoid } from "nanoid";
export const uploadFile = async (req, res, next) => {
  try {
    const localPath = req.file?.path;
    if (!localPath) {
      return res.status(400).json({ message: "No file provided" });
    }
    if (req.file.mimetype === "application/pdf") {
      return res.status(400).json({ message: "PDF uploads not supported" });
    }
    // Upload to Cloudinary
    const cloudResult = await uploadCloudinary(localPath);
    console.log(cloudResult.resource_type); // log this

    const shortId = nanoid(8);

    // Construct forced download URL
    const encodedFileName = encodeURIComponent(req.file.originalname); // keeps original name for download
    const publicId = cloudResult.public_id;
    const resourceType = cloudResult.resource_type; // 'raw', 'image', 'video', etc.

    // Construct forced download URL
    const forcedDownloadUrl = `https://res.cloudinary.com/${cloudinary.config().cloud_name}/${resourceType}/upload/fl_attachment/${publicId}`;

    const newFile = await File.create({
      owner: req.user._id,
      filename: req.file.originalname,
      url: forcedDownloadUrl,
      downloadUrl: forcedDownloadUrl, 
      size: req.file.size,
      type: req.file.mimetype,
      publicId,
      shortId,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
      downloadUrl: `${process.env.CLIENT_BASE_URL}/f/${shortId}`,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyFiles = async (req, res, next) => {
  try {
    const files = await File.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ files });
  } catch (err) {
    next(err);
  }
};
export const getFileByShortId = async (req, res, next) => {
  try {
    const file = await File.findOne({ shortId: req.params.shortId });
    if (!file) return res.status(404).json({ message: "File not found" });

    // Optional: track downloads
    file.downloaded += 1;
    await file.save();

    res.status(200).json({
      file: {
        filename: file.filename,
        url: file.url,
        size: file.size,
        type: file.type,
        downloaded: file.downloaded,
      },
    });
    // or send metadata
  } catch (err) {
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file || file.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await cloudinary.uploader.destroy(file.publicId);
    await file.deleteOne();

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    next(err);
  }
};
