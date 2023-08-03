const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name!"],
    minlength: 3,
    maxlength: 24,
  },
  email: {
    type: String,
    required: [true, "Please provide an email!"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email!",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
    maxlength: 24,
  },
});

// hashing the password before saving it to db
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (inputtedPassword) {
  return await bcrypt.compare(inputtedPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
