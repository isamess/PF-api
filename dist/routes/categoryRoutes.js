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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../Controllers/categoryController");
const routes = (0, express_1.Router)();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, categoryController_1.getAllCategories)();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error_message: error.message });
    }
}));
routes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, categoryController_1.getCategoryById)(req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error_message: error.message });
    }
}));
routes.post('admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = req.body;
        const result = yield (0, categoryController_1.addNewCategory)(newCategory);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error_message: error.message });
    }
}));
exports.default = routes;
//# sourceMappingURL=categoryRoutes.js.map