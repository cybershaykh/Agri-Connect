import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to AgriConnect – Bridging Farmers & Buyers",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #16a34a;">Hello ${name},</h2>
          <p>Welcome to <strong>AgriConnect</strong> – your digital hub for connecting directly with buyers, farmers, and agricultural knowledge.</p>
          <p>We're excited to have you onboard! Here's what you can do on AgriConnect:</p>
          <ul>
            <li>🌾 List or buy fresh farm produce</li>
            <li>📈 View real-time market prices</li>
            <li>🌦️ Get daily weather forecasts</li>
            <li>📚 Learn best farming practices</li>
          </ul>
          <p>Start exploring now and make the most of our community-driven platform.</p>
          <a href="https://agriconnect.app" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px;">Visit AgriConnect</a>
          <p style="margin-top: 20px;">Together, we grow stronger!<br/>🌿 The AgriConnect Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
};

export { sendWelcomeEmail };
