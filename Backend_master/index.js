const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let generatedOtp = null; // Store the OTP temporarily
let attempts = 0; // Track the number of failed attempts
let blockUntil = null; // Track the time until the user is blocked

// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kartiktaneja03@gmail.com", // Your sender email
    pass: "uvgwlnnxafpfzrpe", // App-specific password
  },
});

// Function to send OTP via email
const sendOtpEmail = (email, otp, isBlocked = false) => {
  const mailOptions = {
    from: "kartiktaneja03@gmail.com", // Sender email
    to: email,
    subject: isBlocked
      ? "Too Many Failed Attempts - OTP Blocked"
      : "Your OTP for Login to LTIMindtree Portal",
    text: isBlocked
      ? "Your account has been temporarily blocked due to too many failed OTP attempts. Please try again after 5 minutes. \n\nLTIMindtree"
      : `Your OTP is: ${otp}. Please do not share this OTP with anyone. \n\nLTIMindtree`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email_or_phone, password } = req.body;

  // Dummy authentication
  if (email_or_phone === "kartiktaneja000@gmail.com" && password === "kartik@123") {
    // If the user is blocked
    if (blockUntil && Date.now() < blockUntil) {
      const remainingTime = Math.ceil((blockUntil - Date.now()) / 1000);
      sendOtpEmail(email_or_phone, null, true); // Notify user about the block through email
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Please try again in ${remainingTime} seconds.`,
      });
    }

    // Reset attempts and block status
    attempts = 0;
    blockUntil = null;

    // Generate OTP
    generatedOtp = Math.floor(100000 + Math.random() * 900000);
    console.log(`Generated OTP: ${generatedOtp}`);

    // Send OTP to user's email
    sendOtpEmail(email_or_phone, generatedOtp);

    res.json({ success: true, message: "OTP sent to your email" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// Resend OTP endpoint
app.post("/api/resend-otp", (req, res) => {
  const { email_or_phone } = req.body;

  // If the user is blocked
  if (blockUntil && Date.now() < blockUntil) {
    const remainingTime = Math.ceil((blockUntil - Date.now()) / 1000);
    sendOtpEmail(email_or_phone, null, true); // Notify user about the block through email
    return res.status(429).json({
      success: false,
      message: `Too many failed attempts. Please try again in ${remainingTime} seconds.`,
    });
  }

  // Generate new OTP
  generatedOtp = Math.floor(100000 + Math.random() * 900000);
  console.log(`New OTP generated: ${generatedOtp}`);

  // Send new OTP to user's email
  sendOtpEmail(email_or_phone, generatedOtp);

  res.json({ success: true, message: "New OTP sent to your email" });
});

// OTP verification endpoint
app.post("/api/verify-otp", (req, res) => {
  const { otp, email_or_phone } = req.body;

  // Validate email
  if (!email_or_phone) {
    return res.status(400).json({
      success: false,
      message: "Email is required to verify OTP",
    });
  }

  // Check if user is blocked
  if (blockUntil && Date.now() < blockUntil) {
    const remainingTime = Math.ceil((blockUntil - Date.now()) / 1000);
    sendOtpEmail(email_or_phone, null, true); // Notify user about the block via email
    return res.status(429).json({
      success: false,
      message: `Too many failed attempts. Please try again in ${remainingTime} seconds.`,
    });
  }

  // Check OTP
  if (Number(otp) === generatedOtp) {
    attempts = 0; // Reset attempts on successful OTP verification
    generatedOtp = null; // Clear OTP after successful verification
    res.json({ success: true, message: "OTP verified successfully" });
  } else {
    attempts += 1;

    // If there are 5 failed attempts, block the user for 5 minutes
    if (attempts >= 5) {
      blockUntil = Date.now() + 5 * 60 * 1000; // Block the user for 5 minutes
      sendOtpEmail(email_or_phone, null, true); // Notify user about the block via email
      return res.status(429).json({
        success: false,
        message: "Too many failed attempts. You are blocked for 5 minutes.",
      });
    }

    res.json({
      success: false,
      message: `Invalid OTP. Attempts left: ${5 - attempts}`,
    });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
