const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new Schema(
  {
    name: { type: String, require: true, index: true },
    username: { type: String, require: true, index: true },
    mobile: { type: String, require: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    gender: { type: String, enum: ["male", "female"] },
    password: { type: String, required: true, select: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    profilePicture: { type: String },
    refreshToken: {
      type: String,
      select: false,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  }
  return next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.plugin(mongoosePaginate);
const User = model("User", UserSchema);
module.exports = User;
