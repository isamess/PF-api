"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express"); // el RequestHandler ayuda a que se reconozca el request
const products_1 = __importDefault(require("../models/products"));
const categories_1 = __importDefault(require("../models/categories"));
const cloudinary_1 = __importStar(require("../utils/cloudinary"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
//TODO: get all products
router.get("/find", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products_1.default.find();
        res.status(200).send(product);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//TODO: to get one product by ID
router.get("/find/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({
                message: "Product doesn't exist",
            });
        return res.json(product);
    }
    catch (error) {
        res.status(500).json({ error_message: error.message });
    }
}));
router.post("/", auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, price, desc, image } = req.body;
    try {
        if (image) {
            const uploadRes = yield (0, cloudinary_1.uploadImage)(image);
            if (uploadRes) {
                const product = new products_1.default({
                    name,
                    category,
                    price,
                    desc,
                    image: uploadRes,
                });
                const savedProduct = yield product.save();
                res.status(200).send(savedProduct);
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.put("/:id", auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.productImg) {
        try {
            const destroyResponse = yield cloudinary_1.default.uploader.destroy(req.body.product.image.public_id);
            if (destroyResponse) {
                const uploadResponse = yield cloudinary_1.default.uploader.upload(req.body.productImg, {
                    upload_preset: "online-shop",
                });
                if (uploadResponse) {
                    const updatedResponse = yield products_1.default.findByIdAndUpdate(req.params.id, {
                        $set: Object.assign(Object.assign({}, req.body.product), { image: uploadResponse }),
                    }, { new: true });
                    res.status(200).send(updatedResponse);
                }
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
    try {
        const updatedProducts = yield products_1.default.findByIdAndUpdate(req.params.id, { $set: req.body.product }, { new: true });
        res.status(200).send(updatedProducts);
    }
    catch (err) {
        return res.status(500).send(err);
    }
}));
// export const deleteProduct: RequestHandler = async (req, res) => {
//   try {
//     const product = await Products.findByIdAndDelete(req.params.id);
//     if (!product)
//       return res.status(404).json({ message: "Product doesn't exist" });
//     if (product.image?.public_id) {
//       await deleteImage(product.image.public_id);
//     }
//     return res.json(product);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };
//copia para poder borrar tambien la imagen de cloudinary y el formato para usar middlewar
router.delete("delete/:id"),
    auth_1.isAdmin,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield products_1.default.findById(req.params.id);
            if (!product)
                return res.status(404).send("El producto no fue encontrado");
            if (product.image.public_id) {
                const destroyResponse = yield cloudinary_1.default.uploader.destroy(product.image.public_id);
                if (destroyResponse) {
                    const deleteProduct = yield product.findByIdAndDelete(req.params.id);
                    res.status(200).send(deleteProduct);
                }
            }
            else {
                console.log("Acción terminada. Falla al eliminar el producto");
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
router.post("/category", auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { createCategory } = req.body;
    try {
        const category = new categories_1.default({
            category: createCategory,
        });
        const savedCategory = yield category.save();
        res.status(200).send(savedCategory);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.get("/category/find", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categories_1.default.find();
        res.status(200).send(category);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
module.exports = router;
//# sourceMappingURL=productsController.js.map