import nodemailer from "nodemailer";

export const sendFarmerApprovalEmail = async (to, name, status) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or any email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subject =
    status === "Verified"
      ? "Your AgriConnect account is approved"
      : "Your AgriConnect access has been revoked";

  const text =
    status === "Verified"
      ? `Hi ${name}, your account has been approved. You can now fully use the platform.`
      : `Hi ${name}, your approval has been revoked. Please contact support for clarification.`;

  await transporter.sendMail({
    from: `"AgriConnect" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
