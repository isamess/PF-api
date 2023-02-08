import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      maxlength: 200,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
      minlength: 8,
      maxlength: 1024,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("Users", userSchema);

exports.User = User;
