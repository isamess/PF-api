"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String },
    _id: mongoose_1.Schema.Types.ObjectId,
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product" },
});
exports.default = (0, mongoose_1.model)("Categories", categorySchema);
//# sourceMappingURL=Category.js.map