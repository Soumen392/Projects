const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

// mongoose.connect("mongodb://127.0.0.1:27017/Sarthi")

const userSchema = mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  otp: { type: String, required: false },
  otpExpiry: { type: Date, required: false },
  verified: { type: Boolean, default: false },
  
  profileImage: String,
  fullname: String,
  address: String,
  contact: Number,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post"
    }
  ]
})

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema)
