"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoriesSchema = new mongoose_1.Schema({
    category: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
}, {
    versionKey: false,
    timestamps: false,
});
exports.default = (0, mongoose_1.model)("Category", categoriesSchema);
//# sourceMappingURL=categories.js.map