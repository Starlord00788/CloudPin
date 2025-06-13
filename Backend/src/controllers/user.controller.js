import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../utils/sendEmail.js";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const generateAccessandRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateACCESStoken();
    const refreshToken = user.generateREFRESHtoken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // saving refresh token in db without a password

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens !! ",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details via frontend
  //validation - not empty
  //check if the user already exists - username,email
  //check for images , check for avatar
  //upload them to cloudinary,avatar
  //create user object -create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return the response

  const { username, email, password, fullname } = req.body;
  // console.log("email : ", email);

  if (
    [username, email, password, fullname].some((field) => field?.trim === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with username or email already exists");
  }


  const otp = generateOTP();
  const otpExpiresAT = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await sendOTPEmail({ email, otp });
  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  let avatar;
  if (avatarLocalPath) {
    try {
      avatar = await uploadCloudinary(avatarLocalPath);
    } catch (error) {
      throw new ApiError(500, "Failed to upload avatar");
    }
    // console.log("Avatar uploaded:", avatar);
  }

  const user = await User.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password,
    avatar: avatar?.url || "",
    otp,
    otpExpiresAT,
    isVerified: false,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user ");
  }

  // const response = new ApiResponse(
  //   200,
  //   createdUser,
  //   "User registered Successfully",
  // );
  // console.log("Response:", response);

  res.status(201).json({
  success: true,
  message: "Registered! Please verify your email.",
  email: createdUser.email,
});

});

const loginUser = asyncHandler(async (req, res) => {
  // todos
  // take data from the frontend via req body
  // username or email access based
  // check if the user already exists - find the user
  // password
  // access and refresh token generate
  // send cookies
  // can send the response
  const { email, username, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }
  console.log(email);
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, " User does not exists");
  }
  if (!user.isVerified) {
    return res.status(403).json({ msg: "Please verify your account via OTP" });
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    user._id,
  );

  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          loggedUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User has been logged out Successfullt"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthoized request");
  }

  const decodedToken = jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(401, "Invalid request");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(402, "Access Denied or refresh token expired");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, newRefreshTOken } = generateAccessandRefreshTokens(
    user._id,
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshTOken, options)
    .json(
      new ApiResponse(
        201,
        { accessToken, refreshToken: newRefreshTOken },
        "Access Token refreshed",
      ),
    );
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
