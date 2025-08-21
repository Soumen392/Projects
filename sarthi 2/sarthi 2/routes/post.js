const mongoose = require("mongoose");

const postSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  name: String,
  email: String,
  phone: Number,

  paddress: String,
  daddress: String,
  btime: String,
  bdate: String,

  carname: String,
  carmodel: String,
  carprice: Number,
  passenger: Number,
  luggage: Number,
  
  tdistance: String,
  rtime:String,
  
  // totalprice:Number,
  date: {
    type: Date,
    default: Date.now()
  },

  cancle: String
})

module.exports = mongoose.model("post", postSchema)
