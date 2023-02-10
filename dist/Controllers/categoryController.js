"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Category_1.default.find({});
    return result;
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Category_1.default.findOne({ _id: id });
    return result;
});
exports.getCategoryById = getCategoryById;
const addNewCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryFind = yield Category_1.default.findOne({ name: category.name });
    if (!category.name)
        throw new Error('information missing');
    else if (categoryFind)
        throw new Error('category already exists');
    else {
        const result = yield Category_1.default.create({ name: category.name });
        return result;
    }
});
exports.addNewCategory = addNewCategory;
//# sourceMappingURL=categoryController.js.map