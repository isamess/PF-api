"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
exports.Order = exports.Order;
//# sourceMappingURL=order.js.map