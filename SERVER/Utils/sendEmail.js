import { createTransport } from "nodemailer";

const sendEmail = async function (email, subject, message) {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  (async () => {
    const mailoptions = {
      from: process.env.SMTP_FROM_EMAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text
    };
    await transporter.sendMail(mailoptions, (error, info) => {
      if (error) return console.error("Error sending email:", error);
      console.log("Email sent: ", info.messageId);
    });
  })();
};

export default sendEmail;
