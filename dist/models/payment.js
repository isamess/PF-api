"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Payments", paymentSchema);
//# sourceMappingURL=payment.js.map