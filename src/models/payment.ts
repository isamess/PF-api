import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    image: {
      type: Image,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Payments", paymentSchema);
