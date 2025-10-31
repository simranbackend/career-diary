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
    console.log(req.body, "rerrrrrrrr");
    
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
        // Save token to user for server-side validation / logout
        try {
          user.token = token;
          await user.save();
        } catch (e) {
          console.error('Failed to save token to user', e);
        }
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
    // Save token to new user
    try {
      user.token = token;
      await user.save();
    } catch (e) {
      console.error('Failed to save token to new user', e);
    }

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

exports.logout = async (req) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return { status: false, message: 'Not authenticated' };

    await User.findByIdAndUpdate(userId, { $unset: { token: 1 } });

    return { status: true, message: 'Logged out successfully.' };
  } catch (error) {
    console.error('Error in logout', error);
    return { status: false, message: 'Something went wrong. Please try again.' };
  }
};
