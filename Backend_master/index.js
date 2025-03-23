require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const twilio = require("twilio");

const hbs = require("hbs"); // Import Handlebars
const fs = require("fs"); // File system module

const app = express();
app.use(cors());
app.use(bodyParser.json());

let generatedOtp = null; // Store the OTP temporarily
let attempts = 0; // Track the number of failed attempts
let blockUntil = null; // Track the time until the user is blocked

// Configure Twilio Client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send OTP via Email
const sendOtpEmail = (email, otp, isBlocked = false) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
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

// Function to send OTP via SMS
const sendOtpSms = (otp) => {
  twilioClient.messages
    .create({
      body: `Your OTP is: ${otp}. Do not share this with anyone.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+918287790046",
    })
    .then((message) => console.log("SMS sent: ", message.sid))
    .catch((error) => console.log("Error sending SMS:", error));
};

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email_or_phone, password } = req.body;

  if (
    (email_or_phone === "kartiktaneja000@gmail.com" || email_or_phone === "8287790046") &&
    password === "kartik@123"
  ) {
    if (blockUntil && Date.now() < blockUntil) {
      const remainingTime = Math.ceil((blockUntil - Date.now()) / 1000);
      sendOtpEmail(email_or_phone, null, true);
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Please try again in ${remainingTime} seconds.`,
      });
    }

    attempts = 0;
    blockUntil = null;

    generatedOtp = Math.floor(100000 + Math.random() * 900000);
    console.log(`Generated OTP: ${generatedOtp}`);

    sendOtpEmail("kartiktaneja000@gmail.com", generatedOtp);
    sendOtpSms(generatedOtp);

    res.json({ success: true, message: "OTP sent to your email and phone" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// Resend OTP endpoint
app.post("/api/resend-otp", (req, res) => {
  const { email_or_phone } = req.body;

  if (blockUntil && Date.now() < blockUntil) {
    const remainingTime = Math.ceil((blockUntil - Date.now()) / 1000);
    sendOtpEmail(email_or_phone, null, true);
    return res.status(429).json({ success: false, message: `Too many failed attempts. Please try again in ${remainingTime} seconds.` });
  }

  generatedOtp = Math.floor(100000 + Math.random() * 900000);
  console.log(`New OTP generated: ${generatedOtp}`);

  sendOtpEmail("kartiktaneja000@gmail.com", generatedOtp);
  sendOtpSms(generatedOtp);

  res.json({ success: true, message: "New OTP sent to your email and phone" });
});

// OTP verification endpoint
app.post("/api/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (blockUntil && Date.now() < blockUntil) {
    const remainingTime = Math.ceil((blockUntil - Date.now()) / 1000);
    sendOtpEmail("kartiktaneja000@gmail.com", null, true);
    return res.status(429).json({ success: false, message: `Too many failed attempts. Please try again in ${remainingTime} seconds.` });
  }

  if (Number(otp) === generatedOtp) {
    attempts = 0;
    generatedOtp = null;
    res.json({ success: true, message: "OTP verified successfully" });
  } else {
    attempts += 1;

    if (attempts >= 5) {
      blockUntil = Date.now() + 5 * 60 * 1000;
      sendOtpEmail("kartiktaneja000@gmail.com", null, true);
      return res.status(429).json({ success: false, message: "Too many failed attempts. You are blocked for 5 minutes." });
    }

    res.json({ success: false, message: `Invalid OTP. Attempts left: ${5 - attempts}` });
  }
});


// Read Handlebars template file
const emailTemplate = fs.readFileSync("templates/support_ticket_email.hbs", "utf-8");

// New API to handle ticket submission
app.post("/api/submit-ticket", (req, res) => {
    const { subject, description,  userEmail } = req.body;

    if (!subject || !description || !userEmail) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }


    // Compile template with Handlebars
    const compiledTemplate = hbs.compile(emailTemplate);
    const emailHtml = compiledTemplate({
        subject,
        description,
        userEmail
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Admin Email (Already in .env)
        subject: "New Support Ticket Submitted",
        html: emailHtml, // Sending HTML Email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending support ticket email:", error);
            return res.status(500).json({ success: false, message: "Failed to send ticket email." });
        }
        console.log("Support Ticket Email sent:", info.response);
        res.json({ success: true, message: "Support ticket submitted successfully." });
    });
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});