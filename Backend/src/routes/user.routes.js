import { Router } from "express";
import { registerUser,loginUser,logoutUser ,refreshAccessToken} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyOtp } from "../controllers/otpVerification.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),

  registerUser,
);
router.route("/login").post(loginUser); 

router.route("/logout").post(verifyJWT /* this middleware is for authentication kyuki tabhi toh hum loggout krwa payenge vrna koi bhi kisi ka bhi loggout krdega*/ , logoutUser)
router.route("/verify-otp").post(verifyOtp);
router.route("/refresh-TOken").post(refreshAccessToken)
export default router;