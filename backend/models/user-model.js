const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { 
        type: String 
    },
    mobile: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String 
    }
    ,
    token: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("User", userSchema);
