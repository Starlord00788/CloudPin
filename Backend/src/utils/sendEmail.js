import nodemailer from "nodemailer";
export const sendOTPEmail = async ({ email, otp }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"CloudPin Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your CloudPin Account",
      html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Could not send email");
  }
};