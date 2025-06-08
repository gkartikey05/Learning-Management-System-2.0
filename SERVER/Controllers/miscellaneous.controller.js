import AppError from "../Utils/error.util.js";
import sendEmail from "../Utils/sendEmail.js";

export const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    const subject = "Contact Us Form";
    const textMessage = `${name}\n${email}\n\n${message}`;

    await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage);

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};
