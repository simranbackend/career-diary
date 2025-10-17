const User = require("../models/user-model");
const TempUser = require("../models/temp-user-model");
const { generateToken } = require("../utils/jwt");

exports.sendOtp = async (req) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return {
        status: false,
        message: "Mobile number is required.",
      };
    }

    const otp = "123456";

    const existingUser = await User.findOne({ mobile });

    if (!existingUser) {
      await TempUser.findOneAndUpdate(
        { mobile },
        { otp, createdAt: new Date() },
        { upsert: true, new: true }
      );
    }

    console.log(`OTP for ${mobile}: ${otp}`);

    return {
      status: true,
      message: "OTP sent successfully.",
    };
  } catch (error) {
    console.log("Error in sendOtp", error);
    return {
      status: false,
      message: "Something went wrong! Please try again later.",
    };
  }
};


exports.login = async (req) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return {
        status: false,
        message: "Mobile and OTP are required.",
      };
    }

    let user = await User.findOne({ mobile });

    if (user) {
      if (otp !== "123456") {
        return { status: false, message: "Invalid OTP." };
      }

      const token = generateToken(user);
      return {
        status: true,
        message: "Login successful.",
        data: { user, token },
      };
    }

    const tempUser = await TempUser.findOne({ mobile });

    if (!tempUser || tempUser.otp !== otp) {
      return { status: false, message: "Invalid or expired OTP." };
    }

    user = await User.create({ mobile });

    await TempUser.deleteOne({ mobile });

    const token = generateToken(user);

    return {
      status: true,
      message: "Registration successful.",
      data: { user, token }
    };

  } catch (error) {
    console.log("Error in login", error);
    return {
      status: false,
      message: "Something went wrong! Please try again later.",
    };
  }
};
