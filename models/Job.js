const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide a company!"],
      maxlength: 30,
    },
    position: {
      type: String,
      required: [true, "please provide a position!"],
      maxlength: 30,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
