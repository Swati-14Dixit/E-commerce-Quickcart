import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Create a transporter using SMTP (configure with your SMTP details)
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com", // Replace with your SMTP host
    port: 587,
    secure: false,
    auth: {
      user: "your_smtp_user", // Replace with your SMTP user
      pass: "your_smtp_password", // Replace with your SMTP password
    },
  });

  const mailOptions = {
    from: '"Quickart Subscription" <no-reply@quickart.com>',
    to: "swati41dixit@gmail.com",
    subject: "New Newsletter Subscription",
    text: `New subscriber email: ${email}`,
    html: `<p>New subscriber email: <strong>${email}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Subscription email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
