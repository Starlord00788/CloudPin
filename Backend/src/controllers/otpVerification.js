import { User } from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  if (user.otpExpiresAT < new Date()) {
    return res.status(400).json({ msg: "OTP expired" });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiresAT = undefined;
  await user.save();

  res.json({ msg: "Account verified successfully" });
});
