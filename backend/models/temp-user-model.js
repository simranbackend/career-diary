const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
    mobile: { 
        type: String, 
        required: true, 
        unique: true 
    },
    otp: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 300 
    } 
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("TempUser", tempUserSchema);
