import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: [],
    subtotal: { type: Number, require: true },
    total: { type: Number, require: true },
    shipping: { type: Object, require: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, require: true },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

exports.Order = Order;
