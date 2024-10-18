const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { HttpError } = require("../middlewares/error");
const jwt = require("../utils/jwt.js");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "your_email@gmail.com",
    pass: "###",
  },
});

exports.login = async (req, res, next) => {
  const LOGIN_ERROR = "Incorrect email or password";

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) throw new HttpError(401, LOGIN_ERROR);

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new HttpError(401, LOGIN_ERROR);

    const userId = user.id;

    res.status(200).json({ userId, token: jwt.sign({ userId }) });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    console.log("Starting signup process");
    const { email, password } = req.body;
    console.log("Received email:", email);

    const verificationCode = crypto.randomInt(100000, 999999);
    console.log("Generated verification code:", verificationCode);

    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Verification code for your registration",
      html: `
        <h2>Hello,</h2>
        <p>Thank you for registering on our platform! To complete your registration, please use the verification code below:</p>
        <h3 style="color: #4CAF50;">Verification Code: ${verificationCode}</h3>
        <p>We recommend writing this code on paper and deleting the email. Please note that this code will be required for each login to our platform.</p>
        <p>If you didn't request this registration, please ignore this email.</p>
        <p>Thank you for your trust, and we're available for any questions.</p>
        <p>Best regards,<br>[Your Company Name] Team</p>
      `,
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      verificationCode,
    });

    if (!User) {
      console.error("User model is not properly imported");
      // You might want to throw an error here or handle it appropriately
    }

    console.log("User saved successfully");

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(201).json({
      message: "User created. Check your email for the verification code.",
    });
  } catch (error) {
    console.error("Detailed error:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      next(new HttpError(400, { message: "Email already exists" }));
    } else {
      next(new HttpError(500, { message: "Registration failed" }));
    }
  }
};
